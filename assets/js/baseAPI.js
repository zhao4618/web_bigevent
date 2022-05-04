// 在每一次发起ajax请求之后都会首先调用这个函数来进行地址拼接
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
})