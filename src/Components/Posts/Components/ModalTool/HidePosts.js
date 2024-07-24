import { useContext } from "react";
import { ValueContext } from "../..";
import Button from "../../../Button";
import { BiHide } from "react-icons/bi";
function HidePosts() {
    const { setHidePosts } = useContext(ValueContext);
    return (
        <div className="w-full">
            <Button
                _className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-200"
                onClick={() => setHidePosts(true)}
            >
                <BiHide className="text-[20px]" />
                <span className=" font-medium">Ẩn bài viết</span>
            </Button>
        </div>
    );
}

export default HidePosts;
