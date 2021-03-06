$(function() {
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if(value.length > 6) {
                return '昵称长度必须在1-6个字符之间';
            }
        }
    });

    getUserInfo();
    // 初始化用户信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                } else {
                    console.log(res);
                    form.val("formUserInfo", res.data);
                }
            }
        })
    }
    // 重制按钮
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        getUserInfo();
    });
    // 监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method:'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('更新用户信息失败');
                } 
                layer.msg('更新用户信息成功');
                window.parent.getUserInfo();
            }
        })
    })
})