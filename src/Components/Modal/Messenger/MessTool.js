import Button from "../../Button";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdZoomOutMap } from "react-icons/md";
import { MdPhotoCameraFront } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import { AiOutlineSearch } from "react-icons/ai";
function MessTool() {
    return (
        <div className="w-full px-4 pt-4">
            <div className="flex justify-between items-center w-full">
                <h2 className=" font-bold text-xl">Chat</h2>
                <ul className="flex">
                    <li className="flex justify-center items-center w-[35px] h-[35px] rounded-full ml-5 text-[20px] cursor-pointer hover:bg-hover">
                        <BiDotsHorizontalRounded className="text-base" />
                    </li>
                    <li className="flex justify-center items-center w-[35px] h-[35px] rounded-full ml-5 text-[20px] cursor-pointer hover:bg-hover">
                        <MdZoomOutMap />
                    </li>
                    <li className="flex justify-center items-center w-[35px] h-[35px] rounded-full ml-5 text-[25px] cursor-pointer hover:bg-hover">
                        <MdPhotoCameraFront />
                    </li>
                    <li className="flex justify-center items-center w-[35px] h-[35px] rounded-full ml-5 text-[20px] cursor-pointer hover:bg-hover">
                        <SlNote />
                    </li>
                </ul>
            </div>
            <div className="flex w-full mt-4 py-1 px-4 bg-hover rounded-full">
                <Button>
                    <AiOutlineSearch />
                </Button>
                <input
                    className=" bg-transparent outline-none ml-2 text-[15px] w-full"
                    type="text"
                    placeholder="Tìm kiếm trên Messenger"
                />
            </div>
            <div className="flex w-full mt-4">
                <Button
                    _className={
                        "flex items-center py-1 px-2 rounded-full bg-blue-100 cursor-pointer"
                    }
                >
                    <span className=" text-blue-500 font-semibold text-base">
                        Hộp thư
                    </span>
                </Button>
                {/* <Button
                    _className={
                        "flex items-center ml-2 py-1 px-2 rounded-full cursor-pointer hover:bg-hover"
                    }
                >
                    <span className=" font-semibold text-base">Cộng đồng</span>
                </Button> */}
            </div>
        </div>
    );
}

export default MessTool;
