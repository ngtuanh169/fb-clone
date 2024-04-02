import Button from "../../../../Components/Button";
function NavItem({
    item,
    currentNav,
    setCurrentNav = () => {},
    setCallApi = () => {},
}) {
    return (
        <div className="">
            <Button
                _className={`p-4 rounded-md ${
                    item.id === currentNav.id ? "" : "hover:bg-hover"
                }`}
                onClick={() => {
                    setCurrentNav(item);
                    setCallApi(true);
                }}
            >
                <span
                    className={`  font-semibold ${
                        item.id === currentNav.id
                            ? "text-blue-500"
                            : "text-gray-500"
                    }`}
                >
                    {item.name}
                </span>
            </Button>
            <b
                className={`flex w-full h-[2px] ${
                    item.id === currentNav.id
                        ? "bg-blue-500"
                        : " bg-transparent"
                }`}
            ></b>
        </div>
    );
}

export default NavItem;
