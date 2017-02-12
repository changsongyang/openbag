$(function() {
		$(".input-close").hide();
		displayClearBtn();		
		setTimeout(displayClearBtn, 200 ); //延迟显示,应对浏览器记住密码
});	
	//是否显示清除按钮
	function displayClearBtn(){
		if(document.getElementById("username").value !== ''){
			$("#username").siblings(".input-close").show();
		}
		if(document.getElementById("password").value !== ''){
			$(".ciphertext").siblings(".input-close").show();
		}
		if($("#codeLevel").val()!=="" && $("#codeLevel").val()!=='0'){
			if($("#validateCode").val()!==""){
				$("#validateCode").siblings(".input-close").show();
			}
		}
	}
	//清除input内容
    $('.input-close').click(function(e){  
		$(e.target).parent().find(":input").val("");
		$(e.target).hide();
		$($(e.target).parent().find(":input")).each(function(i){
			if(this.id=="ptext" || this.id=="password"){
				$("#password").val('');
			}
			$(".tip b").hide();
            $("#username").parents(".login-name").removeClass("error-input");
         });
    });
    //监视用户输入
    $(":input").bind('input propertychange', function() {
		if($(this).val()!==""){
			$(this).siblings(".input-close").show();
		}else{
			$(this).siblings(".input-close").hide();
		}
    }); 
    //手机邮箱验证
    $("#username").keyup(function () {
        var tel = $("#username").val();
        var regt = /^[1][0-9]{10}$/;
        var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (reg.test(tel) || regt.test(tel) || tel==="") {
            $(".tip b").hide();
            $(this).parents(".login-name").removeClass("error-input");
        } else if (tel.length == 0) {
        	$(".tip b").show();
        	$(this).parents(".login-name").addClass("error-input");
        }else {
        	$(".tip b").show();
        	$(this).parents(".login-name").addClass("error-input");
        }
    });
    //登录loading
    $(".loging").click(function(){
    	$(this).hide();
    	$(".loging-load").show();
    })






// $('.foo-del').on('touchstart',function(e){
//   var objId = $(this).attr('data-id');
//   Dialog(objId);
// })