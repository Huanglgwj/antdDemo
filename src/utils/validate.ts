const validate = {
    isEmpty: (value: string | number) => {
        return value.toString().length > 0;
    },
    isMobile: (value: string | number) => {
        var _length = value.toString().length;
        if (_length > 0) {
            var mobile = new RegExp(/(^(1)\d{10})$/);
            return _length === 11 && mobile.test(value.toString());
        } else {
            return false;
        }
    },
};
export default validate;
