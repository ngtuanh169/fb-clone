import Button from "../Button";
function ToolItem({ children, text, onClick = () => {}, cursor = "" }) {
    return (
        <Button
            _className="flex h-10 w-full justify-center items-center py-1 rounded-md hover:bg-hover"
            onClick={onClick}
            cursor={cursor}
        >
            <span className="text-3xl mr-2 text-blue-500">{children}</span>
            <span className=" text-gray-600 font-semibold">{text}</span>
        </Button>
    );
}

export default ToolItem;
