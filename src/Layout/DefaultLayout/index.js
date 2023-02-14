import Header from "./Header";
function DefaultLayout({ children }) {
    return (
        <div className=" w-full flex-col">
            <div className="w-full fixed z-[99] ">
                <Header />
            </div>
            <div className=" pt-14">{children}</div>
        </div>
    );
}

export default DefaultLayout;
