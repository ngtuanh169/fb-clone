import { useContext } from "react";
import { useSelector } from "react-redux";
import { ScreenSize } from "../../App";
import ConversationsItem from "./ConversationsItem";
import OutsideItems from "./OutsideItems";
function SmallConversationsList() {
    const context = useContext(ScreenSize);
    const conversationsList = useSelector((state) => state.conversationsList);
    return (
        <>
            {context.width >= 450 && (
                <div className=" fixed bottom-[80px] right-[25px] flex flex-col justify-end z-[55]">
                    {conversationsList.length > 1 &&
                        conversationsList.map((item, index) => {
                            if (index > 0 && index <= 4) {
                                return (
                                    <div key={index} className=" relative mt-3">
                                        <ConversationsItem data={item} />
                                        {index === 4 &&
                                            conversationsList.length > 5 && (
                                                <OutsideItems
                                                    conversationsList={
                                                        conversationsList
                                                    }
                                                />
                                            )}
                                    </div>
                                );
                            }
                            return;
                        })}
                </div>
            )}
        </>
    );
}

export default SmallConversationsList;
