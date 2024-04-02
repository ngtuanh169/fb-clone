import { useContext } from "react";
import { GroupContext } from "../../../GroupProvider";
import { formatFullDate } from "../../../../../../Hooks/useFormat";
import MainCard from "../../../../../../Components/MainCard";
import Button from "../../../../../../Components/Button";
import { HiLockClosed } from "react-icons/hi";
import { GiEarthAmerica } from "react-icons/gi";
import { GoEye } from "react-icons/go";
import { BsClock } from "react-icons/bs";
function Introduce() {
    const { groupData } = useContext(GroupContext);
    return (
        <div className="w-full">
            <MainCard>
                <div className="flex flex-col p-4">
                    <div className="">
                        <span className=" font-medium">Giới thiệu</span>
                    </div>
                    <div className="flex mt-3 ">
                        <div className="pt-1">
                            {groupData.status == 0 ? (
                                <GiEarthAmerica className="text-[22px]" />
                            ) : (
                                <HiLockClosed className="text-[22px]" />
                            )}
                        </div>
                        {groupData.status == 0 ? (
                            <div className="flex-1 flex flex-col ml-3 leading-[1.333]">
                                <span className=" font-medium">Công khai</span>
                                <span className="mt-1 text-[14px]">
                                    Ai cũng có thể nhìn thấy mọi người trong
                                    nhóm và những gì họ đăng.
                                </span>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col ml-3 leading-[1.333]">
                                <span className=" font-medium">Riêng tư</span>
                                <span className="mt-1 text-[14px]">
                                    Chỉ thành viên mới nhìn thấy mọi người trong
                                    nhóm và những gì họ đăng.
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex mt-3 ">
                        <div className="pt-1">
                            <GoEye className="text-[22px]" />
                        </div>
                        {groupData.display == 0 ? (
                            <div className="flex-1 flex flex-col ml-3 leading-[1.333]">
                                <span className=" font-medium">Hiển thị</span>
                                <span className="mt-1 text-[14px]">
                                    Ai cũng có thể tìm thấy nhóm này.
                                </span>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col ml-3 leading-[1.333]">
                                <span className=" font-medium">Ẩn</span>
                                <span className="mt-1 text-[14px]">
                                    Chỉ thành viên mới có thể tìm thấy nhóm này
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex mt-3 ">
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
                    <div className="w-full mt-4 ">
                        <Button
                            _className={
                                "block w-full py-[5px] text-center rounded-md bg-gray-200 hover:bg-gray-300"
                            }
                            to={`/group/${groupData.id}/introduce`}
                        >
                            <span className=" font-medium">Tìm hiểu thêm</span>
                        </Button>
                    </div>
                </div>
            </MainCard>
        </div>
    );
}

export default Introduce;
