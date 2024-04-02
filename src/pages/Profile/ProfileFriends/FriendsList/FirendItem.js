import { useContext } from "react";
import { Link } from "react-router-dom";
import { ScreenSize } from "../../../../App";
import { formatAvatar, formatNumberK } from "../../../../Hooks/useFormat";
function FirendItem({ data = {} }) {
    const context = useContext(ScreenSize);
    return (
        <div className=" flex items-center rounded-md shadow-sm border p-4">
            <div className="relative group">
                <Link to={`/profile/${data.id}`}>
                    <img
                        className=" w-20 h-20 object-cover object-center rounded-lg hover:opacity-80"
                        src={formatAvatar(data.userAvt, data.userSx)}
                        alt=""
                    />
                </Link>
            </div>
            <div className="flex flex-col ml-4">
                <Link to={`/profile/${data.id}`}>
                    <span className=" font-semibold hover:underline">
                        {data.userName}
                    </span>
                </Link>
                {data.countFriends > 0 && (
                    <span className=" text-[13px] text-gray-500">{`${formatNumberK(
                        data.countFriends
                    )} người bạn`}</span>
                )}
                {data.address && (
                    <span className=" text-[13px] text-gray-500">{`Sống tại ${data.address}`}</span>
                )}
            </div>
        </div>
    );
}

export default FirendItem;
