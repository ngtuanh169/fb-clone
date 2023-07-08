import { useState, useContext } from "react";
import { FriendsContext } from "../FriendsProvider";
import Button from "../../../Button";
function ModalAddFriends({ text, closeModal = () => {} }) {
    const context = useContext(FriendsContext);
    return (
        <div
            style={{ boxShadow: "rgb(142, 141, 141) 0px 1px 10px" }}
            className=" w-full h-[250px] p-2 bg-white rounded-md "
        >
            <div className="a flex flex-col w-full h-full scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full">
                {!text && (
                    <div className="w-full">
                        <span className=" font-medium p-1">Gợi ý</span>
                    </div>
                )}
                {context.friensList.length > 0 &&
                    context.friensList.map((item) => (
                        <div key={item.id} className="w-full">
                            <Button
                                _className={
                                    "flex w-full p-1 rounded-md hover:bg-hover"
                                }
                                onClick={() => {
                                    context.handleAddFriend(item.id);
                                    closeModal();
                                }}
                            >
                                <span>
                                    <img
                                        className="h-10 w-10 rounded-full border"
                                        src={item.avt}
                                        alt=""
                                    />
                                </span>
                                <span className="flex flex-col ml-2 text-left leading-[1]">
                                    <span className=" font-medium">
                                        {item.name}
                                    </span>
                                    <span className=" mt-1 text-[13px] text-gray-500 ">
                                        Sống tại {item.address}
                                    </span>
                                </span>
                            </Button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ModalAddFriends;
