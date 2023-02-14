import { Link } from "react-router-dom";
import { formatTime } from "../../Hooks/formatTime";
import MainCard from "../MainCard";
import Button from "../Button";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { AiTwotoneLike, AiOutlineLike, AiFillCaretDown } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import img from "../../assets/images/avatar/img1.jpg";
function Posts({ userId, avatar, name, time }) {
	return (
		<>
			<MainCard>
				<div className="flex justify-between p-2">
					<div className="flex">
						<img
							className="w-[40px] h-[40px] rounded-full"
							src={avatar}
							alt=""
						/>
						<div className="flex flex-col ml-2">
							<Link to={"/"}>
								<span className=" font-medium hover:underline">
									{name}
								</span>
							</Link>
							<span className=" text-xs">{formatTime(time)}</span>
						</div>
					</div>
					<div className="flex items-center pr-2">
						<Button _className="h-[36px] w-[36px] rounded-full mr-4 text-2xl text-gray-500 hover:bg-hover">
							<BiDotsHorizontalRounded className=" mx-auto" />
						</Button>
						<Button _className="h-[36px] w-[36px] rounded-full text-2xl text-gray-500 hover:bg-hover">
							<MdClose className=" mx-auto" />
						</Button>
					</div>
				</div>
				<div className="h-full w-full p-2 pt-0">
					<span className="">
						Đang có sự cố kết nối xảy ra làm game không thể tạo
						trận. Bộ phận kỹ thuật đang tiến hành kiểm tra và khắc
						phục. Các anh hùng xin thử lại sau nhé.
					</span>
				</div>
				<div className="h-full w-full border border-gray-300 ">
					<img className="w-full" src={img} alt="" />
				</div>
				<div className="w-full flex justify-between p-2 border-b border-gray-300">
					<Button _className={"flex items-center"}>
						<AiTwotoneLike className=" h-[20px] w-[20px] p-[3px] mr-[3px] rounded-full bg-blue-700 text-white" />
						<span>11</span>
					</Button>
					<Button>
						<span className=" text-gray-500 hover:underline">
							20 bình luận
						</span>
					</Button>
				</div>
				<div className="w-full h-[40px] px-2 py-1 flex border-b border-gray-300">
					<div className="w-1/3  ">
						<Button
							_className={
								"w-full h-full flex justify-center items-center rounded hover:bg-hover"
							}
						>
							<span className="flex items-center text-base font-semibold">
								<AiOutlineLike className="mr-1 text-xl " />
								Thích
								{/* <AiTwotoneLike  className="mr-1 text-xl text-blue-500"/>Thích */}
							</span>
						</Button>
					</div>
					<div className="w-1/3  ">
						<Button
							_className={
								"w-full h-full flex justify-center items-center rounded hover:bg-hover"
							}
						>
							<span className="flex items-center text-base font-semibold">
								<FaRegCommentDots className="mr-1 text-xl " />
								Bình luận
							</span>
						</Button>
					</div>
					<div className="w-1/3  ">
						<Button
							_className={
								"w-full h-full flex justify-center items-center rounded hover:bg-hover"
							}
						>
							<span className="flex items-center text-base font-semibold">
								<RiShareForwardLine className="mr-1 text-xl " />
								Chia sẻ
							</span>
						</Button>
					</div>
				</div>
				<div className="W-full p-2">
					<div className=" w-full flex justify-between ">
						<Button>
							<span className="font-medium text-[15px] text-gray-600 hover:underline">
								Xem 9 bình luận trước
							</span>
						</Button>
						<Button>
							<span className="flex items-center font-medium text-[15px] text-gray-600">
								Phù hợp nhất{" "}
								<AiFillCaretDown className="ml-1" />
							</span>
						</Button>
					</div>
				</div>
				<div className="W-full flex p-2">
					<div className=" flex">
						<img
							className="h-[40px] w-[40px] rounded-full mr-2"
							src={avatar}
							alt=""
						/>
						<div className="">
							<div className="flex flex-col p-2 rounded-xl bg-slate-200">
								<span className=" font-medium text-[14px] ">
									{name}
								</span>
								<span>
									Cái này lúc còn cùi thi up từ từ đừng nhanh
									quá nó dễ max
								</span>
							</div>
							<div className="flex px-2">
								<span className="text-[14px] font-medium mr-3 cursor-pointer hover:underline">
									Thích
								</span>
								<span className="text-[14px] font-medium mr-3 cursor-pointer hover:underline">
									Bình luận
								</span>
								<span className="text-[14px]">5phút</span>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full flex">
					<img
						className="w-[40px] h-[40px] rounded-full mr-2 "
						src={avatar}
						alt=""
					/>
					<input
						className=" flex-1 rounded-full p-2 px-4 bg-gray-200 outline-none"
						type="text"
						placeholder="Viết câu trả lời..."
					/>
				</div>
			</MainCard>
		</>
	);
}

export default Posts;
