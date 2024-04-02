import { useState, useRef } from "react";
import { useClickOutSide } from "../../../Hooks/useClickOutSide";
import { HiLockClosed } from "react-icons/hi";
import { BsCaretDownFill, BsCheck2 } from "react-icons/bs";
import { GiWorld } from "react-icons/gi";
import Button from "../../Button";
function Privacy({ formValues = {}, setFormValues = () => {} }) {
    const privacyList = [
        {
            id: 0,
            icon: GiWorld,
            name: "Công khai",
            des: "Bất kì ai cũng có thể nhìn thấy mọi người trong nhóm và những gì họ đăng",
        },
        {
            id: 1,
            icon: HiLockClosed,
            name: "Riêng tư",
            des: "Chỉ thành viên mới có thể nhìn thấy mọi người trong nhóm và những gì họ đăng",
        },
    ];
    const divRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [privacy, setPrivacy] = useState(privacyList[0]);
    useClickOutSide(divRef, () => setShowModal(false));
    return (
        <div ref={divRef} className="relative w-full mt-2 ">
            <div
                className="flex justify-between w-full p-2 border rounded-md cursor-pointer"
                onClick={() => setShowModal(!showModal)}
            >
                <div className="flex items-center">
                    <span>
                        <privacy.icon />
                    </span>
                    <span className="ml-2 font-medium ">{privacy.name}</span>
                </div>
                <div className="my-auto">
                    <BsCaretDownFill />
                </div>
            </div>
            {showModal && (
                <div
                    style={{
                        boxShadow: "rgb(142, 141, 141) 0px 1px 10px",
                    }}
                    className=" absolute top-[110%] left-0 w-full p-2 bg-white rounded-lg shadow-lg z-10"
                >
                    {privacyList.length > 0 &&
                        privacyList.map((item) => (
                            <Button
                                key={item.id}
                                _className={
                                    "flex w-full p-2 rounded-lg hover:bg-gray-200"
                                }
                                onClick={() => {
                                    setFormValues({
                                        ...formValues,
                                        status: item.id,
                                    });
                                    setPrivacy(item);
                                    setShowModal(false);
                                }}
                            >
                                <span className="flex justify-center items-center w-9 h-9 bg-gray-300 rounded-full">
                                    <item.icon className="text-[20px]" />
                                </span>
                                <span
                                    style={{
                                        maxWidth: "calc(100% - 36px)",
                                    }}
                                    className="grow flex text-left pl-3"
                                >
                                    <span className="grow flex flex-col">
                                        <span className=" font-medium text-[15px]">
                                            {item.name}
                                        </span>
                                        <span className=" font-normal text-[12px]">
                                            {item.des}
                                        </span>
                                    </span>
                                    {privacy?.id == item.id && (
                                        <span className="flex items-center w-max pl-3 pr-1">
                                            <BsCheck2 className="text-[20px] text-blue-500" />
                                        </span>
                                    )}
                                </span>
                            </Button>
                        ))}
                </div>
            )}
        </div>
    );
}

export default Privacy;
