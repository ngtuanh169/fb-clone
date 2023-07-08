import { useState } from "react";
import SubLayoutLeft from "../../Components/SubLayoutLeft";
import SearchSubLayout from "../../Components/Modal/SearchSubLayout";
import MainCard from "../../Components/MainCard";
import Button from "../../Components/Button";
import GroupTool from "./GroupTool";
import GroupList from "./GroupList";
import CreateGroup from "../../Components/Modal/CreateGroup";
import { BiPlus } from "react-icons/bi";
function Groups() {
    const toolList = [
        { id: 1, name: "Nhóm của bạn" },
        { id: 2, name: "Tất cả nhóm" },
    ];
    const [isTool, setIsTool] = useState(toolList[0].id);
    const [showModal, setShowModal] = useState(false);
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
                                <SearchSubLayout nameInput="Tìm kiếm nhóm" />
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
                                            isTool={isTool}
                                            setIsTool={setIsTool}
                                            toolList={toolList}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <GroupList />
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
