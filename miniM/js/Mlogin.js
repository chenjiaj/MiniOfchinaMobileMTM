$(document).ready(function() {
	//register.html 关闭警告框
	$(".close").click(function() {
		$(".alert").hide(500);
	});
	//检查登录的否为空
	$("#sign-in").click(function() {
		$(".text").each(function() {
			var val = $(".text").text();
		});
	});
	//登录页面提交检查
	$("#sign-in").click(function() {
		var subindex = 0;
		$(this).parent().parent().find(".my-text").each(function() {
			var text = $(this).val();
			var grayText = $(this).attr("placeholder");
			var result = checkNull(text);
			if (!result || text == grayText) {
				subindex = 1;
				//console.log(text);
				return false;
			}
		});
		if (subindex == 0) {
			var loginnamea = $("input[name='loginname']").val();
			var passworda = $("input[name='password']").val();
			//console.log(loginnamea,passworda);
			$.post("test/login.text", {
				loginname: loginnamea,
				password: passworda
			}, function(data) {
				data=JSON.parse(data);
				if (data.success == false) {
					$(".alert").show(200);
				}
				else if(data.success == true){
					window.location.href=data.url;
					//console.log(data.url);
				}
				else{
					//console.log(data);
				}
			});
		} else if (subindex == 1) {
			$(".alert").show(200);
		}
	});

});

function checkNull(theValue) {
	var val = $.trim(theValue);
	if (val == "" || val == null) {
		return false;
	} else {
		return true;
	}
}