import { useDispatch, useSelector } from "react-redux";
import { addMess } from "../../../redux/actions/openMessList";
import { formatTimestamp, formatAvatar } from "../../../Hooks/useFormat";

function MessItem({ data = {}, closeModal = () => {} }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    return (
        <div
            className="w-full p-2 rounded-md cursor-pointer hover:bg-hover "
            onClick={(e) => {
                closeModal();
                dispatch(
                    addMess({
                        conversationsId: data.conversationsId,
                        userId: user.userId,
                        othersId: data.othersId,
                        othersAvt: data.conversationsIdavatar,
                        othersName: `${data.fName} ${data.lName}`,
                        othersSx: data.sx,
                    })
                );
            }}
        >
            <div className="flex h-full w-full ">
                <div className=" relative flex-none w-[50px] h-[50px]">
                    <img
                        className="h-full w-full rounded-full"
                        src={formatAvatar(data.avatar, data.sx)}
                        alt=""
                    />
                    {data.statusLogin === "1" && (
                        <span className=" absolute bottom-0 right-0 block w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                </div>
                <div className="grow flex flex-col ml-3">
                    <span className=" flex w-full text-[15px] font-semibold mb-1">
                        {`${data.fName} ${data.lName}`}
                    </span>
                    <div className="w-full flex ">
                        <span
                            className={`block w-[150px] line-clamp-1 text-xs text-ellipsis ${
                                +data.watched === 0 &&
                                data.messSenderId !== user.userId
                                    ? " font-semibold text-gray-900"
                                    : "text-gray-500"
                            }`}
                        >
                            {data.messSenderId === user.userId
                                ? `Bạn: ${data.lastMess}`
                                : data.lastMess}
                        </span>
                        <span className="block grow ml-1 text-xs text-right">
                            - {formatTimestamp(data.updatedAt)}
                        </span>
                    </div>
                </div>
                <div className=" w-3 h-3 mx-1 my-auto">
                    {+data.watched === 0 &&
                        data.messSenderId !== user.userId && (
                            <span className="block w-3 h-3 bg-blue-500 rounded-full"></span>
                        )}
                </div>
            </div>
        </div>
    );
}

export default MessItem;
