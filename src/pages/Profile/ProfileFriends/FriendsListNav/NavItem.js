import Button from "../../../../Components/Button";
function NavItem({ id, name, isActive, setIsActive }) {
    return (
        <div className="">
            <Button
                _className={`p-4 rounded-md ${
                    id === isActive ? "" : "hover:bg-hover"
                }`}
                onClick={() => setIsActive(id)}
            >
                <span
                    className={`  font-semibold ${
                        id === isActive ? "text-blue-500" : "text-gray-500"
                    }`}
                >
                    {name}
                </span>
            </Button>
            <b
                className={`flex w-full h-[2px] ${
                    id === isActive ? "bg-blue-500" : " bg-transparent"
                }`}
            ></b>
        </div>
    );
}

export default NavItem;
