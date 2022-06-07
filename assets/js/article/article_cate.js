$(function() {
    
    initArticleList()
    var form = layui.form;
    function initArticleList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
               var htmlStr = template('tpl-table', res);
               $('tbody').html(htmlStr);
            }
        })
    }
    var indexAdd = null;
    // 添加类别按钮
    $('#btnAddCtae').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            ,content: $("#dialog-add").html()
          });     
    });
    
    // 为form表单添加代理提交事件，因为是动态形成的表单不能直接绑定submit事件
    $('body').on('submit', '#formAdd', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layui.layer.msg('添加分类失败');
                }
                initArticleList()
                layui.layer.msg('添加分类成功');
                layui.layer.close(indexAdd);
            }
        })
    })
    var indexedit = null;
    // 通过代理的形式，为编辑按钮添加点击事件
    $('tbody').on('click', '.formedit', function() {
        indexedit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            ,content: $("#dialog-edit").html()
          });  
          
        //   为编辑按钮添加自定义ID属性，用于获取当前按钮对应ID
        var id = $(this).attr('data-Id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                // layui中自带的快速填充表单数据的方法
                form.val('formedit',res.data);
            }
        })
    })

    // 通过代理形式,为修改文章分类的表单添加submit事件
    $('body').on('submit', '#formedit', function(e) {
        e.preventDefault();
        $.ajax({
            method:'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layui.layer.msg('更新分类名称失败');
                }
                layui.layer.msg('更新分类名称成功');
                layui.layer.close(indexedit);
                initArticleList()
            }
        })
    })
    // 通过代理的形式为删除按钮绑定点击事件
    $('tbody').on('click', '.btndelte', function() {
        var id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
           $.ajax({
               method: 'GET',
               url: '/my/article/deletecate/' + id,
               success: function(res) {
                   if(res.status !== 0) {
                       return layui.layer.msg('删除文章分类失败');
                   }
                   layui.layer.msg('删除文章分类成功');
                   layer.close(index);
                   initArticleList();
               }
           }) 
            
            
          });
    })
})