function ToolItem({ children, text }) {
	return (
		<div className="flex h-full w-full justify-center items-center py-1 rounded-md cursor-pointer hover:bg-hover">
			<span className="text-3xl mr-1 text-blue-500">{children}</span>
			<span className=" text-gray-600 font-semibold">{text}</span>
		</div>
	);
}

export default ToolItem;
