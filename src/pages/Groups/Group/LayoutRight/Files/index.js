import { useState } from "react";
import MainCard from "../../../../../Components/MainCard";
import FileItem from "./FileItem";
import Button from "../../../../../Components/Button";
import avt from "../../../../../assets/images/avatar/avatar.jpg";
function Files() {
    const options = [
        { name: "Ảnh", value: 1 },
        { name: "Video", value: 2 },
    ];
    const [option, setOption] = useState(options[0].value);
    return (
        <MainCard>
            <div className="px-4 pt-4 pb-2 border-b">
                <span className=" text-[18px] font-semibold">Files</span>
            </div>
            <div className="flex px-4 py-2">
                {options.map((item) => (
                    <div
                        className={`border-b-2 mr-2 ${
                            option === item.value
                                ? " border-blue-500"
                                : " border-transparent"
                        }`}
                    >
                        <Button
                            _className={`px-3 py-1 font-medium rounded-md ${
                                option === item.value
                                    ? "text-blue-500 cursor-default"
                                    : " bg-gray-200 hover:bg-gray-300"
                            }`}
                            onClick={() => setOption(item.value)}
                        >
                            <span>{item.name}</span>
                        </Button>
                    </div>
                ))}
            </div>
            <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 px-2 pb-2">
                {Array(7)
                    .fill()
                    .map((item, index) => (
                        <div key={index} className="">
                            <FileItem avt={avt} />
                        </div>
                    ))}
            </div>
        </MainCard>
    );
}

export default Files;
