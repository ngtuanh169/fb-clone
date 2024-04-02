import { useContext } from "react";
import { useSelector } from "react-redux";
import { ScreenSize } from "../../App";
import ConversationsItem from "./ConversationsItem";
function ConversationsList() {
    const context = useContext(ScreenSize);
    const conversationsList = useSelector((state) => state.conversationsList);
    return (
        <div
            className={` fixed flex bottom-0 ${
                context.width < 450 ? "right-[10px]" : "right-[100px]"
            } z-[55]`}
        >
            {conversationsList.length > 0 &&
                conversationsList.map((item, index) => {
                    if (index < 1) {
                        return (
                            <ConversationsItem
                                key={item.conversationsId}
                                data={item}
                                // active={index < 3}
                            />
                        );
                    }
                })}
        </div>
    );
}

export default ConversationsList;
