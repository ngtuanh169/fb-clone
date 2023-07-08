import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
function Item({ children, text = "", list, to, onClick = () => {} }) {
    let Comp = "div";
    const _prop = {};
    if (to) {
        Comp = Link;
        _prop.to = to;
    }
    return (
        <Comp
            className="flex items-center relative w-full p-2 rounded-md cursor-pointer hover:bg-gray-200"
            {..._prop}
            onClick={onClick}
        >
            <span className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-300">
                {children}
            </span>
            <span className="ml-4 text-[15px] font-medium ">{text}</span>
            {list && (
                <span className=" absolute right-[10px] top-0 flex items-center h-full">
                    <BsChevronRight />
                </span>
            )}
        </Comp>
    );
}

export default Item;
