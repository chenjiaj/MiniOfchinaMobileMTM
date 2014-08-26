//2014/08/19
//chenjuajun

$(function(){
	//使用表格插件
	datatables = $("#dataTable").dataTable({
		//"bSort": false,//是否需要排序
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
	//设置表格数据
	
	function updateDataTable(url) {
		$.post(url,function(data) {
			var data = data;
			setdataTable(data);
		},'json');
	}
	updateDataTable("../test/testlist.json"); 
	//回到顶部
	$("#Totop").click(function(){
		$('html,body').animate({scrollTop:0},200);
	});
	//试卷类型option初始化
	$.getJSON("../test/positiontype.json",function(data){
		var select=$(".positiontype");
		$(data.positiontype).each(function(index,value){
			var option=$("<option value='"+value.id+"'>"+value.typename+"</option>");
			select.append(option);
		});
	});//试卷类型option初始化 end

	//筛选是否审阅和试卷类型
	$(".search").click(function(){
		var isRead = $(".isRead").val();
		var positiontype = $(".positiontype").val();
		$.post("../test/testlist.json",{isRead:isRead,positiontype:positiontype},function(data){
				setdataTable(data);
				setdataTable(data);
		});
	});

	//按照试卷名称、答题人姓名、关键字搜索
	$(".search-three").click(function(data){
		var searchchoose = $(".search-choose").val();
		var searchtext = $(".search-text").val();
		$.post("../test/testlist.json",{searchchoose:searchchoose,searchtext:searchtext},function(data){

		});
	});
});