$(function() {
    let form = layui.form
    let layer = layui.layer
        // 自定义昵称的表单验证
    form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return '昵称长度必须在1~6位数之间'
                }
            }
        })
        //    基本资料
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // layui快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    initUserInfo()
        // 表单重置
    $('#btnReset').click(function(e) {
        // 阻止默认行为
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }
                layer.msg('修改用户信息成功')
                    // user_info.html在iframe内部利用window.parent转到iframe的父亲平级index.js然后调用getUserInfo()重新渲染头像和欢迎语
                window.parent.getUserInfo()
            }
        })
    })
})