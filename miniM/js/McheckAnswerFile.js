//获得答卷详细信息
var id =null;
$(function(){
	var items = new Array();
	var src = location.search;
	var  id = queryString("?");
	var item = $(".test-item").clone(true);
		$(".test-item").remove();
	$.post("../test/answer.json",{id:id},function(data){
		 $(".papername").text(data.papername);
		 $(".positiontype").text(data.typename);
		 $(".paperMark").text(data.mark);
		 $(".answerPeople").text(data.candidater);
		 $(".editorname").text(data.editor);
		 $(".textsumScore").text(data.sumscore);
		 $(".sumScore").text(data.score);
		 $(".sum-comment").text(data.sumcoment);
		 var answer = data.answer;
		  var answer = data.answer;
		  id = data.id;
		 answer.sort(function(a, b){
		 	return a.ansersheets.number - b.ansersheets.number;
		 });
		 $(answer).each(function(index,value){
		 	var testItem = $(item).clone(true);
		 	testItem.find(".num").text(value.ansersheets.number);
		 	testItem.find(".num").attr("sheetid",value.ansersheets.sheetid);
		 	testItem.find(".question").text(value.questions.question);
		 	testItem.find(".referanswer").text(value.ansersheets.answer);
		 	testItem.find(".M-referanswer").text(value.questions.referanswer);
		 	testItem.find(".standard").text(value.questions.standard);
		 	testItem.find(".grade").text(value.questions.score);
		 	testItem.find(".get-grade").val(value.ansersheets.score);
		 	$(".item").append(testItem);
		 	$(".list-group ul").append("<li class='list-group-item'>第<span>"+value.ansersheets.number+"</span>题</li>");//
		 });
		 $(".list-group ul li").eq(0).css("background","#ccc").siblings().css("background","#fff");//
	});
	$(document).on("click",".list-group ul li",function(){
		$("html,body").animate({scrollTop: $(".num").eq($(this).index()).offset().top - 70},500);
	});//
	$(window).scroll(function(){
		var sTop = $(document).scrollTop();
		//console.log(sTop,$(".num").eq($(".num").length - 1).offset().top-70);
		$(".num").each(function(index,value){	
			var len = $(".num").length;
			if(index+1<len){
				var up = $(".num").eq(index+1).offset().top-70;
				var down =  $(".num").eq(index).offset().top-70;
				if(sTop>=down && sTop <up){
				$(".list-group ul li").eq(index).css("background","#ccc").siblings().css("background","#fff");
			}
		}
			else{
				if(sTop >= $(".num").eq(len - 1).offset().top-70){
					$(".list-group ul li").eq(index).css("background","#ccc").siblings().css("background","#fff");
				}
			}
			if(sTop >= $(document).height() - $(window).height()){
				$(".list-group ul li").eq($(".num").length -1).css("background","#ccc").siblings().css("background","#fff");
			}
		});
			
	});//
	//保存一道题目打分
	$(document).on("click",".save-the-item",function(){
		var getgrade = $(this).parent().parent().find(".get-grade").val();
		var comment = $(this).parent().parent().find(".comment").val();
		var num = $(this).parent().parent().parent().find(".num").text();
		var sheetid =  $(this).parent().parent().parent().find(".num").attr("sheetid");
		if(!checkNull(getgrade)){
			alert("得分不能为空");
		}
		else if(!checkNum(getgrade)){
			alert("得分必须为整数");
		}
		else{
			$.post("../test/result.json",{sheetid:sheetid,number:num,score:getgrade,comment:comment},function(data){
				if(data.result){
					alert("保存成功");
					items[num] = 1;
					caculateSum() ;
				}
				else{
					alert("保存失败");
				}
			});
		}
		
	});
	//打分验证
	$(document).on("blur",".get-grade",function(){
		var grade = $(this).parent().parent().find(".grade").text();
		if(!checkNum($(this).val())){
			alert("得分必须为整数");
			$(this).focus().select();
		}
		else if($(this).val()>Number(grade)){
			alert("得分不能大于总分");
			$(this).focus().select();
		}
	});
	var questionitem = $(".questionitem").clone(true);
	    $(".questionitem").remove();
	 //提交
	$(".submit-test").click(function(){
		$(".confirm-two table").html("");
		var itemLen = $(".num").length;
		var str = "";
		for(var i=1;i<=itemLen;i++){
			if(items[i]!=1){
				str +=i+",";
			}
		}
		if(str == ""){
			showLayer(".confirm-two",800);
			$('html,body').animate({scrollTop:0},200); 
			var tr ="";
			for(var i = 1;i<=itemLen;i++){				
				if(i%3 == 1){
					tr = $("<tr></tr>");
					$(".confirm-two table").append(tr);
				}
				var questionItem = $(questionitem).clone(true);
				$(questionItem).find(".confirmNum").text(i);
				$(questionItem).find(".confirmGrade").text(items[i]);
				tr.append(questionItem);
			}	
		}
		else{
			str = str.substring(0,str.length-1);
			alert("第"+str+"道题还未提交评审结果！");
		}
	});
	//二次确认
		$(".submitScore").click(function(){
		var con = confirm("提交审阅后不能再次修改，是否提交");
		var sumComment = $(".sumComment").val();
		if(con){
			$.post("../test/result.json",{id:id,comment:sumComment},function(data){
				if(data.result){
					window.location.href="ManswerList.html";
				}
			});
		}
	});
	//回到顶部
	$("#Totop").click(function(){
		$('html,body').animate({scrollTop:0},200);
	});

});
function queryString(key){
   	 	return (document.location.search.match(new RegExp("(?:^\\?|&)"+key+"=(.*?)(?=&|$)"))||['',null])[1];
	}

function showLayer(id, speed) {
				$(".my-gray-layer").fadeIn(speed);
				$(id).animate({
					top: "50px"
				}, 300);
			}
function caculateSum() {
	var nums = $(".get-grade");
	var sum = 0;
	$(nums).each(function() {
		sum += Number($(this).val());
	});
	$(".sumScoresum").text(sum);
}