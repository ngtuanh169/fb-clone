import { useState, useContext } from "react";
import { formatTimeMess } from "../../../Hooks/useFormat";
import { ContextValue } from "./index";
import ElementFixed from "../../ElementFixed";
function TextMessItem({ data }) {
    const context = useContext(ContextValue);
    return (
        <div
            style={{ justifyContent: data.userId !== 1 ? "" : "end" }}
            className="flex w-full"
        >
            <div className="flex flex-col w-full">
                <div
                    style={{ justifyContent: data.userId !== 1 ? "" : "end" }}
                    className="flex  w-full"
                >
                    <div className="  flex items-end max-w-[70%]">
                        {data.userId !== 1 && (
                            <div className="h-7 w-7 mr-2">
                                <img
                                    className="h-full w-full object-cover rounded-full"
                                    src={data.avt}
                                    alt=""
                                />
                            </div>
                        )}
                        <div className="flex flex-1 group ">
                            <div
                                style={{ opacity: data.sending ? ".3" : "1" }}
                                className={`w-full p-2 rounded-2xl  ${
                                    data.userId !== 1
                                        ? "bg-gray-200"
                                        : " bg-blue-500 text-white"
                                }`}
                            >
                                <span className=" text-[15px]">
                                    {data.text}
                                </span>
                            </div>
                            <ElementFixed scrollValue={context}>
                                <span
                                    style={{ boxShadow: "0 3px 2px #5a5959" }}
                                    className="flex w-max px-2 py-1 text-[13px] text-white rounded-md bg-matteBlack 
                                        opacity-0 invisible transition-all delay-100 group-hover:visible group-hover:opacity-100 "
                                >
                                    {formatTimeMess(data.time)}
                                </span>
                            </ElementFixed>
                        </div>
                    </div>
                </div>
                {data.sending && (
                    <div className=" flex justify-end">
                        <span className="text-[12px] text-gray-500 font-normal">
                            Đang gửi
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TextMessItem;
