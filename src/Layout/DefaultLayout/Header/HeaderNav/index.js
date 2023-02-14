import NavItem from "./NavItem";
import { TiHome } from "react-icons/ti";
import { MdOndemandVideo } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { IoGameControllerOutline } from "react-icons/io5";
function HeaderNav() {
	return (
		<div className=" w-6/12 flex justify-center justify-items-center ">
			<ul className="flex w-4/5">
				<NavItem to="/">
					<TiHome className="h-full mx-auto my-0 " />
				</NavItem>
				<NavItem to="/videos">
					<MdOndemandVideo className="h-full mx-auto my-0 " />
				</NavItem>
				<NavItem to="/marketplace">
					<BsShop className="h-full mx-auto my-0 " />
				</NavItem>
				<NavItem to="/groups">
					<HiUserGroup className="h-full mx-auto my-0 " />
				</NavItem>
				<NavItem to="/games">
					<IoGameControllerOutline className="h-full mx-auto my-0 " />
				</NavItem>
			</ul>
		</div>
	);
}

export default HeaderNav;
