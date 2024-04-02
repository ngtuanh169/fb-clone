import { formatAvatar, formatTimestamp } from "../../../../Hooks/useFormat";
import Button from "../../../Button";
import { HiUserGroup } from "react-icons/hi";
function RequestJoinGroup({ data, closeModal = () => {}, newNoti }) {
    return (
        <Button
            to={`/group/${data.groupId}/member-requests`}
            _className="flex p-2 pr-5 rounded-md hover:bg-hover"
            onClick={closeModal}
        >
            <div className="">
                <div className=" relative">
                    <img
                        className="w-14 h-14 rounded-full border border-gray-500"
                        src={formatAvatar(data.senderAvt, data.senderSx)}
                        alt=""
                    />
                    <span
                        className=" absolute bottom-[-5px] right-[-5px] flex h-7 w-7 items-center justify-center rounded-full 
                             bg-gradient-to-b from-blue-300 to-blue-700"
                    >
                        <HiUserGroup className=" text-white text-[15px]" />
                    </span>
                </div>
            </div>
            <div className="flex-1 ml-3 leading-[1.333]">
                <span className=" text-[15px] text-gray-600 line-clamp-3">
                    <strong className=" font-semibold mr-1">
                        {data.senderName}
                    </strong>
                    {data.content}
                    <strong className=" ml-1 font-semibold">
                        {data.groupName}
                    </strong>
                </span>
                <span className="text-[13px] text-blue-500 font-medium">
                    {formatTimestamp(data.time)}
                </span>
            </div>
        </Button>
    );
}

export default RequestJoinGroup;
