import { useContext } from "react";
import { ValueContext } from "../index";
function Item({ data, closeModal = () => {} }) {
    const context = useContext(ValueContext);
    const handleClick = (e) => {
        e.stopPropagation();
        context.setReactIcon(data);
        closeModal();
    };
    return (
        <div
            className=" relative group/item w-[39px] h-[39px] transition-all cursor-pointer rounded-full hover:scale-110"
            onClick={handleClick}
        >
            <img
                className="w-full h-full object-cover"
                src={data.icon}
                alt=""
            />
            <span
                className=" absolute left-0 top-[-100%] flex w-max px-2 py-1 bg-matteBlack text-[12px] font-medium text-white rounded-full  
                    transition-all invisible opacity-0 group-hover/item:opacity-100 group-hover/item:visible"
            >
                {data.name}
            </span>
        </div>
    );
}

export default Item;
