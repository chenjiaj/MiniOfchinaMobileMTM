	var id = null;
	var sub=null;
$(function() {
	$(".right-content").hide().slideDown(500);
	$(".save-base-inform").click(function() {
		var papername = $(".papername").val();
		var typeid = $(".papertype").val();
		var mark = $(".paper-mark").val();
		//console.log($(".papername").val());
		if (!checkNull(papername)) {
			showAlter("试卷名称不能为空！");

		} else if (typeid < 0) {
			showAlter("请选择试卷类型！");
		} else {
			$.post("../test/result.json", {
				papername: papername,
				typeid: typeid,
				mark: mark,
				id: id
			}, function(data) { // /onlineExamSystem/addPaper.do
				if (data.result) {
					$(".alert-addTestFile").hide(300);
					id = data.result;
					alert("保存成功！");
				} else {
					showAlter("保存失败!");
				}
			});
		}
	});
	//试卷类型option初始化
	$.getJSON("../test/positiontype.json", function(data) { //
		var select = $(".positiontype");
		$(data.positiontype).each(function(index, value) {
			var option = $("<option value='" + value.id + "'>" + value.typename + "</option>");
			select.append(option);
		});
	}); //试卷类型option初始化 end

	//保存单道题目
	$(document).on("click", ".save-the-item", function() {
		var score = $(this).parent().parent().parent().find(".grade").val();
		var question = $(this).parent().parent().find(".question").val();
		var standard = $(this).parent().parent().find(".standard").val();
		var referanswer = $(this).parent().parent().find(".referanswer").val();
		var number = $(this).parent().parent().parent().find(".num");
		console.log(standard);
		if (!checkNull(score)) {
			alert("分数不能为空");
		} else if (!checkNum(score)) {
			alert("分数必须为数字");
		} else if (!checkNull(question)) {
			alert("问题不能为空");
		} else if (!checkNull(standard)) {
			alert("评分标准不能为空");
		} else if (!checkNull(referanswer)) {
			alert("参考答案不能为空");
		} else if (id) {
			$.post("../test/result.json", {
				score: score,
				question: question,
				standard: standard,
				referanswer: referanswer
			}, function(data) { // /onlineExamSystem/addQuestion.do
				if (data.questionid) {
					number.attr("id", data.questionid);
					//console.log("saveItem["+(number-1)+"]",saveItem[number-1]);
					//console.log(number.attr("id"));
					caculateSum();
					alert("保存成功！");
				}
			});
		} else if (!id) {
			alert("请先保存试卷基础信息！");
			$('html,body').animate({
				scrollTop: $(".test-base-information").offset().top
			}, 500);
		}
	});
	//添加题目
	var newItem = $(".test-item").clone(false);
	$(".add-item").click(function() {
		var item = $(newItem).clone(true);
		var num = $(".test-item").length + 1;
		$(item).find(".num").text(num);
		$(".item").append(item);
		$(item).hide().slideDown(500);
		$('html,body').animate({
			scrollTop: $(item).offset().top
		}, 500); //让页面滚动到当前页面
	});
	//分数必须为空
	$(document).on("blur", ".grade", function() {
		var value = $(this).val();
		if (!checkNull(value)) {
			alert("分数不能为空！");
			//$(this).focus();
		} else if (!checkNum(value)) {
			alert("分数必须为数字！");
			$(this).focus();
		}
	});
	//提交试卷
	$(".submit-test").click(function() {
		if (id == null) {
			alert("请先保存试卷基本信息！");
		} else {
			var itemLen = $(".num").length;
			var str = "";
			var questionid = "";
			var value;
			for (var i = 0; i < itemLen; i++) {
				value = $(".num").eq(i).attr("id");
				if (value >= 0) {
					questionid += value + ",";
				} else {
					str += (i + 1) + ",";
				}
			}
			//console.log(questionid);
			if (str == "") {
				questionid = questionid.substring(0, questionid.length - 1);
				$.post("../test/result.json", {
					paperid: id,
					questionid: questionid
				}, function(data) { // /onlineExamSystem/addPaperdetails.do   ????????
					if (data.result) {
						alert("提交成功！");
						sub = true;
					} else {
						alert("提交失败！");
					}
				});
				//console.log(itemLen);
			} else {
				str = str.substring(0, str.length - 1);
				alert("第" + str + "题还未保存！");
			}
		}

	});
	//删除题目 不从数据库中删除 只是删除对应关系
	$(document).on("click", ".delete-item", function() {
		var con = confirm("是否删除此题？");
		if (con) {
			var index = $(this).parent().parent().parent().parent().find(".num").text();
			$(this).parent().parent().parent().parent().parent().slideUp(500, function() {
				$(this).remove();
				$(".test-item").each(function(index) {
					$(this).find(".num").text(index + 1);
				});
				setTimeout(caculateSum,100);
			});

		}

	});
	//回到顶部
	$("#Totop").click(function(){
		$('html,body').animate({scrollTop:0},200);
	});
	//当离开此页面 未提交时提醒提交试卷
	window.onbeforeunload=function(){
		if(id!=null && sub == null){
			var str="请先提交试卷,否则试卷题目不能保存至试卷！！！";
			return str;
		}
	}
});
//显示警告框的函数
function showAlter(alertText) {
	$(".alert-addTestFile p").text(alertText);
	$(".alert-addTestFile").show(300);
}
//计算总分
function caculateSum() {
	var nums = $(".grade");
	var sum = 0;
	$(nums).each(function() {
		sum += Number($(this).val());
	});
	$(".sumScore").text(sum);
}