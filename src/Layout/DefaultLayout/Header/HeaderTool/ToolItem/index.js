import NotiNumber from "../../../../../Components/NotiNumber";
import { Link } from "react-router-dom";
import Button from "../../../../../Components/Button";
function ToolItem({
    children,
    to,
    href,
    _ref,
    notiMumber = 0,
    onClick = () => {},
    backGroudColor = false,
}) {
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
    if (_ref) {
        _props.ref = _ref;
    }
    if (onClick) {
        _props.onClick = onClick;
    }
    return (
        <li className=" ml-3 flex flex-col justify-center">
            {notiMumber > 0 && (
                <div className=" relative h-0 w-full">
                    <div className=" absolute top-[-5px] right-[-5px]">
                        <NotiNumber number={notiMumber} />
                    </div>
                </div>
            )}
            <Comp
                className={` rounded-full ${
                    backGroudColor ? backGroudColor : "bg-slate-100"
                }  text-xl cursor-pointer overflow-hidden ${
                    backGroudColor ? "" : "hover:bg-slate-200"
                } `}
                // to={to ? to : false}
                // onClick={onClick}
                {..._props}
            >
                {children}
            </Comp>
        </li>
    );
}

export default ToolItem;
