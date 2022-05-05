$(function() {
        getUserInfo()
        let layer = layui.layer
            // 退出按钮
        $('#btnLogout').click(function() {
            layer.confirm('确定退出?', { icon: 3, title: '提示' }, function(index) {
                //do something
                // 退出清空token并跳转页面
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index);
            });
        })
    })
    // 获取用户的信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('用户信息获取失败')
            }
            renderAvatar(res.data)
        },
        // ajax发起请求是否成功都会执行的函数 complete
        // complete: function(res) {
        //     // console.log(res)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 获取用户的名称
    let name = user.nickname || user.username
        // 用户欢迎语
    $('.welcome').html('欢迎&nbsp' + name)
        // 判断是否上传头像，如果服务器有值则用上传的头像文字头像隐藏 否则用文字头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text_avatar').hide()
    } else {
        $('.layui-nav-img').hide()
            // 获取字符串的第一个字符并转大写toUpperCase()
        let first = name[0].toUpperCase()
        $('.text_avatar').html(first).show()

    }
}