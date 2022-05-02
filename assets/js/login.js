$(function() {
    $('#link_reg').click(function() {
        $('#link_reg').hide()
        $('.reg_box').show()
    })
    $('#link_login').click(function() {
        $('.reg_box').hide()
        $('#link_reg').show()
    })
})