import Button from "../../../Button";
function NotificationTop() {
    return (
        <div className="w-full mb-2">
            <div className="flex justify-between items-center w-full">
                <h2 className=" font-bold text-[20px]">Thông báo</h2>
            </div>
            <div className="flex w-full mt-2">
                <Button
                    _className={
                        "flex items-center py-1 px-2 rounded-full bg-blue-100"
                    }
                >
                    <span className=" text-blue-500 font-semibold text-base ">
                        Tất cả
                    </span>
                </Button>

                <Button
                    _className={
                        "flex items-center ml-2 py-1 px-2 rounded-full hover:bg-hover"
                    }
                >
                    <span className=" font-semibold text-base  ">Chưa đọc</span>
                </Button>
            </div>
        </div>
    );
}

export default NotificationTop;
