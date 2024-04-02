import { NavLink } from "react-router-dom";
function NavItem({ data }) {
    return (
        <NavLink
            to={data.link}
            className={({ isActive }) =>
                ` relative block p-4 font-medium text-gray-500 rounded-md ${
                    isActive ? "cursor-default" : " hover:bg-hover"
                } `
            }
            end
        >
            {({ isActive }) => (
                <>
                    <span>{data.name}</span>
                    <span
                        className={`absolute left-0 bottom-0 w-full h-1 ${
                            isActive ? "bg-blue-700" : "bg-transparent"
                        }`}
                    ></span>
                </>
            )}
        </NavLink>
    );
}

export default NavItem;
