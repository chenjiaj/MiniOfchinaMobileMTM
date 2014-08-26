//2014/08/11
//chenjuajun
var setTableData;
$(function(){
	//使用表格插件
	if (datatables) {
        datatables.fnClearTable();
        $("#dataTable").dataTable().fnDestroy();
       	$("#dataTable").empty();
    }  else {
        $("#dataTable").show();
    }
	var datatables = $("#dataTable").dataTable({
		"bSort": false,//是否需要排序
		"aaSorting": [[4, "desc"]],
		//bSortClasses:false,//排序样式
		//bStateSave:true,//刷新后状态是否存在
		//iDeferLoading:30,//延迟加载
		"oLanguage": {
			"sProcessing": "正在加载中......",
			"sLengthMenu": "每页显示 _MENU_ 条记录",
			"sZeroRecords": "对不起，查询不到相关数据！",
			"sEmptyTable": "表中无数据存在！",
			"sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
			"sInfoFiltered": "数据表中共为 _MAX_ 条记录",
			"sSearch": "搜索",
			"oPaginate": {
				"sFirst": "首页",
				"sPrevious": "上一页",
				"sNext": "下一页",
				"sLast": "末页"
			}
		}
	});//dataTable end
	//初始化表格数据
	setdataTable = function setdataTable(data) {
		var papertemaplate = data.papertemaplate;
		datatables.fnClearTable();
		$(papertemaplate).each(function(index, value) {
			var tr = "";		
				tr = $("<tr><td><span class='checkbox-span'><input type='checkbox' /></span></td><td class='typename' axis='"+value.positiontype.id+"'>" + value.positiontype.typename + "</td><td class='papername' axis='"+value.id+"'>" + value.papername + "</td><td class='typename' axis='"+value.editor.id+"'>" + value.editor.username + "</td><td>"+ value.edittime + "</td><td>" + value.mark+ "</td><td class='operate'><a href='#'' class='lookup'><span class='glyphicon glyphicon-zoom-in'></span>预览</a>	<a href='#' class='edit'><span class='glyphicon glyphicon-edit'></span>编辑</a>	<a href='' class='delete-test'><span class='glyphicon glyphicon-trash '></span>删除</a></tr>");
				datatables.fnAddData(tr);

		});	
		//datatables.order([3,'desc']);
	}
	//初始化表格数据

	function updateDataTable(url) {
		$.post(url,{typeid:'-1'},function(data) {
			var data = data;
			setdataTable(data);
		},'json');
	}
	updateDataTable("../test/testlist.json"); 
	//初始化表格数据 end
	//表格中的删除
	$(document).on("click",".delete-test",function(){
		var papername = $(this).parent().parent().find(".papername").text();
		var papernameid = $(this).parent().parent().find(".papername").attr("axis");
		var con = confirm("是否删试卷"+papername+"，删除后在回收站可以找到");
		var tr = $(this).parent().parent();
		if(con){
			$.post("../test/result.json",{papernameid:papernameid},function(data){
				var result = data.result;
				if(result){
					tr.remove();
				}
			});
		}
	});
	//表格中的删除 end
	//批量删除表格数据
	$(".delete-some").click(function(){
				var paper=$("#dataTable tbody .checkbox-span input:checked").parent().parent().parent().find(".papername");
				var str="";
				$(paper).each(function(){
					str+=$(this).attr("axis");
				});
				if(str != ""){
					var con = confirm("是否删试卷，删除后在回收站可以找到");
					if(con){
						$.post("../test/searchTypename.json",{str:str},function(data){
							setdataTable(data);
						});
					}
					
			}
			
			
		});
	//试卷类型option初始化
	$.getJSON("../test/positiontype.json",function(data){
		var select=$(".positiontype");
		$(data.positiontype).each(function(index,value){
			var option=$("<option value='"+value.id+"'>"+value.typename+"</option>");
			select.append(option);
		});
	});//试卷类型option初始化 end

	//筛选试卷类型
	$(".choose-positiontype").click(function(){
		var selectValue=$(".positiontype").val();
		if(selectValue == -1){
			updateDataTable("../test/testlist.json"); 
		}
		else{
			$.post("../test/searchTypename.json",{typeid:selectValue},function(data){
				setdataTable(data);
			},'json');
		}
	});////筛选试卷类型

	//搜索
	$(".search-choose-btn").click(function(){
		var choose=$(".search-choose").val();
		var text=$(".search-text").val();
		var graytext=$(".search-text").attr("placeholder");
		if(text == graytext){
			updateDataTable("../test/testlist.json");
		}
		else if(choose == "papername"){
			$.post(" ../test/searchTypename.json",{papername:text},function(data){
				setdataTable(data);
			},'json');
		}
		else if(choose == "mark"){
			$.post("../test/searchTypename.json",{mark:text},function(data){
				setdataTable(data);
			},'json');
		}
		else if(choose == "editor"){
			$.post("../test/searchTypename.json",{editor:text},function(data){
				setdataTable(data);
			},'json');
		}
	});
	//预览
	$(document).on("click",".lookup",function(){
		var id = $(this).parent().parent().find(".papername").attr("axis");
		window.location.href="MlookupTestFile.html?id="+id;
	});	

	//编辑
	$(document).on("click",".edit",function(){
		var id = $(this).parent().parent().find(".papername").attr("axis");
		window.location.href="MmodifyTestFile.html?id="+id;
	});	
});