import { useState } from "react";
import useForm from "../../Hooks/useForm";
import Button from "../../Components/Button";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { BiUserPlus } from "react-icons/bi";
function Login() {
    const validates = [
        { name: "email", rules: { isRequired: true, isEmail: true } },
        { name: "password", rules: { isRequired: true } },
    ];
    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const changeFormValues = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = () => {
        console.log(formValues);
    };
    const { invalid, errors, removeError, formSubmit } = useForm(
        validates,
        handleSubmit
    );
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className=" w-full max-w-[450px]  bg-white p-4 rounded-lg drop-shadow-md">
                <div className="text-center mb-4">
                    <span className=" text-blue-500 text-[20px] font-semibold">
                        facebook
                    </span>
                </div>
                <div className="flex flex-col border-b">
                    <div className="flex flex-col w-full mb-4">
                        <input
                            className="w-full px-4 py-3 rounded-md outline-none border focus:border-blue-500"
                            type="text"
                            value={formValues.email}
                            placeholder="Nhập email của bạn..."
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
                    <div className=" relative flex flex-col w-full mb-4 ">
                        <input
                            className="w-full h-full py-3 pl-3 pr-[34px] rounded-md border outline-none focus:border-blue-500"
                            type={showPassword ? "text" : "password"}
                            value={formValues.password}
                            placeholder="Nhập mật khẩu của bạn..."
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
                    <div className="w-full m-b4">
                        <Button
                            _className={
                                "w-full px-4 py-3 bg-blue-500 rounded-md"
                            }
                            onClick={() => formSubmit(formValues)}
                        >
                            <span className="text-white font-semibold">
                                Đăng nhập
                            </span>
                        </Button>
                    </div>
                    <div className="flex justify-center w-full px-4 py-3">
                        <Button>
                            <span className=" text-[14px] text-blue-500 hover:underline">
                                Quên mật khẩu?
                            </span>
                        </Button>
                    </div>
                </div>
                <div className="py-4">
                    <div className="flex justify-center w-full">
                        <Button
                            to={"/register"}
                            _className={
                                "flex items-center text-white font-semibold px-4 py-3 bg-green-500 rounded-md"
                            }
                        >
                            <BiUserPlus className=" text-[20px]" />
                            <span className="ml-2">Tạo tài khoản mới</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
