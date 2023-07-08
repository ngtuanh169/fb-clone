import { useContext } from "react";
import { NavContext } from "../../NavProvider";
import NavItem from "./NavItem";
function NavList() {
    const context = useContext(NavContext);

    return (
        <div className="flex w-max sm:w-full h-full pt-1">
            {context.navList.length > 0 &&
                context.navList.map((item) => (
                    <NavItem key={item.id} nav={item} />
                ))}
        </div>
    );
}

export default NavList;
