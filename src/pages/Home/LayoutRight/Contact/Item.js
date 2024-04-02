import { useDispatch } from "react-redux";
import { formatAvatar } from "../../../../Hooks/useFormat";
import { addConversations } from "../../../../redux/actions/conversationsList";
import Button from "../../../../Components/Button";
function Item({ data }) {
    const dispatch = useDispatch();
    return (
        <div className="w-full flex p-2 mb-2 rounded-lg hover:bg-hover">
            <Button
                _className={"flex"}
                onClick={() =>
                    dispatch(
                        addConversations(data.conversationsId, data.othersId)
                    )
                }
            >
                <span className=" relative block w-max">
                    <img
                        className="h-[36px] w-[36px] rounded-full border border-gray-500"
                        src={formatAvatar(data.avatar, data.sx)}
                        alt=""
                    />
                    <span
                        style={{
                            backgroundColor:
                                data.statusLogin === "0"
                                    ? "#9ca3af"
                                    : "#22c55e",
                        }}
                        className=" absolute bottom-[-1px] right-0 block w-[11px] h-[11px] rounded-full bg-gray-400 border-[2px] border-white"
                    ></span>
                </span>
                <span className=" block flex-1 h-full ml-3 font-semibold items-center line-clamp-2 text-ellipsis ">
                    {`${data.fName} ${data.lName}`}
                </span>
            </Button>
        </div>
    );
}

export default Item;
