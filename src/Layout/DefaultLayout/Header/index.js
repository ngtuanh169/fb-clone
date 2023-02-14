import HeaderSearch from "./HeaderSearch";
import HeaderNav from "./HeaderNav";
import HeaderTool from "./HeaderTool";
function Header() {
    return (
        <div className=" h-14 flex justify-between bg-white shadow-md px-4">
            <HeaderSearch />
            <HeaderNav />
            <HeaderTool />
        </div>
    );
}

export default Header;
