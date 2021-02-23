$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    const form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码为6-12位，且不能含有空格'],
        repwd: function (value) {
            const password = $('.reg-box [name=password]').val()
            if (password !== value) {
                return '两次密码不一致'
            }
        }
    })

    $('#reg_form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#reg_form [name=username]').val(),
                password: $('#reg_form [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                $('#link_login').click()
            }
        })
    })
    $('#login_form').on('submit', function (e) {
        e.preventDefault()
        // console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            // {
            //     username: $('#login_form [name=username]').val(),
            //     password: $('#login_form [name=password]').val()
            // }
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = './index.html'
            }
        })
    })
})