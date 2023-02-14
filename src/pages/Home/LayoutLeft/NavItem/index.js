import { Link } from "react-router-dom";
function Navtem({ children, text, to, href }) {
	let Comp = "div";
	const _props = {};
	if (to) {
		Comp = Link;
		_props.to = to;
	}
	if (href) {
		Comp = "a";
		_props.href = href;
	}
	return (
		<li className="">
			<Comp
				className="flex items-center w-full p-2 rounded hover:bg-hover cursor-pointer"
				{..._props}
			>
				<span className="h-[28px] w-[28px] flex justify-center items-center text-2xl mr-3 text-blue-400">
					{children}
				</span>
				<span className=" block flex-1 h-full font-semibold items-center line-clamp-2 text-ellipsis ">
					{text}
				</span>
			</Comp>
		</li>
	);
}

export default Navtem;
