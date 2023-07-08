import { useState } from "react";
import useForm from "../../Hooks/useForm";
import Button from "../../Components/Button";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { FiLogIn } from "react-icons/fi";

function Register() {
    const [formValues, setFormValues] = useState({
        fName: "",
        lName: "",
        sx: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validates = [
        {
            name: "fName",
            rules: { isRequired: true, isMinLength: 2, isMaxLength: 10 },
        },
        {
            name: "lName",
            rules: { isRequired: true, isMinLength: 2, isMaxLength: 20 },
        },
        {
            name: "password",
            rules: { isRequired: true, isMinLength: 6, isMaxLength: 12 },
        },
        {
            name: "confirm",
            rules: { isRequired: true, isConfirmPassword: formValues.password },
        },
        {
            name: "sx",
            rules: { isRequired: true },
        },
        {
            name: "email",
            rules: { isRequired: true, isEmail: true },
        },
    ];
    const changeFormValues = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = () => {
        console.log(formValues);
    };
    const { errors, invalid, removeError, formSubmit } = useForm(
        validates,
        handleSubmit
    );
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className=" bg-white p-4 rounded-lg drop-shadow-md">
                <div className="text-center mb-4">
                    <span className=" text-blue-500 text-[20px] font-semibold">
                        facebook
                    </span>
                </div>
                <div className="flex flex-col pb-4 border-b">
                    <div className=" grid grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col w-full">
                            <input
                                className="px-4 py-3 bg-gray-100 outline-none rounded-md border border-gray-300"
                                type="text"
                                placeholder="Họ"
                                name="fName"
                                value={formValues.fname}
                                onChange={(e) => {
                                    changeFormValues("fName", e.target.value);
                                    removeError("fName");
                                }}
                                onBlur={(e) => invalid("fName", e.target.value)}
                            />
                            <span className="text-[13px] text-red-500">
                                {errors.fName ? errors.fName : ""}
                            </span>
                        </div>
                        <div className="flex flex-col w-full">
                            <input
                                className="px-4 py-3 bg-gray-100 outline-none rounded-md border border-gray-300"
                                type="text"
                                placeholder="Tên"
                                name="lName"
                                value={formValues.lname}
                                onChange={(e) => {
                                    changeFormValues("lName", e.target.value);
                                    removeError("lName");
                                }}
                                onBlur={(e) => invalid("lName", e.target.value)}
                            />
                            <span className="text-[13px] text-red-500">
                                {errors.lName ? errors.lName : ""}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col w-full mb-4">
                        <input
                            className="w-full px-4 py-3 bg-gray-100 rounded-md outline-none border border-gray-300"
                            type="text"
                            value={formValues.email}
                            placeholder="email"
                            onChange={(e) => {
                                changeFormValues("email", e.target.value);
                                removeError("email");
                            }}
                            onBlur={(e) => invalid("email", e.target.value)}
                        />
                        <span className="text-[13px] text-red-500">
                            {errors.email ? errors.email : ""}
                        </span>
                    </div>
                    <div className=" relative flex flex-col  w-full mb-4 ">
                        <input
                            className="w-full h-full py-3 pl-3 pr-[34px] bg-gray-100 rounded-md border outline-none border-gray-300"
                            type={showPassword ? "text" : "password"}
                            value={formValues.password}
                            name="password"
                            placeholder="Mật khẩu của bạn"
                            onChange={(e) => {
                                changeFormValues("password", e.target.value);
                                removeError("password");
                            }}
                            onBlur={(e) => invalid("password", e.target.value)}
                        />
                        <span className="text-[13px] text-red-500">
                            {errors.password ? errors.password : ""}
                        </span>
                        {formValues.password && (
                            <div className=" absolute right-[10px] flex items-center h-full">
                                <Button
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    <span>
                                        {showPassword ? (
                                            <ImEye />
                                        ) : (
                                            <ImEyeBlocked />
                                        )}
                                    </span>
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className=" relative flex flex-col  w-full mb-4 ">
                        <input
                            className="w-full h-full py-3 pl-3 pr-[34px] bg-gray-100 rounded-md border outline-none border-gray-300"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formValues.confirm}
                            name="confirm"
                            placeholder="Nhập lại mật khẩu"
                            onChange={(e) => {
                                changeFormValues("confirm", e.target.value);
                                removeError("confirm");
                            }}
                            onBlur={(e) => invalid("confirm", e.target.value)}
                        />
                        <span className="text-[13px] text-red-500">
                            {errors.confirm ? errors.confirm : ""}
                        </span>
                        {formValues.confirm && (
                            <div className=" absolute right-[10px] flex items-center h-full">
                                <Button
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    <span>
                                        {showConfirmPassword ? (
                                            <ImEye />
                                        ) : (
                                            <ImEyeBlocked />
                                        )}
                                    </span>
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col mb-4">
                        <div className="">
                            <span className="flex items-center text-[13px]">
                                Giới tính
                            </span>
                        </div>
                        <div className="flex mt-1">
                            <div
                                className="px-4 py-2 rounded-md border mr-4"
                                onClick={() => {
                                    changeFormValues("sx", 0);
                                    removeError("sx");
                                }}
                            >
                                <label className=" mr-6">Nam</label>
                                <input
                                    type="radio"
                                    checked={formValues.sx === 0}
                                    readOnly
                                />
                            </div>
                            <div
                                className="px-4 py-2 rounded-md border"
                                onClick={() => {
                                    changeFormValues("sx", 1);
                                    removeError("sx");
                                }}
                            >
                                <label className=" mr-6">Nữ</label>
                                <input
                                    type="radio"
                                    checked={formValues.sx === 1}
                                    readOnly
                                />
                            </div>
                        </div>
                        <span className="text-[13px] text-red-500">
                            {errors.sx ? errors.sx : ""}
                        </span>
                    </div>
                    <div className="w-full m-b4">
                        <Button
                            _className={
                                "w-full px-4 py-3 bg-green-500 rounded-md"
                            }
                            onClick={() => formSubmit(formValues)}
                        >
                            <span className="text-white font-semibold">
                                Đăng ký
                            </span>
                        </Button>
                    </div>
                </div>
                <div className="py-4">
                    <div className="flex justify-center w-full">
                        <Button
                            to={"/login"}
                            _className={
                                "flex items-center text-white font-semibold px-4 py-3 bg-blue-500 rounded-md"
                            }
                        >
                            <FiLogIn />
                            <span className="ml-2 px-1">Đăng nhập</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
