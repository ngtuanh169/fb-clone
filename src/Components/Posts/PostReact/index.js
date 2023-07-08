import { useState, useRef } from "react";
import { useClickOutSide } from "../../../Hooks/useClickOutSide";
import Button from "../../Button";
import Comment from "./Comment";
import { AiFillCaretDown } from "react-icons/ai";
function PostsReact() {
    const options = [
        { id: 1, name: "Mới nhất" },
        { id: 2, name: "Nổi bật nhất" },
    ];
    const divRef = useRef();
    const [option, setOption] = useState(options[0]);
    const [showOptions, setShowOptions] = useState(false);
    const [commentList, setCommentList] = useState(5);
    const [maxtList, setMaxtList] = useState(10);

    useClickOutSide(divRef, () => setShowOptions(false));
    return (
        <div className="w-full">
            {commentList > 0 && (
                <div className="W-full px-2">
                    <div className=" w-full flex justify-end ">
                        <div ref={divRef} className="relative w-max">
                            <Button
                                onClick={() => setShowOptions(!showOptions)}
                            >
                                <span className="flex items-center font-medium text-[15px] text-gray-600">
                                    {option.name}
                                    <AiFillCaretDown className="ml-1" />
                                </span>
                            </Button>
                            {showOptions && (
                                <div
                                    style={{
                                        boxShadow: "0px 1px 2px #ccc",
                                    }}
                                    className=" absolute top-[105%] right-0 w-max min-w-[150px] p-2 bg-white rounded-lg z-20"
                                >
                                    <div className="flex flex-col w-full">
                                        {options.length > 0 &&
                                            options.map((item) => (
                                                <Button
                                                    key={item.id}
                                                    _className={`w-full p-2 rounded-md hover:bg-gray-300 ${
                                                        item.id === option.id
                                                            ? "bg-gray-200"
                                                            : ""
                                                    }`}
                                                    onClick={() => {
                                                        setOption(item);
                                                        setShowOptions(false);
                                                    }}
                                                >
                                                    <span className="flex">
                                                        {item.name}
                                                    </span>
                                                </Button>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {Array(commentList)
                .fill(0)
                .map((item, index) => (
                    <Comment key={index} />
                ))}

            {commentList < maxtList && (
                <div className="w-full p-2">
                    <Button onClick={() => setCommentList(commentList + 3)}>
                        <span className="font-medium text-[15px] text-gray-600 hover:underline">
                            {` Xem ${maxtList - commentList} bình luận trước`}
                        </span>
                    </Button>
                </div>
            )}
        </div>
    );
}

export default PostsReact;
