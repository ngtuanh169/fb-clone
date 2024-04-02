import { useContext } from "react";
import { GroupContext } from "../../GroupProvider";
import { formatFullDate } from "../../../../../Hooks/useFormat";
import MainCard from "../../../../../Components/MainCard";
import Members from "./Members";
import Activity from "./Activity";
import { HiLockClosed } from "react-icons/hi";
import { GiEarthAmerica } from "react-icons/gi";
import { GoEye } from "react-icons/go";
import { BsClock } from "react-icons/bs";
function Intro() {
    const { groupData } = useContext(GroupContext);
    return (
        <div className="flex flex-col w-[680px] max-w-full mx-auto ">
            <MainCard>
                <div className="w-full p-5">
                    <div className="pb-5 border-b">
                        <span className="font-semibold text-[17px]">
                            Giới thiệu về nhóm này
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                        {groupData.des && (
                            <span className=" font-normal text-[14px]">
                                {groupData.des}
                            </span>
                        )}
                        <div className="flex  ">
                            <div className="pt-1">
                                {groupData.status == 0 ? (
                                    <GiEarthAmerica className="text-[22px]" />
                                ) : (
                                    <HiLockClosed className="text-[22px]" />
                                )}
                            </div>
                            {groupData.status == 0 ? (
                                <div className="flex-1 flex flex-col ml-3 leading-[1.333]">
                                    <span className=" font-medium">
                                        Công khai
                                    </span>
                                    <span className="mt-1 text-[14px] font-normal">
                                        Ai cũng có thể nhìn thấy mọi người trong
                                        nhóm và những gì họ đăng.
                                    </span>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col ml-3 leading-[1.333]">
                                    <span className=" font-medium">
                                        Riêng tư
                                    </span>
                                    <span className="mt-1 text-[14px] font-normal">
                                        Chỉ thành viên mới nhìn thấy mọi người
                                        trong nhóm và những gì họ đăng.
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex ">
                            <div className="pt-1">
                                <GoEye className="text-[22px]" />
                            </div>
                            {groupData.display == 0 ? (
                                <div className="flex-1 flex flex-col ml-3 leading-[1.333]">
                                    <span className=" font-medium">
                                        Hiển thị
                                    </span>
                                    <span className="mt-1 text-[14px] font-normal">
                                        Ai cũng có thể tìm thấy nhóm này.
                                    </span>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col ml-3 leading-[1.333]">
                                    <span className=" font-medium">Ẩn</span>
                                    <span className="mt-1 text-[14px] font-normal">
                                        Chỉ thành viên mới có thể tìm thấy nhóm
                                        này
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex ">
                            <div className="pt-1">
                                <BsClock className="text-[22px]" />
                            </div>
                            <div className="flex-1 flex flex-col ml-3 leading-[1.333]">
                                <span className=" font-medium">Lịch sử</span>
                                <span className="flex mt-1 text-[14px]">
                                    <span className="mr-1">Tạo nhóm ngày</span>
                                    {formatFullDate(groupData.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </MainCard>
            <Members />
            <Activity />
        </div>
    );
}

export default Intro;
