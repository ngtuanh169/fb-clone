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
                <div className="">
                    <img
                        className="w-[50px] h-[50px] rounded-full"
                        src={formatAvatar(data.avatar, data.sx)}
                        alt=""
                    />
                </div>
                <div className="flex-1 ml-3">
                    <span className=" flex w-full text-[15px] font-semibold">
                        {`${data.fName} ${data.lName}`}
                    </span>
                    <div className="w-full flex ">
                        <span
                            className={`line-clamp-1 flex-1 text-xs  ${
                                +data.watched === 0
                                    ? " font-semibold"
                                    : "text-gray-500"
                            }`}
                        >
                            {data.lastMess}
                        </span>
                        <span className="flex text-xs">
                            - {formatTimestamp(data.updatedAt)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessItem;
