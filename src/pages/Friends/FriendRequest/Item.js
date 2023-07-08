import { Link } from "react-router-dom";
import { formatNumberK } from "../../../Hooks/useFormat";
import Button from "../../../Components/Button";
import avt from "../../../assets/images/avatar/avatar.jpg";
function Item({ data }) {
    return (
        <div className="flex flex-col w-full border rounded-md overflow-hidden">
            <Link to={"/"}>
                <img
                    className="w-full h-full object-cover object-center "
                    src={avt}
                    alt=""
                />
            </Link>
            <div className="flex flex-col p-2">
                <div className="">
                    <Link className=" font-medium hover:underline" to={"/"}>
                        Nguyen Tu Anh
                    </Link>
                </div>
                <div className="">
                    <span className="text-[13px] text-gray-500">
                        Sống tại Hà Nội
                    </span>
                </div>
                <div className="">
                    <span className="text-[13px] text-gray-500">
                        Có {formatNumberK(+3100)} người theo dõi
                    </span>
                </div>
                <Button
                    _className={
                        "flex justify-center items-center w-full h-9 mt-2 bg-blue-600 rounded-md hover:bg-blue-700"
                    }
                >
                    <span className="text-[15px] text-white font-medium">
                        Xác nhận
                    </span>
                </Button>
                <Button
                    _className={
                        "flex justify-center items-center w-full h-9 mt-2 bg-gray-300 rounded-md hover:bg-gray-400"
                    }
                >
                    <span className="text-[15px] font-medium">Xóa</span>
                </Button>
            </div>
        </div>
    );
}

export default Item;
