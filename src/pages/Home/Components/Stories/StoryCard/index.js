function StoryCard({ avatar, name, img, width }) {
	return (
		<div className={`h-full py-3 pl-3`} style={{ width: `${width}px` }}>
			<div className="h-full w-full rounded-lg overflow-hidden cursor-pointer shadow-md relative">
				<img
					className=" absolute h-[40px] w-[40px] rounded-full top-2 left-2 p-1 bg-white "
					src={avatar}
					alt=""
				/>
				<img
					className="h-full w-full object-cover object-center"
					src={img}
					alt=""
				/>
				<p className=" absolute left-2 bottom-2 w-[80%] text-white text-[15px] ">
					{name}
				</p>
			</div>
		</div>
	);
}

export default StoryCard;
