import { useState } from "react";
import Button from "../../../../Components/Button";
function FormWork({ closeForm = () => {} }) {
    const [isFocus, setIsFocus] = useState(false);
    return (
        <div className="flex flex-col w-full ">
            <div
                className={`flex flex-col w-full transition-all ease-linear border-[2px] p-[2px] rounded-md ${
                    isFocus ? "border-blue-500" : "border-transparent"
                } `}
            >
                <div
                    className={`w-full border rounded-md transition-all ease-linear p-2 hover:border-gray-700`}
                >
                    <label
                        htmlFor="form_work"
                        className={`flex w-full text-[12px]  transition-all ease-linear  ${
                            isFocus ? "text-blue-500" : ""
                        } `}
                    >
                        Công ty
                    </label>
                    <input
                        className=" outline-none w-full"
                        type="text"
                        id="form_work"
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                    />
                </div>
            </div>
            <div className="my-3 border-b"></div>
            <div className="flex justify-end">
                <Button
                    _className={
                        "px-3 py-1 rounded-md mr-3 font-medium bg-gray-200 hover:bg-gray-300"
                    }
                    onClick={closeForm}
                >
                    Hủy
                </Button>
                <Button
                    _className={
                        "px-3 py-1 rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600"
                    }
                    onClick={closeForm}
                >
                    Lưu
                </Button>
            </div>
        </div>
    );
}

export default FormWork;
