import { useState } from "react";
import { createContext } from "react";
import Modal from "../Modal";
import MainCard from "../MainCard";
import Button from "../Button";
import PostTime from "./PostsTime";
import PostsContent from "./PostsContent";
import PostsTools from "./PostsTools";
import PostsReact from "./PostReact";
import PostInput from "./PostsInput";
import iconLike from "../../assets/images/gifIcon/icon-like.gif";
import iconLove from "../../assets/images/gifIcon/icon-love.gif";
import iconHaha from "../../assets/images/gifIcon/icon-haha.gif";
import iconWow from "../../assets/images/gifIcon/icon-wow.gif";
import iconSad from "../../assets/images/gifIcon/icon-sad.gif";
import iconAngry from "../../assets/images/gifIcon/icon-angry.gif";

import like from "../../assets/images/imgIcon/icon-like.png";
import like1 from "../../assets/images/imgIcon/like.png";
import love from "../../assets/images/imgIcon/love.png";
import haha from "../../assets/images/imgIcon/haha.png";
import wow from "../../assets/images/imgIcon/wow.png";
import sad from "../../assets/images/imgIcon/sad.png";
import angry from "../../assets/images/imgIcon/angry.png";

import { MdOutlineClose } from "react-icons/md";
export const ValueContext = createContext();
function Posts({
    userId,
    avatar,
    name,
    time,
    group = false,
    groupId = "",
    groupName = "",
    adGroup = false,
    groupMember = false,
    iconClose = false,
    pagePhoto = false,
    pageProfile = false,
}) {
    // const iconList = [
    //     { name: "Thích", icon: iconLike, img: like, img1: like1 },
    //     { name: "Yêu thích", icon: iconLove, img: love },
    //     { name: "Haha", icon: iconHaha, img: haha },
    //     { name: "Wow", icon: iconWow, img: wow },
    //     { name: "Buồn", icon: iconSad, img: sad },
    //     { name: "Phẫn nộ", icon: iconAngry, img: angry },
    // ];
    const [isFocus, setIsFocus] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [textColor, setTextColor] = useState("");
    const [reactIcon, setReactIcon] = useState("");
    let Comp = MainCard;
    if (pagePhoto) {
        Comp = "div";
    }
    const valueContext = {
        userId,
        avatar,
        name,
        time,
        group,
        groupId,
        groupName,
        adGroup,
        groupMember,
        iconClose,
        pagePhoto,
        pageProfile,
        showModal,
        setShowModal,
        // iconList,
        reactIcon,
        setReactIcon,
        textColor,
        setTextColor,
    };
    return (
        <ValueContext.Provider value={valueContext}>
            {pagePhoto ? (
                <div className="w-full h-screen ">
                    <div className="px-2 pt-2">
                        <PostTime />
                    </div>
                    <PostsContent />
                    <div className="px-2 ">
                        <PostsTools setIsFocus={setIsFocus} />
                    </div>
                    <div className="px-2 pt-2">
                        <PostsReact />
                    </div>
                    <div className="px-2 py-2">
                        <PostInput
                            avatar={avatar}
                            isFocus={isFocus}
                            setIsFocus={setIsFocus}
                        />
                    </div>
                </div>
            ) : (
                <MainCard>
                    <div className="px-2 pt-2">
                        <PostTime />
                    </div>
                    <PostsContent />
                    <div className="px-2 ">
                        <PostsTools setIsFocus={setIsFocus} />
                    </div>

                    {pageProfile && (
                        <>
                            <div className="px-2 pt-2">
                                <PostsReact />
                            </div>
                            <div className="px-2 py-2">
                                <PostInput
                                    avatar={avatar}
                                    isFocus={isFocus}
                                    setIsFocus={setIsFocus}
                                />
                            </div>
                        </>
                    )}
                </MainCard>
            )}
            {showModal && !pageProfile && (
                <Modal closeModal={() => setShowModal(false)}>
                    <div
                        className=" w-[370px] sm:w-[500px] md:w-[700px] m-auto rounded-lg bg-white  shadow-lg shadow-gray-300 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col w-full h-[680px] max-h-[80vh] md:max-h-[95vh]">
                            <div
                                style={{ boxShadow: "0 .5px 0 #ccc" }}
                                className=" relative flex items-center justify-center w-full h-[60px] border-b "
                            >
                                <span className=" font-bold text-[20px]">{`Bài viết của ${name}`}</span>
                                <div className=" absolute top-0 right-2 flex items-center h-full">
                                    <Button
                                        _className={
                                            "flex items-center justify-center h-9 w-9 bg-gray-200 rounded-full hover:bg-gray-300"
                                        }
                                        onClick={() => setShowModal(false)}
                                    >
                                        <MdOutlineClose className="text-[20px]" />
                                    </Button>
                                </div>
                            </div>
                            <div
                                className="w-full flex flex-col flex-1 
                            scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full"
                            >
                                <div className="px-2 pt-2">
                                    <PostTime />
                                </div>
                                <PostsContent />
                                <div className="px-2 ">
                                    <PostsTools setIsFocus={setIsFocus} />
                                </div>
                                <div className="px-2 pt-2">
                                    <PostsReact />
                                </div>
                            </div>
                            <div className=" w-full px-2 py-2 border-t">
                                <PostInput
                                    avatar={avatar}
                                    isFocus={isFocus}
                                    setIsFocus={setIsFocus}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </ValueContext.Provider>
    );
}

export default Posts;
