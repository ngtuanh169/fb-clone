import { useState } from "react";
import { FaMoon } from "react-icons/fa";
function DarkMode({ onClick = () => {} }) {
    const [darkMode, setdarkMode] = useState(false);
    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center w-full p-2 rounded-md">
                <span
                    className="flex justify-center items-center w-8 h-8 cursor-pointer rounded-full hover:bg-gray-300"
                    onClick={onClick}
                >
                    <i className=" bg-urlIcons bg-szIcons w-5 h-5 bg-leftIcon bg-no-repeat inline-block"></i>
                </span>
                <span className="ml-4 text-[20px] font-bold ">Màn hình</span>
            </div>
            <div className="flex w-full p-2 rounded-md  ">
                <span className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-300">
                    <FaMoon />
                </span>
                <div className="flex flex-col flex-1 ml-2  ">
                    <span className="text-[15px] pl-2 font-medium leading-[1.333] mb-1">
                        Chế độ tối
                    </span>
                    <span className="text-[13px] text-gray-500 pl-2 leading-[1.333]">
                        Điều chỉnh giao diện của Facebook để giảm độ chói và cho
                        đôi mắt được nghỉ ngơi.
                    </span>
                    <div className="mt-2">
                        <div
                            className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-hover"
                            onClick={() => setdarkMode(true)}
                        >
                            <span className="text-[15px] font-medium">Bật</span>
                            <input
                                className="h-4 w-4"
                                type="radio"
                                checked={darkMode}
                            />
                        </div>
                        <div
                            className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-hover"
                            onClick={() => setdarkMode(false)}
                        >
                            <span className="text-[15px] font-medium">Tắt</span>
                            <input
                                className="h-4 w-4"
                                type="radio"
                                checked={!darkMode}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DarkMode;
