import { BsFacebook } from "react-icons/bs";
import Button from "../../Components/Button";
function NotFound() {
    return (
        <div className="flex items-center w-screen h-screen">
            <div className="flex flex-col justify-center items-center gap-2 w-[450px] h-max mx-auto text-center text-gray-500">
                <span className=" text-[45px] font-extrabold ">404</span>
                <span className=" text-[20px] font-bold ">
                    Trang này không hiển thị
                </span>
                <span className=" font-normal text-[17px] leading-[18px]">
                    Có thể liên kết đã hỏng hoặc trang đã bị gỡ. Hãy kiểm tra
                    xem liên kết mà bạn đang cố mở có chính xác không.
                </span>
                <Button
                    _className={`flex items-center justify-center w-[190px] h-[40px] my-1 rounded-md bg-blue-500 hover:bg-blue-600`}
                    to={"/"}
                >
                    <span className=" font-medium text-white">
                        Về trang chủ
                    </span>
                </Button>
            </div>
        </div>
    );
}

export default NotFound;
