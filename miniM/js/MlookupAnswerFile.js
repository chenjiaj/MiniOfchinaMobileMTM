//查看答卷详细信息
$(function(){
	var src = location.search;
	var  id = queryString("?");
	var item = $(".test-item").clone(false);
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
		 answer.sort(function(a, b){
		 	return a.ansersheets.number - b.ansersheets.number;
		 });
		 $(answer).each(function(index,value){
		 	console.log(value.ansersheets.number);
		 	var testItem = $(item).clone(false);
		 	testItem.find(".num").text(value.ansersheets.number);
		 	testItem.find(".question").text(value.questions.question);
		 	testItem.find(".referanswer").text(value.ansersheets.answer);
		 	testItem.find(".M-referanswer").text(value.questions.referanswer);
		 	testItem.find(".standard").text(value.questions.standard);
		 	testItem.find(".grade").text(value.questions.score);
		 	testItem.find(".get-grade").text(value.ansersheets.score);
		 	testItem.find(".comment").text(value.ansersheets.comment);
		 	$(".item").append(testItem);
		 });		 
	});

	$(".print").click(function(){
		doPrint();
	});
	function doPrint() { 
		bdhtml=window.document.body.innerHTML; 
		sprnstr="<!--startprint-->"; //开始打印标识字符串有17个字符
		eprnstr="<!--endprint-->"; //结束打印标识字符串
		prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17); //从开始打印标识之后的内容
		prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr)); //截取开始标识和结束标识之间的内容
		window.document.body.innerHTML=prnhtml; //把需要打印的指定内容赋给body.innerHTML
		window.print(); //调用浏览器的打印功能打印指定区域
		window.document.body.innerHTML=bdhtml;//重新给页面内容赋值；
	}
	//回到顶部
	$("#Totop").click(function(){
		$('html,body').animate({scrollTop:0},200);
	});
});
function queryString(key){
   	 	return (document.location.search.match(new RegExp("(?:^\\?|&)"+key+"=(.*?)(?=&|$)"))||['',null])[1];
	}