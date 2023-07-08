import { useContext } from "react";
import { NavContext } from "../../NavProvider";
import Button from "../../../../../Components/Button";
function NavItem({ nav }) {
    const context = useContext(NavContext);
    return (
        <div
            className={`border-b-4 ${
                context.currentNav.id === nav.id
                    ? "border-blue-700 "
                    : " border-transparent"
            } `}
        >
            <Button
                _className={`p-4 font-medium text-gray-500 rounded-md ${
                    context.currentNav.id === nav.id ? "cursor-default" : ""
                } hover:bg-hover`}
                onClick={() => context.setCurrentNav(nav)}
            >
                {nav.name}
            </Button>
        </div>
    );
}

export default NavItem;
