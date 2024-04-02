import Button from "../../../Components/Button";
function ToolItem({ data, currentNav, setCurrentNav }) {
    return (
        <div className="">
            <Button
                _className={`p-3 rounded-md ${
                    data.id === currentNav.id ? "" : "hover:bg-hover"
                }`}
                onClick={() => setCurrentNav(data)}
            >
                <span
                    className={`  font-semibold ${
                        data.id === currentNav.id
                            ? "text-blue-500"
                            : "text-gray-500"
                    }`}
                >
                    {data.name}
                </span>
            </Button>
            <b
                className={`flex w-full h-[2px] ${
                    data.id === currentNav.id
                        ? "bg-blue-500"
                        : " bg-transparent"
                }`}
            ></b>
        </div>
    );
}

export default ToolItem;
