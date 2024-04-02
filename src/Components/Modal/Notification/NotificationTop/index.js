import Button from "../../../Button";
function NotificationTop({ navList, currentNav, setCurrentNav = () => {} }) {
    return (
        <div className="w-full mb-2">
            <div className="flex justify-between items-center w-full">
                <h2 className=" font-bold text-[20px]">Thông báo</h2>
            </div>
            <div className="flex w-full mt-2">
                {navList.map((item) => (
                    <Button
                        key={item.id}
                        _className={`flex items-center py-1 px-2 rounded-full ${
                            currentNav.id === item.id
                                ? "bg-blue-100 text-blue-500 "
                                : "hover:bg-hover"
                        } mr-2`}
                        onClick={() => setCurrentNav(item)}
                    >
                        <span className=" font-semibold text-base ">
                            {item.name}
                        </span>
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default NotificationTop;
