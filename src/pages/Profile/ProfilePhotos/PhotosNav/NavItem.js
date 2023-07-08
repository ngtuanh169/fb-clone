import Button from "../../../../Components/Button";
function NavItem({ id, name, currentNav, setCurrentNav }) {
    return (
        <div className="">
            <Button
                _className={`p-4 rounded-md ${
                    id === currentNav ? "" : "hover:bg-hover"
                }`}
            >
                <span
                    className={`  font-semibold ${
                        id === currentNav ? "text-blue-500" : "text-gray-500"
                    }`}
                >
                    {name}
                </span>
            </Button>
            <b
                className={`flex w-full h-[2px] ${
                    id === currentNav ? "bg-blue-500" : " bg-transparent"
                }`}
            ></b>
        </div>
    );
}

export default NavItem;
