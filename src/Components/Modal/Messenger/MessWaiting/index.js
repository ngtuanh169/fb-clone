import Button from "../../../Button";
import MessList from "./MessList";
import { HiOutlineArrowLeft } from "react-icons/hi";
function MessWaiting({ closeModal = () => {}, showMessWaiting = () => {} }) {
    return (
        <div className="w-full flex flex-col">
            <div className="flex w-full p-4">
                <Button
                    _className={
                        "flex items-center justify-center w-8 h-8 mr-2 rounded-full hover:bg-gray-200"
                    }
                    onClick={showMessWaiting}
                >
                    <HiOutlineArrowLeft className="text-[20px]" />
                </Button>
                <span className=" text-[24px] font-bold">
                    Tin nhắn đang chờ
                </span>
            </div>
            <div className="flex w-full ">
                <div className="border-b-2 border-blue-500">
                    <Button _className={"px-3 py-2 rounded-md "}>
                        <span className="text-[15px] text-blue-500 font-medium">
                            Bạn có thể biết
                        </span>
                    </Button>
                </div>
                <div className="">
                    <Button
                        _className={"px-3 py-2 rounded-md hover:bg-gray-200"}
                    >
                        <span className="text-[15px] font-medium">Spam</span>
                    </Button>
                </div>
            </div>
            <div className="w-full mt-2 py-3 px-[15px] bg-gray-100 ">
                <span className="text-[13px] text-[#65676b] leading-[15px] inline-block ">
                    Mở tin nhắn chờ để xem thông tin về người nhắn tin cho bạn.
                    Nếu bạn không trả lời thì họ sẽ không biết là bạn đã xem
                    đâu.
                </span>
            </div>
            <div className="w-full">
                <MessList closeModal={closeModal} />
            </div>
        </div>
    );
}

export default MessWaiting;
