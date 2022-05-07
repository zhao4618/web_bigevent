$(function() {
    artLists()
    let layer = layui.layer
    let form = layui.form
        // 获取文章列表
    function artLists() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('文章列表获取失败')
                }
                let lists = template('tpl_table', res)
                $('.tbody').html(lists)
            }
        })
    }
    let index = null
        // 动态添加分类弹窗
    $('#btnList').click(function() {
            // 弹窗
            index = layer.open({
                title: '添加分类',
                type: 1,
                area: ['500px', '250px'],
                content: $('#content_jq').html()
            })
        })
        // 动态弹窗元素获取不到所以用事件委托
    $('body').on('submit', '#form_add', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $('#form_add').serialize(),
                success: function(res) {
                    console.log(res)
                    if (res.status !== 0) {
                        return layer.msg('添加失败')
                    }
                    artLists()
                    layer.msg('添加成功')
                    layer.close(index)
                }
            })
        })
        // 编辑按钮
    let edit = null
        // 事件委托
    $('.tbody').on('click', '#tpl_edit', function() {
            //    弹窗
            edit = layer.open({
                    title: '修改分类',
                    type: 1,
                    area: ['500px', '250px'],
                    content: $('#content_edit').html()
                })
                // 点编辑拿到所触发的id值传给服务器
            let id = $(this).attr('data-id')
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('获取信息失败')
                    }
                    // layui快速渲染更新后的数据
                    form.val('form_edit', res.data)
                }
            })
        })
        // 提交修改编辑里面的内容
    $('body').on('submit', '#form_edit', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('更新信息失败')
                    }
                    layer.msg('更新信息成功')
                    artLists()
                    layer.close(edit)
                }
            })
        })
        // 删除按钮
    $('.tbody').on('click', '#del', function() {
        let id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除信息失败')
                    }
                    artLists()
                }
            })
            layer.close(index);
        })
    })
})