$(function() {
    // 去注册的链接
    $('#link_reg').on('click', function() {
        $('.login_box').hide();
        $('.rex_box').show();
    });
    // 去登陆的链接
    $('#link_login').on('click', function() {
        $('.login_box').show();
        $('.rex_box').hide();
    });
    // 从layui中获取form对象
    var form = layui.form;
    // 从layui中获取layer对象
    var layer = layui.layer;
    // 自定义校验规则
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repwd: function(value) {
            var pwd = $('.rex_box [name=password]').val();
            if(pwd !== value) {
                return '两次密码输入不一致';
            }
        }
    });
    // 监听注册表单事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        // 发起AJAX的POST请求
        var data = {username:$('#form_reg [name=username]').val(), password:$('#form_reg [name=password]').val()};
        $.post('/api/reguser', data,function(res) {
            if(res.status !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message);
            }
            layer.msg('注册成功！请登录');
            $('#link_login').click();
        })
    });
    // 监听登录表单事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                   return layer.msg('登录失败!');
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})