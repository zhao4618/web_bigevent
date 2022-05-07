$(function() {
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage
    getLists()
    getLei()
        // 渲染文章列表
    function getLists() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('文章获取失败')
                }
                let r = template('art_list', res)
                $('.tbody').html(r)
                renderPage(res.total)
            }
        })
    }
    // 渲染文章分类
    function getLei() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('文章分类获取失败')
                }
                let l = template('art_lei', res)
                $('[name=cate_id]').html(l)
                    // 模板引擎靠它继续渲染
                form.render()
            }
        })
    }
    // 点击筛选重新渲染数据 
    $('#screen').on('submit', function(e) {
            e.preventDefault()
            let cate_id = $('[name=cate_id]').val()
            let state = $('[name=state]').val()
            q.cate_id = cate_id
            q.state = state
            getLists()
        })
        // 分页模块layui框架
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 40, 50],
            // 分页的回调函数
            jump: function(obj, first) {
                // 分页
                q.pagenum = obj.curr
                    // 获取条目数
                q.pagesize = obj.limit
                if (!first) {
                    getLists()
                }
            }
        })
    }
    // 删除文章、事件委托
    $('.tbody').on('click', '.btn_del', function() {
        let n = $('.btn_del').length
            // console.log(n)
        let id = $(this).attr('data-id')
            // console.log(id)
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功')
                        // 删除文章后判断页面文章的条数从而决定是否重新渲染数据
                    if (n === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    getLists()
                }
            })

            layer.close(index);
        });
    })
})