import { useState, useRef } from "react";
import { useClickOutSide } from "../../../../../../Hooks/useClickOutSide";
import MainCard from "../../../../../../Components/MainCard";
import Button from "../../../../../../Components/Button";
import PostsList from "./PostsList";
import { FaChevronDown } from "react-icons/fa";
function PinnedPosts() {
    const divRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [showPinnedPosts, setShowPinnedPosts] = useState(false);
    useClickOutSide(divRef, () => setShowModal(false));
    return (
        <div className="w-full">
            <MainCard>
                <div className="flex justify-between items-center w-full px-3 pt-3 pb-1">
                    <div className="  flex items-center">
                        <span className=" font-medium mr-1">Bài viết ghim</span>
                        <div ref={divRef} className="relative">
                            <Button
                                _className={"p-2 rounded-full hover:bg-hover"}
                                onClick={() => setShowModal(!showModal)}
                            >
                                <span
                                    className="flex justify-center items-center w-5 h-5 
                                text-[13px] text-gray-500 font-medium border-[2px] border-gray-500 rounded-full"
                                >
                                    i
                                </span>
                            </Button>
                            {showModal && (
                                <div className=" absolute top-[100%] left-0 w-[360px] px-4 py-5 rounded-md bg-white drop-shadow-shadow012 z-30">
                                    <div className="w-full">
                                        <span className=" font-medium">
                                            Giới thiệu về phần Bài viết ghim
                                        </span>
                                    </div>
                                    <div className="w-full">
                                        <span className="text-[14px] leading-[1]">
                                            Quản trị viên của bạn đã ghim những
                                            mục này để nhóm nhìn thấy.
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="">
                        <Button
                            _className={"p-2 rounded-full hover:bg-hover"}
                            onClick={() => setShowPinnedPosts(!showPinnedPosts)}
                        >
                            <span>
                                <FaChevronDown
                                    style={{
                                        transform: showPinnedPosts
                                            ? "rotate(180deg)"
                                            : "",
                                    }}
                                />
                            </span>
                        </Button>
                    </div>
                </div>
                <div className="flex w-full pb-2">
                    {showPinnedPosts && <PostsList />}
                </div>
            </MainCard>
        </div>
    );
}

export default PinnedPosts;
