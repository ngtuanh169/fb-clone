import { Link } from "react-router-dom";
function Button({ children, href, to, _className, onClick }) {
	let Comp = "button";
	const _props = {};
	if (to) {
		Comp = Link;
		_props.to = to;
	}
	if (href) {
		Comp = "a";
		_props.href = href;
	}
	if (onClick) {
		_props.onClick = onClick;
	}
	return (
		<Comp className={_className} {..._props}>
			{children}
		</Comp>
	);
}

export default Button;
