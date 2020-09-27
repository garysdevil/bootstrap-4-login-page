/******************************************
 * My Login
 *
 * Bootstrap 4 Login Page
 *
 * @author          Muhamad Nauval Azhar
 * @uri 			https://nauval.in
 * @copyright       Copyright (c) 2018 Muhamad Nauval Azhar
 * @license         My Login is licensed under the MIT license.
 * @github          https://github.com/nauvalazhar/my-login
 * @version         1.2.0
 *
 * Help me to keep this project alive
 * https://www.buymeacoffee.com/mhdnauvalazhar
 * 
 ******************************************/

'use strict';

$(function() {

	// author badge :)
	var author = '<div style="position: fixed;bottom: 0;right: 20px;background-color: #fff;box-shadow: 0 4px 8px rgba(0,0,0,.05);border-radius: 3px 3px 0 0;font-size: 12px;padding: 5px 10px;">By <a href="https://twitter.com/mhdnauvalazhar">@mhdnauvalazhar</a> &nbsp;&bull;&nbsp; <a href="https://www.buymeacoffee.com/mhdnauvalazhar">Buy me a Coffee</a></div>';
	$("body").append(author);

	$("input[type='password'][data-eye]").each(function(i) {
		var $this = $(this),
			id = 'eye-password-' + i,
			el = $('#' + id);

		$this.wrap($("<div/>", {
			style: 'position:relative',
			id: id
		}));

		$this.css({
			paddingRight: 60
		});
		$this.after($("<div/>", {
			html: 'Show',
			class: 'btn btn-primary btn-sm',
			id: 'passeye-toggle-'+i,
		}).css({
				position: 'absolute',
				right: 10,
				top: ($this.outerHeight() / 2) - 12,
				padding: '2px 7px',
				fontSize: 12,
				cursor: 'pointer',
		}));

		$this.after($("<input/>", {
			type: 'hidden',
			id: 'passeye-' + i
		}));

		var invalid_feedback = $this.parent().parent().find('.invalid-feedback');

		if(invalid_feedback.length) {
			$this.after(invalid_feedback.clone());
		}

		$this.on("keyup paste", function() {
			$("#passeye-"+i).val($(this).val());
		});
		$("#passeye-toggle-"+i).on("click", function() {
			if($this.hasClass("show")) {
				$this.attr('type', 'password');
				$this.removeClass("show");
				$(this).removeClass("btn-outline-primary");
			}else{
				$this.attr('type', 'text');
				$this.val($("#passeye-"+i).val());				
				$this.addClass("show");
				$(this).addClass("btn-outline-primary");
			}
		});
	});

	$(".my-login-validation").submit(function() {
		console.log($(this));
		
		var form = $(this); 
		console.log(form[0].checkValidity());
        if (form[0].checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
		}else{
			doLogin()
		}
		form.addClass('was-validated');
	});
	$('#password').on('keyup',function(){
		console.log('123');
		$(this).removeClass('self-error');
		$('.invalid-self-errPassword').removeClass('show');
	})
});

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
function doLogin() {
	var username = $('#username').val();
	var password = $('#password').val();
	console.log("login request");
	$.ajax({
		type: 'post',
		// url: "/v1/sso/login",
		url: "http://sso.wxblockchain.com/v1/sso/login",
		contentType: "application/json",
		data: JSON.stringify({username: username, password: password}),
		success: function (res) {
			// console.log(res);
			if (res.code === 0) {
				var redirectURL = getUrlParam("redirectURL") || 'http://garys.top'
				console.log("登录成功，跳转到回调地址: " + redirectURL);
				// window.location.href = redirectURL + '?token=' + res.data.token
				window.location.href = redirectURL
				
			} else {
				// alert("账号密码错误eeeee");
				$('#password').addClass('self-error');
				$('.invalid-self-errPassword').addClass('show');
			}
		},
		error: function(){
			alert("网络错误");
		}
	});
}