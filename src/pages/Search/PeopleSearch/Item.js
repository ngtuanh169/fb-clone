import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatAvatar, formatNumberK } from "../../../Hooks/useFormat";
import { addConversations } from "../../../redux/actions/conversationsList";
import conversationsApi from "../../../api/conversationsApi";
import MainCard from "../../../Components/MainCard";
import Button from "../../../Components/Button";
import { BsDot, BsMessenger } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
function Item({ data = {} }) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const _addConversations = async (userId, othersId) => {
        try {
            const params = new FormData();
            params.append("userId", userId);
            params.append("othersId", othersId);
            const res = await conversationsApi.add(params);
            res[0].status === "success" &&
                dispatch(addConversations(res[0].conversationsId, othersId));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-full md:w-[680px]">
            <MainCard>
                <div className="flex w-full p-4">
                    <div className="w-[60px] h-[60px] rounded-full border overflow-hidden">
                        <Link className="" to={`/profile/${data.id}`}>
                            <img
                                className="w-full h-full object-cover "
                                src={formatAvatar(data.avatar, data.sx)}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between flex-1 ml-4">
                        <div className="flex flex-col justify-between">
                            <div className="">
                                <Link
                                    to={`/profile/${data.id}`}
                                    className=" hover:underline"
                                >
                                    <span className=" font-semibold text-[17px]">
                                        {data.name}
                                    </span>
                                </Link>
                            </div>
                            <div className="flex flex-row flex-wrap py-1 text-gray-500 ">
                                {data.checkFriend && (
                                    <div className="flex items-center w-max">
                                        <span>Bạn bè</span>
                                        {(data.countFriends > 0 ||
                                            data.countFollowers > 0) && (
                                            <span className=" flex h-full items-center">
                                                <BsDot />
                                            </span>
                                        )}
                                    </div>
                                )}
                                {data.countFriends > 0 && (
                                    <div className="flex items-center w-max">
                                        <span>
                                            <span className=" font-medium mr-1">
                                                {formatNumberK(
                                                    +data.countFriends
                                                )}
                                            </span>
                                            bạn bè
                                        </span>
                                        {data.countFollowers > 0 && (
                                            <span className=" flex h-full items-center">
                                                <BsDot />
                                            </span>
                                        )}
                                    </div>
                                )}
                                {data.countFollowers > 0 && (
                                    <div className="flex w-max">
                                        <span>
                                            <span className=" font-medium mr-1">
                                                {formatNumberK(
                                                    +data.countFollowers
                                                )}
                                            </span>
                                            người theo dõi
                                        </span>
                                    </div>
                                )}
                            </div>
                            {data.address && (
                                <div className="flex items-center w-max text-gray-500">
                                    <span>{`Sống tại ${data.address}`}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center w-full mt-2 sm:mt-0 sm:w-auto h-full">
                            {data.checkFriend ? (
                                <Button
                                    _className={`flex items-center justify-center w-full p-2 bg-blue-500 text-white rounded-lg 
                                        hover:bg-blue-600`}
                                    onClick={() =>
                                        _addConversations(user.userId, data.id)
                                    }
                                >
                                    <BsMessenger />
                                    <span className="ml-1 font-medium">
                                        Nhắn tin
                                    </span>
                                </Button>
                            ) : (
                                <Button
                                    _className={`flex items-center justify-center w-full p-2 bg-gray-200 rounded-lg hover:bg-gray-300`}
                                    to={`/profile/${data.id}`}
                                >
                                    <FaRegUserCircle />
                                    <span className="ml-1 font-medium">
                                        Xem trang cá nhân
                                    </span>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </MainCard>
        </div>
    );
}

export default Item;
