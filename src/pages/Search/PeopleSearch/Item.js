import { useContext } from "react";
import { Link } from "react-router-dom";
import { formatNumberK } from "../../../Hooks/useFormat";
import { ScreenSize } from "../../../App";
import MainCard from "../../../Components/MainCard";
import Button from "../../../Components/Button";
import HoverInfoUser from "../../../Components/Modal/HoverInfoUser";
import { BsDot } from "react-icons/bs";
function Item({
    id,
    name,
    avt,
    friends,
    followers,
    address,
    isFriend = false,
}) {
    const context = useContext(ScreenSize);
    return (
        <div className="w-full md:w-[680px]">
            <MainCard>
                <div className="flex w-full p-4">
                    <div className="w-[60px] h-[60px] rounded-full border overflow-hidden">
                        <Link className="" to={"/profile"}>
                            <img
                                className="w-full h-full object-cover "
                                src={avt}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between flex-1 ml-4">
                        <div className="flex flex-col justify-between">
                            <div className="">
                                <Link
                                    to={"/profile"}
                                    className=" hover:underline"
                                >
                                    <span className=" font-semibold text-[17px]">
                                        {name}
                                    </span>
                                </Link>
                            </div>
                            <div className="flex flex-col sm:flex-row py-1 text-gray-500">
                                {isFriend && (
                                    <>
                                        <span>Bạn bè</span>
                                        {context.width >= 640 && (
                                            <span className=" flex h-full items-center">
                                                <BsDot />
                                            </span>
                                        )}
                                    </>
                                )}
                                <div className="flex">
                                    {friends > 0 && (
                                        <>
                                            <span>{`${formatNumberK(
                                                +friends
                                            )} bạn bè`}</span>
                                            <span className=" flex h-full items-center">
                                                <BsDot />
                                            </span>
                                        </>
                                    )}
                                    {followers > 0 && (
                                        <>
                                            <span>{`${formatNumberK(
                                                +followers
                                            )} người theo dõi`}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="text-gray-500">
                                <span>{`Sống tại ${address}`}</span>
                            </div>
                        </div>
                        <div className="flex items-center w-full mt-2 sm:mt-0 sm:w-auto h-full">
                            <Button
                                _className={
                                    "w-full sm:w-auto p-2 bg-blue-100 rounded-lg hover:bg-blue-200"
                                }
                            >
                                <span className=" font-medium text-blue-500">
                                    {isFriend ? "Nhắn tin" : "Thêm bạn bè"}
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </MainCard>
        </div>
    );
}

export default Item;
