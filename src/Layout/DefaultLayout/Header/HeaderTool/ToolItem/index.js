import { Link } from "react-router-dom";
function ToolItem({ children, to, href }) {
	let Comp = "span";
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
		<li className=" ml-3 flex items-center">
			<Comp
				className="flex justify-center items-center h-10 w-10  rounded-full bg-slate-100 text-xl cursor-pointer overflow-hidden hover:bg-slate-200"
				{..._props}
			>
				{children}
			</Comp>
		</li>
	);
}

export default ToolItem;
