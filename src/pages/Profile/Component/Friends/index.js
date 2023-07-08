import { Link } from "react-router-dom";
import MainCard from "../../../../Components/MainCard";
import FriendItem from "./FriendItem";
function Friends() {
    return (
        <MainCard>
            <div className="p-3">
                <div className="flex justify-between">
                    <h2 className="text-[20px] font-bold">Bạn bè</h2>
                    <Link
                        to={"/profile/1/friends"}
                        className={
                            "py-1 px-2 text-blue-700 rounded-md hover:bg-hover"
                        }
                    >
                        <span>Xem tất bạn bè</span>
                    </Link>
                </div>
                <div className="w-full">
                    <span className="text-gray-500">1.127 người bạn</span>
                </div>
                <div className=" grid grid-cols-3 gap-1 mt-4 ">
                    {Array(9)
                        .fill(0)
                        .map((item, index) => (
                            <div className="flex flex-col" key={index}>
                                <FriendItem />
                                <div className="w-full p-2"></div>
                            </div>
                        ))}
                </div>
            </div>
        </MainCard>
    );
}

export default Friends;
