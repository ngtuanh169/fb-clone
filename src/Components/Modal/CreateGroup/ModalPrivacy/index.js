import Button from "../../../Button";
import { AiOutlineCheck } from "react-icons/ai";
function ModalPrivacy({
    privacyList = [],
    privacy,
    setPrivacy,
    closeModal = () => {},
}) {
    return (
        <div
            style={{ boxShadow: "rgb(142, 141, 141) 0px 1px 10px" }}
            className="flex flex-col w-full p-2 bg-white rounded-md "
        >
            {privacyList.length > 0 &&
                privacyList.map((item) => (
                    <Button
                        key={item.id}
                        _className="flex p-2 rounded-md hover:bg-hover"
                        onClick={() => {
                            setPrivacy(item);
                            closeModal();
                        }}
                    >
                        <div className=" flex justify-center items-center w-9 h-9 bg-gray-300 rounded-full">
                            <item.icon />
                        </div>
                        <div className="flex w-full">
                            <div className="flex-1 flex flex-col w-[85%] ml-2">
                                <span className=" font-medium text-left">
                                    {item.name}
                                </span>
                                <span className=" text-[12px] text-gray-500 text-left">
                                    {item.des}
                                </span>
                            </div>
                            <div className="flex items-center w-[15%]">
                                {privacy.id === item.id && (
                                    <AiOutlineCheck className="text-blue-500 m-auto" />
                                )}
                            </div>
                        </div>
                    </Button>
                ))}
        </div>
    );
}

export default ModalPrivacy;
