var numbers = ["9","8","7","6","5","4","3","2","1","0"];
var ops = {"div": "÷","mult": "×","sub": "-","add": "+"};

$(document).ready(function() {
	$(window).resize(function() {
		$("#calculator-body").css("font-size", Math.ceil(parseFloat($("#calculator-body").css("width"))/21.86));
		$("#answer").css("font-size", Math.ceil(parseFloat($("#calculator-body").css("width"))/9.33));
		$(".btn").css("font-size", Math.ceil(parseFloat($("#calculator-body").css("width"))/21.86));
		$(".btn").css("height", Math.ceil(parseFloat($("#calculator-body").css("width"))/7.36));
		$("#calculate").css("height", Math.ceil(parseFloat($(".btn").css("height"))*2.3));
		$("#calculate").css("margin-top", Math.ceil(parseFloat($(".btn").css("height"))*(-1.2)));
	});

	var period = true;
	var op = false;
	var answer = false;
	$("#answer").text("0");
	$("#expression").text("0");

	$(".btn").mouseup(function() {
		$(".btn").css("box-shadow", "0 0 0 1px #ebebeb inset, 0 0 0 2px rgba(255,255,255,0.15) inset, 0 5px 0 0 #adadad, 0 5px 0 1px rgba(0,0,0,0.4), 0 5px 5px 1px rgba(0,0,0,0.5)");
	});
	$(".btn").mousedown(function() {
		$(".btn").css("box-shadow", "");
	});

	$("#period").on("click", function() {
		if (period) {
			period = false;
			$("#answer").text(".");
			$("#expression").append(".");
		}
	});

	$.each(ops, function(i,val) {
		$("#"+i).on("click", function() {
			var maxlen = $("#expression").text().length >= Math.ceil($("#screen").width()/13);
			var ans = $("#answer").text();
			op = ans !== "0" && $.inArray(ans, Object.values(ops)) < 0;
			if (op && !maxlen) {
				if (answer) {
					$("#answer").text($("#"+i).text());
					$("#expression").append($("#"+i).text());
					answer = false;
				}
				else {
					period = true;
					$("#answer").text($("#"+i).text());
					$("#expression").append($("#"+i).text());
				}
			}
		});
	});

	$.each(numbers, function(i,val) {
		$("#"+val).on("click", function() {
			var maxlen = $("#expression").text().length >= Math.ceil($("#screen").width()/13);
			if (answer) {
				$("#answer").text("");
				$("#expression").text("");
				answer = false;
			}
			var ans = $("#answer").text();
			if (!maxlen) {
				if (ans === "0" && $("#expression").text().length === 1) $("#expression").text("");
				$("#answer").text($("#"+val).text());
				$("#expression").append($("#"+val).text());
			}
		});
	});

	$("#AC").on("click", function(){
		$("#answer").text("0");
		$("#expression").text("0");
	});

	$("#CE").on("click", function(){
		var str = $("#expression").text();
		var len = str.length;
		if (len > 1) {
			str = str.slice(0,len-1);
			$("#expression").text(str);
			$("#answer").text(str.slice(-1));
		}
		else {
			$("#expression").text("0");
			$("#answer").text("0");
		}
	});

	$("#calculate").on("click", function() {
		var ans = eval($("#expression").text());
		ans = ans.toFixed(3);
		$("#answer").text(ans);
		answer = true;
	});
});