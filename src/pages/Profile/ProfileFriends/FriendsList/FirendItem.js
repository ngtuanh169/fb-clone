import { Link } from "react-router-dom";
import HoverInfoUser from "../../../../Components/Modal/HoverInfoUser";
function FirendItem({ id, avt, name, des }) {
    return (
        <div className=" flex items-center rounded-md shadow-sm border p-4">
            <div className="relative group">
                <Link to={"/profile/friends"}>
                    <img
                        className=" w-20 h-20 rounded-lg hover:opacity-80"
                        src={avt}
                        alt=""
                    />
                </Link>
                <div className=" absolute bottom-[80%] invisible z-[99] opacity-0 transition-all delay-150 ease-linear group-hover:visible group-hover:opacity-100">
                    <HoverInfoUser
                        avt={avt}
                        name={name}
                        address={des}
                        numberFriends={2123}
                        followers={12312}
                    />
                </div>
            </div>
            <div className="flex flex-col ml-4">
                <Link to={"/profile/friends"}>
                    <span className=" font-semibold hover:underline">
                        {name}
                    </span>
                </Link>
                <span className=" text-[13px] text-gray-500">{des}</span>
            </div>
        </div>
    );
}

export default FirendItem;
