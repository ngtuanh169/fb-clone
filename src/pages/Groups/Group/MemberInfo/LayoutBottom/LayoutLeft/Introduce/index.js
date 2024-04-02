import { Link } from "react-router-dom";
import MainCard from "../../../../../../../Components/MainCard";
import { GroupContext } from "../../../../GroupProvider";
import { HiUserGroup } from "react-icons/hi";
import { useContext } from "react";
import { formatFullDate } from "../../../../../../../Hooks/useFormat";
function Introduce({ data = {} }) {
    const { groupData } = useContext(GroupContext);
    const date = new Date(1681821128145);
    console.log(data);
    return (
        <div className="w-full">
            <MainCard>
                <div className="flex flex-col p-4">
                    <div className="">
                        <span className="text-[18px] font-bold">
                            Giới thiệu
                        </span>
                    </div>
                    <div className="flex items-center mt-3  ">
                        <div className="">
                            <HiUserGroup className="text-[22px] text-gray-500" />
                        </div>
                        <div className="flex-1 ml-3 text-[15px] ">
                            {data.joined ? (
                                <span className=" line-clamp-2">
                                    <span>Thành viên của</span>
                                    <Link
                                        to={`/group/${groupData.id}`}
                                        className="mx-1 font-medium hover:underline"
                                    >
                                        {groupData.name}
                                    </Link>
                                    <span>{`từ ${formatFullDate(
                                        data.createdAt
                                    )}`}</span>
                                </span>
                            ) : (
                                <span className="line-clamp-2">
                                    <span>Chưa là thành viên của nhóm</span>
                                    <Link
                                        to={`/group/${groupData.id}`}
                                        className="mx-1 font-medium hover:underline"
                                    >
                                        {groupData.name}
                                    </Link>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </MainCard>
        </div>
    );
}

export default Introduce;
