$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    // 定义美化时间过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        

        // return y + '-'+ m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    function padZero(n) {
        n > 9 ? n : '0' + n;
    }
    // 定义美化时间的过滤器
    // 定义一个查询的参数对象，将来请求数据的时候
    // 需要将请求的参数对象提交到服务器
    var q = {
        pagenum: 1, //默认值
        pagesize: 2, //默认值
        cate_id: '',
        state: ''
    }
    
    
    initTable();
    initCate()
    // 获取文章列表的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取文章列表失败');
                }
                var htmlStr = template('tpl-list', res);
                $('tbody').html(htmlStr);
                renderPage(res.total);
            }
        })
    }
    // 初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取文章分类信息失败')
                }
                var htmlStr = template('tpl-cate',res)
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }
    // 为筛选按钮绑定事件
    $('#formserch').on('submit', function(e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    })

    // 定义渲染分页的方法
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count','limit','prev', 'page', 'next','skip'],
            limits: [2, 3, 5, 10],
            jump: function(obj, first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if(!first) {
                    initTable();
                }
            }
        })
    }

    // 通过代理的形式为删除按钮绑定事件
    $('tbody').on('click', '.btnDelte', function() {
        // 判断当前删除按钮的个数
        var len = $('.btnDelte').length
        // 获取当前按钮对应的文章ID
        var id = $(this).attr('data-id');
        // 弹窗事件
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if(res.status !== 0) {
                        return layer.msg('删除文章失败');
                    }
                    layer.msg('删除文章成功');
                    if(len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum -1;
                    }
                    initTable();
                }

            })
            layer.close(index);
          });
    })

    // 通过代理事件绑定编辑按钮添加修改文章的功能
    $('tbody').on('click', '.btnModify', function() {
       
       var id = $(this).attr('data-id');
       location.href = '/article/article_edit.html';
    //    获取当前的文章ID并保存到存储中，方便编辑时获取
       localStorage.setItem('ID',id);
    });
   
})