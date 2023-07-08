import { useState, useEffect } from "react";
function useForm(validates, callback) {
    const ojRules = {
        isRequired: (value) => {
            return value.toString().trim().length > 0
                ? undefined
                : "Mục này không được để trống";
        },
        isConfirmPassword: (value, password) => {
            return value === password
                ? undefined
                : "Bạn nhập mật khẩu không trùng khớp";
        },
        isFlies: (value) => {
            const types = ["image/png", "image/jpg", "image/jpeg", "video/mp4"];
            for (const key in value) {
                const check = types.includes(value[key].type);
                if (!check) {
                    return `Bạn vui lòng nhập đúng file (${types.join(", ")} )`;
                }
            }
        },
        isMinLength: (value, length) => {
            return value.trim().length >= length
                ? undefined
                : `Vui lòng nhập tối thiểu ${length} ký tự`;
        },
        isMaxLength: (value, length) => {
            return value.trim().length <= length
                ? undefined
                : `Vui lòng nhập tối đa ${length} ký tự`;
        },
        isEmail: (value) => {
            const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regexEmail.test(value)
                ? undefined
                : "Bạn vui lòng nhập đúng email";
        },
        isPhoneNumber: (value) => {
            const regexPhoneNumber =
                /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g;
            return regexPhoneNumber.test(value)
                ? undefined
                : `Nhập số điện thoại không hợp lệ`;
        },
    };
    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false);
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submit) {
            callback();
            setSubmit(false);
        } else {
            setSubmit(false);
        }
    }, [submit]);
    console.log(submit);
    const invalid = (name, value) => {
        const validate = validates.filter((item) => item.name === name);
        if (validate.length > 0) {
            const rules = validate[0].rules;
            for (const key in rules) {
                const error = ojRules[key](value, rules[key]);
                if (error) {
                    setErrors((prev) => ({ ...prev, [name]: error }));
                    break;
                }
            }
        }
    };
    const removeError = (name) => {
        delete errors[name];
        setErrors(errors);
    };
    const formSubmit = (values) => {
        for (const key in values) {
            invalid(key, values[key]);
        }
        setSubmit(true);
    };
    return { errors, invalid, removeError, formSubmit };
}

export default useForm;
