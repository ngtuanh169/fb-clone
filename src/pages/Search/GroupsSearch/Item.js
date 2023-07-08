import { useContext } from "react";
import { Link } from "react-router-dom";
import { formatNumberK, formatFullDate } from "../../../Hooks/useFormat";
import { ScreenSize } from "../../../App";
import MainCard from "../../../Components/MainCard";
import Button from "../../../Components/Button";
import { BsDot } from "react-icons/bs";
function Item({ id, name, img, status, member, joined = false, timeJoin }) {
    const context = useContext(ScreenSize);
    return (
        <div className="w-full md:w-[680px]">
            <MainCard>
                <div className="flex w-full p-4">
                    <div className="w-[60px] h-[60px] rounded-lg border overflow-hidden">
                        <Link className="" to={`/group/${id}`}>
                            <img
                                className="w-full h-full object-cover "
                                src={img}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between flex-1 ml-4">
                        <div className="flex flex-col justify-between">
                            <div className="">
                                <Link
                                    to={`/group/${id}`}
                                    className=" hover:underline"
                                >
                                    <span className=" font-semibold text-[17px]">
                                        {name}
                                    </span>
                                </Link>
                            </div>
                            <div className="flex flex-col sm:flex-row py-1 text-gray-500">
                                <span>
                                    {+status === 0 ? "Công khai" : "Riêng tư"}
                                </span>
                                {context.width >= 768 && (
                                    <span className=" flex h-full items-center">
                                        <BsDot />
                                    </span>
                                )}
                                <div className="flex ">
                                    {member > 0 && (
                                        <>
                                            <span className="whitespace-nowrap">{`${formatNumberK(
                                                +member
                                            )} thành viên`}</span>
                                            <span className="flex h-full items-center">
                                                <BsDot />
                                            </span>
                                        </>
                                    )}
                                    {timeJoin > 0 && (
                                        <>
                                            <span className=" line-clamp-1">{` Là thành viên từ ${formatFullDate(
                                                timeJoin
                                            )}`}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center w-full sm:w-auto h-full">
                            {joined ? (
                                <Button
                                    _className={
                                        "w-full sm:w-auto p-2 bg-gray-200 text-center rounded-lg hover:bg-gray-300"
                                    }
                                    to={`/group/${id}`}
                                >
                                    <span className=" font-medium ">
                                        Truy cập
                                    </span>
                                </Button>
                            ) : (
                                <Button
                                    _className={
                                        "w-full sm:w-auto p-2 bg-blue-100 text-center rounded-lg hover:bg-blue-200"
                                    }
                                >
                                    <span className=" font-medium text-blue-500">
                                        Tham gia
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
