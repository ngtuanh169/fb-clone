import { useContext } from "react";
import { Link } from "react-router-dom";
import { formatNumberK } from "../../../Hooks/useFormat";
import { ScreenSize } from "../../../App";
import Button from "../../../Components/Button";
import { BsDot } from "react-icons/bs";
function GroupItem({ data = {} }) {
    const context = useContext(ScreenSize);
    return (
        <div className=" w-full mb-4">
            <div className="flex flex-1 mr-2">
                <div className="mr-4 w-max">
                    <Link to={"/"}>
                        <img
                            className="w-[60px] h-[60px] rounded-lg"
                            src={data.banner}
                            alt=""
                        />
                    </Link>
                </div>
                <div className="flex-1 flex flex-col md:flex-row">
                    <div className="flex flex-1 flex-col">
                        <div className="">
                            <Link to={`/group/${data.id}`}>
                                <span className="whitespace-nowrap line-clamp-1 font-semibold hover:underline">
                                    {data.name}
                                </span>
                            </Link>
                        </div>
                        <div className="flex flex-col md:flex-row h-max text-[15px] text-gray-500">
                            <div className="pr-2">
                                <span className="">{data.status}</span>
                            </div>
                            <div className="flex">
                                <div className=" relative pr-2 md:px-2">
                                    <span className="whitespace-nowrap">
                                        {formatNumberK(data.members)} thành viên
                                    </span>
                                    {context.width >= 768 && (
                                        <BsDot className=" absolute left-[-6px] top-[4px] " />
                                    )}
                                </div>
                                {data.joined && (
                                    <div className="relative px-2">
                                        <span className=" line-clamp-1">
                                            Đã tham gia
                                        </span>
                                        <BsDot className=" absolute left-[-6px] top-[4px]" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-2 md:mt-0 ">
                            <span className="text-[13px] text-gray-500 line-clamp-2">
                                {data.des && data.des}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center w-full md:w-auto md:h-full md:ml-2 mt-2 md:mt-0 ">
                        <Button
                            _className={`w-full md:w-auto p-2 rounded-md ${
                                data.joined
                                    ? "bg-gray-200 hover:bg-gray-300"
                                    : "bg-blue-100 hover:bg-blue-300"
                            } `}
                        >
                            <span
                                className={` font-semibold  ${
                                    data.joined ? "" : "text-blue-800"
                                }`}
                            >
                                {data.joined ? "Truy cập" : "Tham gia nhóm"}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupItem;
