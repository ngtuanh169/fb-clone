import { NavLink } from "react-router-dom";
import Button from "../../../../../Components/Button";
function NavItem({ children, to, name, onClick = () => {} }) {
    let Comp = "div";
    if (to) {
        Comp = NavLink;
    }
    return (
        <li
            className=" relative group/item flex items-center h-full w-full text-gray-600 "
            onClick={onClick}
        >
            <Comp
                to={to}
                className={
                    to
                        ? ({ isActive }) =>
                              ` block w-full h-full px-1 pt-1 border-b-4 ${
                                  isActive
                                      ? "text-blue-600 border-blue-600"
                                      : "border-transparent"
                              } `
                        : ""
                }
                // end
            >
                <span className=" flex items-center justify-center w-full h-full rounded-lg text-[28px] hover:bg-hover">
                    {children}
                </span>
            </Comp>
            {/* <div
                className=" xl:block absolute top-[100%] left-0 w-full group/edit text-center pt-2 invisible opacity-0 
                transition-all ease-linear delay-100 group-hover/item:visible group-hover/item:opacity-100"
            >
                <span
                    className=" p-2 text-[13px] text-white bg-gray-600 rounded-md drop-shadow-md 
                transition-all ease-linear delay-100 group-hover/edit:invisible group-hover/edit:opacity-0 "
                >
                    {name}
                </span>
            </div> */}
        </li>
    );
}

export default NavItem;
