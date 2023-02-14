import { NavLink } from "react-router-dom";
function NavItem({ children, to }) {
	return (
		<li className="h-full w-1/5 text-gray-600 mx-2 ">
			<NavLink
				to={to}
				className={(nav) => {
					let isActive = "border-transparent";
					if (nav.isActive) {
						isActive = " text-blue-600 border-blue-600";
					}
					return ` block h-full px-1 pt-1 border-b-4 ${isActive} `;
				}}
				end
			>
				<span className=" block h-full rounded-lg text-[26px] hover:bg-hover">
					{children}
				</span>
			</NavLink>
		</li>
	);
}

export default NavItem;
