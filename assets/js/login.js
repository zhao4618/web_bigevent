$(function() {
    $('#link_reg').click(function() {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#link_login').click(function() {
        $('.reg_box').hide()
        $('.login_box').show()
    })
    let form = layui.form
    let layer = layui.layer
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                let val = $('.reg_box [name=password]').val()
                if (val !== value) return '两次密码不一致'
            }
        })
        // 注册
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
            let data = $(this).serialize()
            $.ajax({
                method: 'POST',
                url: '/api/reguser',
                data: data,
                // username: $('#form_reg [name=username]').val(),
                // password: $('#form_reg [name=password]').val()

                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // console.log(res);
                    layer.msg('注册成功！', { icon: 6 })
                    $('#link_login').click()
                }
            })
        })
        // 注册后登录
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                localStorage.setItem('token', res.token)
                    // layer.msg('登录成功!')
                location.href = '/index.html'
            }
        })
    })
})