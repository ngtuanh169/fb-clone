import { Link } from "react-router-dom";
import { formatTime } from "../../../../Hooks/formatTime";
import Button from "../../../../Components/Button";
function FriendRequest({ avatar, time }) {
	return (
		<div className="w-full rounded-lg mb-2">
			{/* <Link className="block w-full h-full " to={'/profle'}> */}
			<div className="flex justify-between p-2">
				<div className="flex w-full">
					<Link to={"/"}>
						<img
							className=" w-[46px] h-[46px] rounded-full mr-3 "
							src={avatar}
							alt=""
						/>
					</Link>
					<div className=" flex-1 flex-col">
						<div className="flex flex-col">
							<Link to={"/"} className={" w-max"}>
								<span className=" font-semibold hover:underline">
									Nguyễn Tú Anh
								</span>
							</Link>
							<span className=" text-[13px] text-gray-500 ">
								{formatTime(time)}
							</span>
						</div>
						<div className="flex justify-between mt-2">
							<Button
								_className={
									"w-[45%] p-1.5 rounded-md bg-blue-600 "
								}
							>
								<span className="font-medium text-white">
									Xác nhận
								</span>
							</Button>
							<Button
								_className={
									"w-[45%] p-1.5 rounded-md bg-gray-200 "
								}
							>
								<span className="font-medium">Xóa</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
			{/* </Link> */}
		</div>
	);
}

export default FriendRequest;
