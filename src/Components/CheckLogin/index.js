import Loading from "../Loading";
import { BsFacebook } from "react-icons/bs";
function CheckLogin() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-[#f0f2f5]">
            <div className="w-[100px] h-[100px]">
                <Loading number={10} />
            </div>
            {/* <div className="">
                <BsFacebook className="text-[100px] text-blue-600" />
            </div> */}
            <span className=" font-semibold text-gray-500">
                Chờ kiểm tra phiên đăng nhập
            </span>
        </div>
    );
}

export default CheckLogin;
