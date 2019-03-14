//登入

var enterBox = document.querySelector('#enterBox');

function FunEnter() {
    enterBox.style.display = 'block';
}

function FunEnter_flase() {
    enterBox.style.display = 'none';
}
//注册
var registerBox = document.querySelector("#registerBox");

function FunRegister() {
    registerBox.style.display = 'block';
}

function FunRegister_flase() {
    registerBox.style.display = 'none';
}

// ajax  注册
$('#registerBtn').on('click', function () {
    $.ajax({
        type: 'post',
        url: '/api/user/register',
        data: {
            username: $("#registerBox").find("[name='username']").val(),
            password: $("#registerBox").find("[name='password']").val(),
            repassword: $("#registerBox").find("[name='repassword']").val(),
        },
        dataType: 'json',
        success: function (result) {
            $("#registerBox").find('.colWarning').html(result.message); //注册确定信息
            if (!result.code) {
                setTimeout(function () {
                    $("#registerBox").slideToggle("slow"); //关闭注册
                    setTimeout(function () {
                        $("#enterBox").show();; //打开登入
                    }, 1500)
                }, 1000);
            }
        }
    })
});
//ajax 登入
$("#enterBtn").on("click", function () {
    $.ajax({
        type: 'post',
        url: '/api/user/login',
        data: {
            username: $("#enterBox").find("[name='username']").val(),
            password: $("#enterBox").find("[name='password']").val(),
        },
        dataType: 'json',
        success: function (result) {
            $("#enterBox").find('.colWarning').html(result.message); //登入确定信息
            if (!result.code) {
                window.location.reload(); //刷新页面
            }
        }

    })

})
//退出
$('.delBtn').on('click', function () {
    $.ajax({
        url: 'api/user/logout',
        success: function (result) {
            if (!result.code) {
                window.location.reload(); //刷新页面
            }   
        }
    })
});