import { useState } from "react";
import MainCard from "../../../../../Components/MainCard";
import { formatNumber } from "../../../../../Hooks/useFormat";
import AdminGroup from "./AdminGroup";
import Friends from "./Friends";
import NewJoinGroup from "./NewJoinGroup";
import SearchMember from "./SearchMember";
import Member from "./Member";
import { BsSearch } from "react-icons/bs";
import avt from "../../../../../assets/images/avatar/avatar.jpg";
function Members() {
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
                                {formatNumber(3040)}
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
                            <div className="w-full pb-4 border-b ">
                                <Member
                                    id={1}
                                    avt={avt}
                                    name={"Nguyen Tu Anh"}
                                    address={"Hà Nội"}
                                    hideButton={true}
                                />
                            </div>
                            <AdminGroup />
                            <Friends />
                            <NewJoinGroup />
                        </>
                    )}
                </div>
            </MainCard>
        </div>
    );
}

export default Members;
