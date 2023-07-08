import Button from "../Button";
import { IoMdClose } from "react-icons/io";
function TagFriend({ id, name, onClick = () => {} }) {
    return (
        <div className="flex p-1 mr-1 my-1 rounded-md text-blue-500 font-medium bg-blue-100">
            <span className=" pl-1">{name}</span>
            <Button
                _className={"p-1 ml-1 rounded-full hover:bg-gray-300"}
                onClick={() => onClick(id)}
            >
                <IoMdClose />
            </Button>
        </div>
    );
}

export default TagFriend;
