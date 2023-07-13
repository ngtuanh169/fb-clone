import Loading from "../Loading";
function CheckLogin() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-[#f0f2f5]">
            <div className="w-[100px] h-[100px]">
                <Loading number={10} />
            </div>
            <span className=" font-semibold text-gray-500">
                Chờ kiểm tra phiên đăng nhập
            </span>
        </div>
    );
}

export default CheckLogin;
