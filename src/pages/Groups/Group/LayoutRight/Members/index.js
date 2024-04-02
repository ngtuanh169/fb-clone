import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { formatNumber } from "../../../../../Hooks/useFormat";
import MainCard from "../../../../../Components/MainCard";
import { GroupContext } from "../../GroupProvider";
import AdminGroup from "./AdminGroup";
import MembersNearYou from "./MembersNearYou";
import MembersGroup from "./MembersGroup";
import SearchMember from "./SearchMember";
import Member from "./Member";
import { BsSearch } from "react-icons/bs";
function Members() {
    const user = useSelector((state) => state.user);
    const { groupData } = useContext(GroupContext);
    const [searchText, setSeacrhText] = useState("");
    return (
        <div className="w-full md:w-[680px] mx-auto ">
            <MainCard>
                <div className="flex flex-col p-4">
                    <div className="flex flex-col pb-4 border-b-2">
                        <div className="flex items-center w-full">
                            <span className=" font-medium">Thành viên</span>
                            <span className="px-1 font-medium">·</span>
                            <span className=" font-medium text-gray-500">
                                {formatNumber(groupData.members)}
                            </span>
                        </div>
                        <div className="w-full text-gray-500">
                            <span>
                                Người và Trang mới tham gia nhóm này sẽ hiển thị
                                tại đây.
                            </span>
                        </div>
                        <div className="flex w-full px-2 py-1 mt-2 bg-gray-100 rounded-full">
                            <div className="flex items-center mr-2">
                                <label htmlFor="searchUser">
                                    <BsSearch />
                                </label>
                            </div>
                            <div className="flex-1">
                                <input
                                    className="w-full bg-transparent outline-none"
                                    type="text"
                                    id="searchUser"
                                    value={searchText}
                                    placeholder="Tìm thành viên"
                                    onChange={(e) =>
                                        setSeacrhText(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    {searchText ? (
                        <SearchMember text={searchText} />
                    ) : (
                        <>
                            <div className="w-full py-4 border-b ">
                                <Member
                                    data={{
                                        id: user.userId,
                                        name: `${user.fName} ${user.lName}`,
                                        avatar: user.avatar,
                                        sx: user.sx,
                                        statusLogin: true,
                                    }}
                                />
                            </div>
                            <AdminGroup />
                            <MembersNearYou />
                            <MembersGroup />
                        </>
                    )}
                </div>
            </MainCard>
        </div>
    );
}

export default Members;
