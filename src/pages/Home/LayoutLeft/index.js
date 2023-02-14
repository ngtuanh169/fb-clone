import Navtem from "./NavItem";
import { FaUserFriends } from "react-icons/fa";
import { MdGroups, MdOndemandVideo } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoMdTime } from "react-icons/io";
import { BiArrowToBottom } from "react-icons/bi";
import avatar from "../../../assets/images/avatar/avatar.jpg";

function LayoutLeft() {
	return (
		<div className="w-full h-full pt-[50px] scrollbar-thin scrollbar-thumb-gray-300">
			<div className=" pb-2 border-b border-gray-300">
				<ul className=" ">
					<Navtem to={"/profile"} text={"Nguyễn Tú Anh"}>
						<img
							className=" rounded-full"
							src={avatar}
							alt="avatar"
						/>
					</Navtem>
					<Navtem to={"/friends"} text={"Bạn bè"}>
						<FaUserFriends />
					</Navtem>
					<Navtem to={"/groups"} text={"Nhóm"}>
						<MdGroups />
					</Navtem>
					<Navtem text={"Gần đây nhất"}>
						<IoMdTime />
					</Navtem>
					<Navtem to={"/marketplace"} text={"Marketplace"}>
						<SiHomeassistantcommunitystore />
					</Navtem>
					<Navtem to={"/videos"} text={"Watch"}>
						<MdOndemandVideo />
					</Navtem>
				</ul>
			</div>
			<div className=" pt-3 ">
				<p className=" font-semibold text-gray-500">Lối tắt của bạn</p>
				<ul className=" py-3">
					<Navtem to={"/profile"} text={"Giao Lưu - Blue Sky"}>
						<img
							className=" rounded-full"
							src={avatar}
							alt="avatar"
						/>
					</Navtem>
					<Navtem
						to={"/profile"}
						text={"Ninja School Online Sv5 - Katana"}
					>
						<img
							className=" rounded-full"
							src={avatar}
							alt="avatar"
						/>
					</Navtem>
					<Navtem
						to={"/profile"}
						text={"Ninja School Online Sv7 - Sanzu"}
					>
						<img
							className=" rounded-full"
							src={avatar}
							alt="avatar"
						/>
					</Navtem>
					<Navtem to={"/profile"} text={"Công Nghệ Thông Tin 4 K19"}>
						<img
							className=" rounded-full"
							src={avatar}
							alt="avatar"
						/>
					</Navtem>
					<Navtem
						to={"/profile"}
						text={"Ninja School Online(10 Năm một hành trình)"}
					>
						<img
							className=" rounded-full"
							src={avatar}
							alt="avatar"
						/>
					</Navtem>
					<Navtem text={"Xem thêm"}>
						<BiArrowToBottom className=" p-2 rounded-full bg-slate-300 text-black" />
					</Navtem>
				</ul>
			</div>
		</div>
	);
}

export default LayoutLeft;
