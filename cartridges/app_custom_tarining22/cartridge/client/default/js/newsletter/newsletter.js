'use strict';
var formValidation = require('base/components/formValidation');
module.exports = {
    submitNewsletter: function () {
        $('form.newsletter-form').submit(function (e) {
            var $form = $(this);
            e.preventDefault();
            var url = $form.attr('action');
            $form.spinner().start();
            $('form.newsletter-form').trigger('newsletter:submit', e);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: $form.serialize(),
                success: function (data) {
                    $form.spinner().stop();
                    if (!data.success) {
                        e.stopPropagation()
                        formValidation($form, data);
                        $('.surevy-alert-failed').toggleClass("d-none")
                    } else {
                        $('.surevy-alert-success').toggleClass("d-none")
                        setTimeout(() => {
                            window.location.href = data.redirectUrl;
                        }, 3000);
                    }
                },
                error: function (err) {
                    if (err.responseJSON.redirectUrl) {
                        window.location.href = err.responseJSON.redirectUrl;
                    }
                    $form.spinner().stop();
                }
            });
            return false;
        });
    }
};
