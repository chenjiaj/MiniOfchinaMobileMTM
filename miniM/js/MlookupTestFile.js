$(function(){
	$(".right-content").hide().slideDown(500);
	var idurl = location.search;
	var id = queryString("?");
	//console.log(id);
	$.post("../test/lookup.json",{papertemaplateid:id},function(data){ // /onlineExamSystem/getPapertemaplate.do
		$(".papername").text(data.papername);
		$(".editorname").text(data.editorname);
		$(".positiontype").text(data.typename);
		$(".paper-mark").text(data.mark);
		$(".sumScore").text(data.score);
		$(".edittime").text(data.edittime);
	},'json');
	var testItem = $(".test-item").clone(true);
	$(".test-item").remove();
	//console.log(testItem);
	$.post("../test/lookupdetail.json",{paperid:id},function(data){ // /onlineExamSystem/getPaperDetail.do
		var  data = data.questions;
		$(data).each(function(index,value){
			var  item = $(testItem).clone(true);
			//console.log(value,value.question);
			$(".item").append(item);
			var num =index + 1;
			item.find(".num").text(num);
			item.find(".grade").text(value.question.score);
			item.find(".panel-body").text(value.question.question);
		});
	},'json');
});
function queryString(key){
   	 	return (document.location.search.match(new RegExp("(?:^\\?|&)"+key+"=(.*?)(?=&|$)"))||['',null])[1];
	}