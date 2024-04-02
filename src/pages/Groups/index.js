import { useState, useEffect } from "react";
import SubLayoutLeft from "../../Components/SubLayoutLeft";
import SearchSubLayout from "../../Components/Modal/SearchSubLayout";
import MainCard from "../../Components/MainCard";
import Button from "../../Components/Button";
import CreateGroup from "../../Components/Modal/CreateGroup";
import GroupTool from "./GroupTool";
import GroupList from "./GroupList";
import AllGroups from "./AllGroups";
import YourGroups from "./YourGroups";
import { BiPlus } from "react-icons/bi";
function Groups() {
    const navList = [
        { id: 1, name: "Nhóm của bạn", Comp: YourGroups },
        { id: 2, name: "Tất cả nhóm", Comp: AllGroups },
    ];
    const [currentNav, setCurrentNav] = useState(navList[0]);
    const [showModal, setShowModal] = useState(false);
    const [groupName, setGroupName] = useState("");
    return (
        <>
            {showModal && (
                <CreateGroup closeModal={() => setShowModal(false)} />
            )}
            <div className="flex">
                <div className="flex flex-col lg:flex-row w-full">
                    <div className="">
                        <SubLayoutLeft name={"Nhóm"}>
                            <div className="">
                                <SearchSubLayout
                                    nameInput="Tìm kiếm nhóm"
                                    text={groupName}
                                    setText={setGroupName}
                                />
                            </div>
                            <div className="w-full p-2">
                                <Button
                                    _className={
                                        "flex justify-center items-center w-full p-2 rounded-md bg-blue-100 hover:bg-blue-200"
                                    }
                                    onClick={() => setShowModal(true)}
                                >
                                    <BiPlus className="text-blue-500" />
                                    <span className="ml-1 text-blue-500 font-medium">
                                        Tạo nhóm mới
                                    </span>
                                </Button>
                            </div>
                        </SubLayoutLeft>
                    </div>
                    <div className="flex-1">
                        <div className="pt-6 w-full sm:w-[680px] mx-auto">
                            <MainCard>
                                <div className="p-4">
                                    <div className="w-full">
                                        <span className=" text-[20px] font-bold">
                                            Nhóm
                                        </span>
                                    </div>
                                    <div className="">
                                        <GroupTool
                                            currentNav={currentNav}
                                            setCurrentNav={setCurrentNav}
                                            navList={navList}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <currentNav.Comp
                                            groupName={groupName}
                                        />
                                    </div>
                                </div>
                            </MainCard>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Groups;
