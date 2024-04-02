import { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { PostsContext } from "../PostsProvider";
import { useParams } from "react-router-dom";
import TagFriends from "../TagFriends";
import { GiWorld } from "react-icons/gi";
import { AiOutlineCaretDown } from "react-icons/ai";
import { HiLockClosed } from "react-icons/hi";
import avatar from "../../../../assets/images/avatar/avatar.jpg";
import Button from "../../../Button";
import { formatAvatar } from "../../../../Hooks/useFormat";
import Loading from "../../../Loading";
function Status({ setCurrentComp = () => {}, loading = false }) {
    const { groupId } = useParams();
    const user = useSelector((state) => state.user);
    const { setFriendsList, taggedFriends, setStatus } =
        useContext(PostsContext);
    const options = [
        {
            id: 0,
            text: "Công khai",
            icon: <GiWorld />,
        },
        {
            id: 1,
            text: "Riêng tư",
            icon: <HiLockClosed />,
        },
    ];
    const [idOption, setIdOption] = useState(options[0].id);

    const [showOption, setShowOpton] = useState(false);
    const changeShowOption = () => setShowOpton(!showOption);
    useEffect(() => {
        setStatus(idOption);
    }, [idOption]);
    return (
        <div className="flex">
            <div>
                <img
                    className="w-[50px] h-[50px] rounded-full"
                    src={formatAvatar(user.avatar, user.sx)}
                    alt=""
                />
            </div>
            <div className="flex-1 ml-[10px]">
                <div className="flex">
                    <h3 className="font-medium">{`${user.fName} ${user.lName}`}</h3>
                    {taggedFriends.length > 0 && (
                        <>
                            <span className="ml-1">cùng với </span>
                            <span
                                className="ml-1 font-medium cursor-pointer hover:underline"
                                onClick={() => {
                                    setFriendsList([]);
                                    setCurrentComp({ Comp: TagFriends });
                                }}
                            >{` ${taggedFriends.length} người khác`}</span>
                        </>
                    )}
                </div>
                <Button
                    _className=" relative flex justify-between items-center w-max mt-[2px] px-2 py-[3px] bg-slate-200 rounded-md"
                    onClick={!groupId && !loading && changeShowOption}
                    cursorDefault={groupId || loading}
                >
                    <span className="text-[13px] font-semibold ">
                        {groupId ? options[0].icon : options[idOption].icon}
                    </span>

                    <span className="text-[13px] font-semibold mx-1">
                        {groupId ? options[0].text : options[idOption].text}
                    </span>

                    {!groupId && (
                        <span className="text-[11px] font-semibold mt-1">
                            <AiOutlineCaretDown />
                        </span>
                    )}

                    {showOption && (
                        <div className=" absolute flex flex-col top-[100%] left-0 w-full bg-white rounded-md border">
                            {options.map((item) => {
                                return (
                                    <span
                                        key={item.id}
                                        className={`text-[13px] font-semibold text-center border-b ${
                                            item.id === idOption
                                                ? "bg-slate-100"
                                                : ""
                                        } hover:bg-slate-200`}
                                        onClick={() => setIdOption(item.id)}
                                    >
                                        {item.text}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </Button>
            </div>
        </div>
    );
}

export default Status;
