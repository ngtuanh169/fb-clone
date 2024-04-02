import { useDispatch } from "react-redux";
import { addConversations } from "../../redux/actions/conversationsList";
import Button from "../Button";
function OutsideItems({ conversationsList = [] }) {
    const dispatch = useDispatch();

    return (
        <div className=" absolute top-0 left-0 group h-full w-full">
            <div className=" relative  h-full w-full">
                {/* <img
                    className="h-[50px] w-[50px] rounded-full"
                    src={conversationsList[4].avt}
                    alt=""
                /> */}
                <div
                    className=" absolute top-0 left-0 flex items-center justify-center
                        h-full w-full rounded-full bg-matteBlack2"
                >
                    <span className=" font-medium text-white">{`+ ${
                        conversationsList.length - 4
                    }`}</span>
                </div>
                <div
                    className=" absolute right-[100%] bottom-0 flex justify-center items-end pr-[10%] 
                        invisible opacity-0 group-hover:visible group-hover:opacity-100"
                >
                    <span
                        className="flex flex-col min-w-[150px] w-max h-full p-3 rounded-lg drop-shadow-custom1 
                        font-semibold bg-white "
                    >
                        {conversationsList.length > 5 &&
                            conversationsList.map((item, index) => {
                                if (index >= 4) {
                                    return (
                                        <Button
                                            key={item.conversationsId}
                                            _className={
                                                "flex p-1 rounded-md hover:bg-gray-200"
                                            }
                                            onClick={() =>
                                                dispatch(
                                                    addConversations(
                                                        item.conversationsId
                                                    )
                                                )
                                            }
                                        >
                                            {item.othersName}
                                        </Button>
                                    );
                                }
                            })}
                    </span>
                    <span
                        className="w-0 h-0 mb-3 border-l-[15px] border-y-[10px] border-b-transparent 
                        border-t-transparent border-l-white drop-shadow-custom2 z-50"
                    ></span>
                </div>
            </div>
        </div>
    );
}

export default OutsideItems;
