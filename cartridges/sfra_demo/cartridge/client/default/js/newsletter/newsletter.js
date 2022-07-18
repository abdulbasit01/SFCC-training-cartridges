'use strict';

var formValidation = require('base/components/formValidation');

module.exports = {
    newsletter: function () {
        $('.equal-height').submit(function (e) {
            var $form = $(this);
            e.preventDefault();
            console.log($form);
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
                        formValidation($form, data);
                    } else {
                        window.location.href = data.redirectUrl;
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
