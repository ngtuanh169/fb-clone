import Header from "./Header";
import ConversationsList from "../../Components/ConversationsList";
import SmallConversationsList from "../../Components/SmallConversationsList";
function DefaultLayout({ children }) {
    return (
        <div className=" w-full h-screen flex flex-col">
            <div className="w-full fixed z-50 ">
                <Header />
            </div>
            <ConversationsList />
            <SmallConversationsList />
            <div className="flex-1 pt-14">{children}</div>
        </div>
    );
}

export default DefaultLayout;
