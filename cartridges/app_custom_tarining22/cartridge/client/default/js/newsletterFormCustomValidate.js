exports.validate = function (form) {
    if (form.subscribeToSecondEmailList.checked && form.firstName.value.isEmpty()) {
        form.firstName.invalidateFormElement('error.firstname.reqired.to.subscribe.to.additional.list');
        return false;
    }
    return true;
};
