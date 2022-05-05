// 在每一次发起ajax请求之后都会首先调用这个函数来进行地址拼接options的值是发起请求时method填的值,options.---就是ajax发起请求时每个属性的值
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
        // 发起有权的接口统一设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 挂载全局complete回调函数，防止输入后台地址直接跳转的问题
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})