import Header from "./Header";
import OpenMessList from "../../Components/OpenMessList";
import SmallMessList from "../../Components/SmallMessList";
function DefaultLayout({ children }) {
    return (
        <div className=" w-full flex-col">
            <div className="w-full fixed z-[99] ">
                <Header />
            </div>
            <OpenMessList />
            <SmallMessList />
            <div className=" pt-14">{children}</div>
        </div>
    );
}

export default DefaultLayout;
