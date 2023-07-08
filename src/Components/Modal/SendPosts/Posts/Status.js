import { useState, useContext } from "react";
import { PostsContext } from "../PostsProvider";
import TagFriends from "../TagFriends";
import { GiWorld } from "react-icons/gi";
import { AiOutlineCaretDown } from "react-icons/ai";
import { HiLockClosed } from "react-icons/hi";
import avatar from "../../../../assets/images/avatar/avatar.jpg";
function Status({ setCurrentComp = () => {} }) {
    const context = useContext(PostsContext);
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
    const [idOption, setIdOption] = useState(0);

    const [showOption, setShowOpton] = useState(false);
    const changeShowOption = () => setShowOpton(!showOption);
    return (
        <div className="flex">
            <div>
                <img
                    className="w-[50px] h-[50px] rounded-full"
                    src={avatar}
                    alt=""
                />
            </div>
            <div className="flex-1 ml-[10px]">
                <div className="flex">
                    <h3 className="font-medium">Nguyễn Tú Anh</h3>
                    {context.taggedFriends.length > 0 && (
                        <>
                            <span className="ml-1">cùng với </span>
                            <span
                                className="ml-1 font-medium cursor-pointer hover:underline"
                                onClick={() =>
                                    setCurrentComp({ Comp: TagFriends })
                                }
                            >{` ${context.taggedFriends.length} người khác`}</span>
                        </>
                    )}
                </div>
                <div
                    className=" relative flex justify-between items-center w-max mt-[2px] px-2 py-[3px] bg-slate-200 rounded-md cursor-pointer"
                    onClick={changeShowOption}
                >
                    <span className="text-[13px] font-semibold">
                        {options[idOption].icon}
                    </span>

                    <span className="text-[13px] font-semibold">
                        {options[idOption].text}
                    </span>
                    <span className="text-[13px] font-semibold">
                        <AiOutlineCaretDown />
                    </span>
                    {showOption && (
                        <div className=" absolute flex flex-col top-[100%] left-0 w-full bg-white rounded-md border">
                            {options.map((item, index) => {
                                return (
                                    <span
                                        key={index}
                                        className={`text-[13px] font-semibold text-center border-b ${
                                            index === idOption
                                                ? "bg-slate-100"
                                                : ""
                                        } hover:bg-slate-200`}
                                        onClick={() => setIdOption(index)}
                                    >
                                        {item.text}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Status;
