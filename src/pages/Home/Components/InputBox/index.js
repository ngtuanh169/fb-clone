import MainCard from "../../../../Components/MainCard";
import ToolItem from "./ToolItem";
import avatar from "../../../../assets/images/avatar/avatar.jpg";
import { RiVideoChatFill } from "react-icons/ri";
import { IoIosImages } from "react-icons/io";
import { BiHappyAlt } from "react-icons/bi";
function InputBox() {
	return (
		<MainCard>
			<div className="flex w-full border-b p-2 border-gray-300">
				<img
					className="h-[40px] w-[40px] rounded-full"
					src={avatar}
					alt=""
				/>
				<span className="flex w-full p-2 pl-3 ml-2 rounded-full cursor-pointer bg-slate-100 items-center text-slate-500 hover:bg-hover">
					Tu Anh ơi, bạn đang nghĩ gì thế?
				</span>
			</div>
			<div className="flex pt-2">
				<div className="w-[30%]  ">
					<ToolItem text={"Phát trực tiếp"}>
						<RiVideoChatFill />
					</ToolItem>
				</div>
				<div className="w-[30%]  ">
					<ToolItem text={"Ảnh/video"}>
						<IoIosImages />
					</ToolItem>
				</div>
				<div className="w-[40%]  ">
					<ToolItem text={"Cảm xúc/Hoạt động"}>
						<BiHappyAlt />
					</ToolItem>
				</div>
			</div>
		</MainCard>
	);
}

export default InputBox;
