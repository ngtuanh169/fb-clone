import { formatAvatar, formatTime } from "../../../Hooks/useFormat";
import { Link } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { GiWorld } from "react-icons/gi";
import { HiLockClosed, HiUserGroup } from "react-icons/hi";
function ReelsTop({ data = {}, group = false }) {
    return (
        <div className="flex gap-2 w-full">
            <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-500">
                <Link
                    to={"/"}
                    className=" w-full h-full object-cover object-center"
                >
                    <img src={formatAvatar(data.userAvt, data.userSx)} alt="" />
                </Link>
            </div>
            <div className="flex flex-col gap-1 justify-center h-full leading-[1]">
                <div className="">
                    <Link
                        to={"/"}
                        className="text-[15px] font-semibold text-white hover:underline"
                    >
                        <span className="">{data.userName}</span>
                    </Link>
                </div>
                <div className="flex items-center text-[13px] font-normal text-white">
                    <span>Reels</span>
                    <BsDot className="text-[11px] " />
                    <span>{formatTime(data.createdAt)}</span>
                    <BsDot className="text-[11px] " />
                    {group ? (
                        <HiUserGroup />
                    ) : (
                        <>
                            {data.status === "0" ? (
                                <GiWorld />
                            ) : (
                                <HiLockClosed />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReelsTop;
