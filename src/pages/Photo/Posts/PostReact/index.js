import { useState } from "react";
import Button from "../../../../Components/Button";
import PostReactTop from "./PostReactTop";
import Comment from "./Comment";
import PostInput from "./PostInput";
import { AiFillCaretDown } from "react-icons/ai";
function PostsReact({ userId, avatar, to, name, time }) {
    const [isFocus, setIsFocus] = useState(false);
    return (
        <>
            <PostReactTop setIsFocus={setIsFocus} />
            <div className="W-full p-2">
                <div className=" w-full flex justify-end ">
                    <Button>
                        <span className="flex items-center font-medium text-[15px] text-gray-600">
                            Mới nhất <AiFillCaretDown className="ml-1" />
                        </span>
                    </Button>
                </div>
            </div>
            <Comment avatar={avatar} name={name} />
            <Comment avatar={avatar} name={name} />
            <Comment avatar={avatar} name={name} />
            <Comment avatar={avatar} name={name} />
            <div className="w-full p-2">
                <Button>
                    <span className="font-medium text-[15px] text-gray-600 hover:underline">
                        Xem 9 bình luận trước
                    </span>
                </Button>
            </div>
            <PostInput
                avatar={avatar}
                isFocus={isFocus}
                setIsFocus={setIsFocus}
            />
        </>
    );
}

export default PostsReact;
