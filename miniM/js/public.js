//author:chen
//Date:2014/08-04
/*****************全局变量********************/

$(document).ready(function() {
	$(".close").click(function() {
		$(".alert-dismissible").hide(500);
	});
	//加载时整体框架获取高度
	setSiderWidthHeight();
	//改变窗口大小时 改变左边宽高
	$(window).resize(function() {
		setSiderWidthHeight();
	});

	//点击显示二级菜单
	$(".my-sider-ul>li>a").click(function() {
		$(".my-sider-ul>li>ul").slideUp(500); //只允许显示一个二级菜单，去掉此句可以显示多个
		$(".my-sider-ul>li>a").find(".navbar-right").css("background-position", " 0 -21px");
		var ul = $(this).parent().children("ul");
		if (ul) {
			if (ul.css("display") == "none") {
				ul.slideDown(500);
				$(this).find(".navbar-right").css("background-position", " 0 0");

			} else {
				ul.slideUp(500);
				$(this).find(".navbar-right").css("background-position", "0 -21px");
			}
		}
	});

	//表单验证
	$(".my-text").blur(function() {
		var text = $(this).val();
		var grayText = $(this).attr("placeholder");
		var checkResult = checkNull(text);
		if (!checkResult || text == grayText) {
			$(this).val(grayText).css("color", "#ccc");
			//console.log(grayText);
		}
	}).focus(function() {
		$(this).css("color", "#000").select();
	});
	//关闭浮出层，向上隐藏
	$(".hide-layer").click(function() {
		var speed = 800;
		$(this).parent().parent(".my-floating-layer").animate({
			top: "-1000px"
		}, speed);
		$(".my-gray-layer").fadeOut(speed);
	});
	/*$(".select-all :checkbox").click(function(){
		var select=$(this).prop("checked");
		if(select){
			$("#dataTable :checkbox").each(function(){
				$(this).prop("checked",true);
			});
		}
		else{
			$("#dataTable :checkbox").each(function(){
				$(this).prop("checked",false);
			});
		}*///IE不兼容
		/*$(".select-all :checkbox").each(function(){
			$(this).click(function(){
			alert(this.checked);
		if(this.checked){
			$("#dataTable :checkbox").each(function(){
				this.checked=true;
			});
		}
		else{
			
			$("#dataTable :checkbox").each(function(){
				this.checked=false;
			});
		}
		});*///IE不兼容
		$(".select-all :checkbox").each(function(){
			$(this).click(function(){
				//alert("sss");
				var selects=document.getElementById("dataTable");
				var checked=selects.getElementsByTagName("input");
				//alert(this.checked);
				if(this.checked){
					for(var i=0;i<checked.length;i++){
						 if(checked[i].type=="checkbox"){
					 		checked[i].checked=true;
					 	}	
			  		
					}
				}
				else{
					for(var i=0;i<checked.length;i++){
			  		 	if(checked[i].type=="checkbox"){
			  		 		checked[i].checked=false;
			  			 }
					
					}
			
				}

			});
		});

		
}); //初始化加载


/**************公用函数**************************************************************************/

//判断传来的值是否为空
function checkNull(theValue) {
	var val = $.trim(theValue);
	if (val == "" || val == null) {
		return false;
	} else {
		return true;
	}
}
//设置左边菜单栏宽高
function setSiderWidthHeight() {
	var siderHeight = $(window).height();
	$(".sider,.my-sider-ul").height(siderHeight);
	//解决IE8不支持 .col-xx-*
	//设置侧边栏的高度、ul的宽度（为让border重叠）
	var siderwidth = $(window).width();
	if(siderwidth>1024){
		$("html").css("overflow-x","hidden");
	}
	else{
		$("html").css("overflow-x","scroll");
	}
	$(".sider").width("13%");
	var siderwidth = $(".sider").width() + 5;
	$(".my-sider-ul").width(siderwidth);
	siderwidth -= 5;
	$(".sider").width(siderwidth);
	if($(".my-gray-layer")){
		$(".my-gray-layer").height($(document).height());
		//console.log($(document).height());
		}
}
function checkAll(){
		var selects=document.getElementById("dataTable");
		var checked=selects.getElementsByTagName("input");
		if(document.getElementById("selectALL-btn").checked){
			for(var i=0;i<checked.length;i++){
				 if(checked[i].type=="checkbox"){
				 	checked[i].checked=true;
				 }	
		  		
			}
		}
		else{
			for(var i=0;i<checked.length;i++){
		  		 if(checked[i].type=="checkbox"){
		  		 	checked[i].checked=false;
		  		}
				
			}
		
		}
}

function checkNum(theValue){
	if(isNaN(theValue)){
		return false;
	}
	else{
		return true;
	}
}
function getDateTime(date){
	var date=date;
	var dateTime=null;
	var year = date.getFullYear();
	var mon=date.getMonth();
	var day = date.getDate();
	var week = date.getDay();
	var hour = date.getHours();
	var mins = date.getUTCMinutes();
	var secs = date.getSeconds();
	day = day>10?day:"0"+day;
	mon = mon>10?mon:"0"+mon;
	switch(week){
	case 0: week= "星期一";break;
	case 1: week=  "星期一";break;
	case 2: week=  "星期一";break;
	case 3: week=  "星期一";break;
	case 4: week=  "星期一";break;
	case 5: week=  "星期一";break;
	case 6: week=  "星期一";break;
	}
	hour = hour>10?hour:"0"+hour;
	mins = mins>10?mins:"0"+mins;
	secs = secs>10?secs:"0"+secs;
	dateTime=year+"/"+mon+"/"+day+" "+week +" "+hour+":"+mins+":"+secs;
	return dateTime;
}