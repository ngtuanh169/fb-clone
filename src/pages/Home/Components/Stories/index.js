import { useState, useRef, useEffect } from "react";
import MainCard from "../../../../Components/MainCard";
import TabItem from "./TabItem";
import StoryCard from "./StoryCard";
import { FaBookOpen } from "react-icons/fa";
import { RiVideoAddFill } from "react-icons/ri";
import { HiFilm } from "react-icons/hi";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import avatar from "../../../../assets/images/avatar/avatar.jpg";
import story from "../../../../assets/images/avatar/story.jpg";
function Stories() {
	const storiesRef = useRef();
	const [idTab, setIdTab] = useState(0);
	const [listStories, setListStories] = useState(6);
	const [indexSlider, setIndexSlider] = useState(0);
	const [clientWidth, setClientWidth] = useState(0);
	useEffect(() => {
		console.log(storiesRef.current.clientWidth / 4);
		setClientWidth(storiesRef.current.clientWidth / 4);
	}, []);
	const handleClickNext = () => {
		if (indexSlider < listStories - 3) setIndexSlider(indexSlider + 1);
	};
	const handleClickPrev = () => {
		if (indexSlider > 0) setIndexSlider(indexSlider - 1);
	};
	return (
		<MainCard>
			<div className="flex justify-around w-full px-2 border-b border-gray-200">
				<TabItem id={0} active={idTab} text={"Tin"} setId={setIdTab}>
					<FaBookOpen />
				</TabItem>
				<TabItem id={1} active={idTab} text={"Reels"} setId={setIdTab}>
					<HiFilm />
				</TabItem>
				<TabItem
					id={2}
					active={idTab}
					text={"Phòng họp mặt"}
					setId={setIdTab}
				>
					<RiVideoAddFill />
				</TabItem>
			</div>
			<div
				ref={storiesRef}
				className="flex w-full h-[226px] overflow-hidden relative"
			>
				<div
					className={`flex w-max`}
					style={{
						transform: `translateX(-${
							indexSlider * clientWidth
						}px) `,
					}}
				>
					{Array(listStories)
						.fill(0)
						.map((item, index) => (
							<div key={index}>
								<StoryCard
									avatar={avatar}
									img={story}
									name={index}
									width={clientWidth}
								/>
							</div>
						))}
				</div>
				{indexSlider > 0 && (
					<button
						className="h-11 w-11 rounded-full bg-white absolute left-2 top-1/3 shadow shadow-gray-700"
						onClick={handleClickPrev}
					>
						<AiOutlineLeft className=" mx-auto text-2xl text-gray-600" />
					</button>
				)}
				{indexSlider <= listStories - 5 && (
					<button
						className=" h-11 w-11 rounded-full bg-white absolute right-2 top-1/3 shadow shadow-gray-700"
						onClick={handleClickNext}
					>
						<AiOutlineRight className="mx-auto text-2xl text-gray-600" />
					</button>
				)}
			</div>
		</MainCard>
	);
}

export default Stories;
