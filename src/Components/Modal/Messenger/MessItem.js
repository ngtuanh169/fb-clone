import { useDispatch } from "react-redux";
import { addMess } from "../../../redux/actions/openMessList";
import { formatTime } from "../../../Hooks/useFormat";
function MessItem({ id, avatar, name, text, time, closeModal = () => {} }) {
    const dispatch = useDispatch();
    return (
        <div
            className="w-full p-2 rounded-md cursor-pointer hover:bg-hover "
            onClick={(e) => {
                closeModal();
                dispatch(addMess(id, avatar, name));
            }}
        >
            <div className="flex h-full w-full ">
                <div className="">
                    <img
                        className="w-[50px] h-[50px] rounded-full"
                        src={avatar}
                        alt=""
                    />
                </div>
                <div className="flex-1 ml-3">
                    <span className=" flex w-full text-[15px] font-semibold">
                        {name}
                    </span>
                    <div className="w-full flex ">
                        <span className=" line-clamp-1 flex-1 text-xs text-gray-500">
                            {text}
                        </span>
                        <span className="flex text-xs">
                            - {formatTime(time)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessItem;
