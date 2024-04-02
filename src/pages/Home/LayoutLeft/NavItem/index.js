import { Link } from "react-router-dom";
import Button from "../../../../Components/Button";
function Navtem({ children, text, to, href, iconClassName = "" }) {
    return (
        <li className="">
            <Button
                to={to ? to : false}
                _className="flex items-center w-full p-2 rounded hover:bg-hover cursor-pointer"
                // {..._props}
            >
                <span className="h-[36px] w-[36px] flex justify-center items-center text-2xl mr-3 text-blue-400">
                    {children ? (
                        children
                    ) : (
                        <i
                            className={`w-9 h-9 bg-urlNavIcons bg-szNavIcons bg-no-repeat inline-block ${iconClassName}`}
                        ></i>
                    )}
                </span>
                <span className=" block flex-1 h-full font-semibold items-center line-clamp-2 text-ellipsis break-words">
                    {text}
                </span>
            </Button>
        </li>
    );
}

export default Navtem;
