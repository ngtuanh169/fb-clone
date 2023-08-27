import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { formatTimeMess, formatAvatar } from "../../../Hooks/useFormat";
import { ContextValue } from "./index";
import ElementFixed from "../../ElementFixed";
function TextMessItem({ data = {}, item = {}, index }) {
    const user = useSelector((state) => state.user);
    const context = useContext(ContextValue);
    return (
        <div
            style={{
                justifyContent: item.senderId !== user.userId ? "" : "end",
            }}
            className="flex w-full"
        >
            <div className="flex flex-col w-full">
                <div
                    style={{
                        justifyContent:
                            item.senderId !== user.userId ? "" : "end",
                    }}
                    className="flex w-full"
                >
                    <div className="  flex items-end  ">
                        {item.senderId !== user.userId && (
                            <div className="h-7 w-7 mr-2 z-20">
                                <img
                                    className="h-full w-full object-cover rounded-full"
                                    src={formatAvatar(
                                        data.othersAvt,
                                        data.othersSx
                                    )}
                                    alt=""
                                />
                            </div>
                        )}
                        <div className="flex group hover:z-30">
                            <div
                                style={{ opacity: item.sending ? ".3" : "1" }}
                                className={`flex items-center justify-center w-max min-w-[38px] p-2 rounded-2xl  ${
                                    item.senderId !== user.userId
                                        ? "bg-gray-200"
                                        : " bg-blue-500 text-white"
                                }`}
                            >
                                <span className="block max-w-[190px] text-[15px] break-words">
                                    {item.message.text}
                                </span>
                            </div>
                            {!item?.sending && (
                                <ElementFixed
                                    scrollValue={context}
                                    id={item.id}
                                >
                                    <span
                                        style={{
                                            boxShadow: "0 3px 2px #5a5959",
                                        }}
                                        className="flex w-max px-2 py-1 text-[13px] text-white rounded-md bg-matteBlack 
                                        opacity-0 invisible transition-all delay-100 group-hover:visible group-hover:opacity-100 "
                                    >
                                        {formatTimeMess(item.createdAt)}
                                    </span>
                                </ElementFixed>
                            )}
                        </div>
                    </div>
                </div>
                {item?.sending && (
                    <div className=" flex justify-end">
                        <span className="text-[12px] text-gray-500 font-normal">
                            Đang gửi
                        </span>
                    </div>
                )}
                {item?.id && item?.timeId && index === 0 && (
                    <div className=" flex justify-end">
                        <span className="text-[12px] text-gray-500 font-normal">
                            Đã gửi
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TextMessItem;
