import avt from "../../../assets/images/avatar/avatar.jpg";
function InfoUser() {
    return (
        <div className="flex flex-col items-center w-full mt-5 mb-1">
            <div className="">
                <img
                    className=" h-[60px] w-[60px] rounded-full boder"
                    src={avt}
                    alt=""
                />
            </div>
            <div className="">
                <span className=" font-medium">Nguyen Tu Anh</span>
            </div>
            <div className="">
                <span className="text-[13px]">Facebook</span>
            </div>
            <div className="">
                <span className="text-[13px]">
                    Các bạn là bạn bè trên Facebook
                </span>
            </div>
            <div className="">
                <span className="text-[13px]">Sống tại Hà Nội</span>
            </div>
        </div>
    );
}

export default InfoUser;
