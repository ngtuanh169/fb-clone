import { useState, useRef, useContext } from "react";
import { useClickOutSide } from "../../../Hooks/useClickOutSide";
import MainCard from "../../MainCard";
import Modal from "../";
import Button from "../../Button";
import ModalPrivacy from "./ModalPrivacy";
import InputAddFriends from "./InputAddFriends";
import { FriendsProvider, FriendsContext } from "./FriendsProvider";
import { CgClose } from "react-icons/cg";
import { HiLockClosed } from "react-icons/hi";
import { BsCaretDownFill } from "react-icons/bs";
import { GiWorld } from "react-icons/gi";
function CreateGroup({ closeModal = () => {} }) {
    const privacyList = [
        {
            id: 1,
            icon: GiWorld,
            name: "Công khai",
            des: "Bất kì ai cũng có thể nhìn thấy mọi người trong nhóm và những gì họ đăng",
        },
        {
            id: 2,
            icon: HiLockClosed,
            name: "Riêng tư",
            des: "Chỉ thành viên mới có thể nhìn thấy mọi người trong nhóm và những gì họ đăng",
        },
    ];
    const modalPrivacyRef = useRef();

    const [privacy, setPrivacy] = useState(privacyList[0]);

    const [modalPrivacy, setModalPrivacy] = useState(false);

    useClickOutSide(modalPrivacyRef, () => setModalPrivacy(false));
    return (
        <FriendsProvider>
            <Modal closeModal={closeModal}>
                <div className="w-[370px] sm:w-[500px]  m-auto">
                    <MainCard>
                        <div className=" relative w-full px-4 pt-4 pb-2 text-center border-b">
                            <span className=" text-[18px] font-semibold">
                                Tạo nhóm
                            </span>
                            <div className="absolute top-[10px] right-[10px] h-full">
                                <Button
                                    _className={
                                        " h-9 w-9 my-auto rounded-full bg-gray-200 hover:bg-gray-300 "
                                    }
                                    onClick={closeModal}
                                >
                                    <CgClose className="m-auto text-[22px]" />
                                </Button>
                            </div>
                        </div>
                        <div className=" flex flex-col w-full px-4 py-2">
                            <div className="">
                                <span className=" font-medium">Tên nhóm</span>
                            </div>
                            <div className="mt-2">
                                <textarea
                                    className="w-full p-2 outline-none border rounded-md "
                                    rows="2"
                                ></textarea>
                            </div>
                        </div>
                        <div className=" w-full px-4 py-2">
                            <div className=" flex flex-col w-full">
                                <div className="">
                                    <span className=" font-medium">
                                        Chọn quyền riêng tư
                                    </span>
                                </div>
                                <div
                                    ref={modalPrivacyRef}
                                    className="relative flex justify-between w-full p-2 mt-2 border rounded-md cursor-pointer"
                                    onClick={() =>
                                        setModalPrivacy(!modalPrivacy)
                                    }
                                >
                                    <div className="flex items-center">
                                        <privacy.icon />
                                        <span className="ml-2 font-medium">
                                            {privacy.name}
                                        </span>
                                    </div>
                                    <div className="my-auto">
                                        <BsCaretDownFill />
                                    </div>
                                    {modalPrivacy && (
                                        <div className=" absolute top-[110%] left-0 w-full px-2 z-30">
                                            <ModalPrivacy
                                                privacyList={privacyList}
                                                privacy={privacy}
                                                setPrivacy={setPrivacy}
                                                closeModal={() =>
                                                    setModalPrivacy(false)
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col w-full px-4 pt-2 pb-4">
                            <div className="flex">
                                <span className=" font-medium">Mời bạn bè</span>
                                <span className=" font-light ml-1">
                                    (không bắt buộc)
                                </span>
                            </div>
                            <InputAddFriends />
                        </div>
                    </MainCard>
                </div>
            </Modal>
        </FriendsProvider>
    );
}

export default CreateGroup;
