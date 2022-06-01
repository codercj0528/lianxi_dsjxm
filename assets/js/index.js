$(function(){
    getUserInfo();
    // 点击退出按钮实现退出功能
    var layer = layui.layer;
    $('#btnLogout').on('click', function() {
        layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html';
            // 关闭confirm询问框
            layer.close(index);
          });
    })
});
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        
        success: function(res) {
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvadar(res.data)
        }
        // complete: function(res) {
        //     if(res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }
    })
}
function renderAvadar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if(user.user_pic !== null) {
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}