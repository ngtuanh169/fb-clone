import { useContext } from "react";
import { ValueContext } from "../index";
import Item from "./Item";

function IconList({ closeModal = () => {} }) {
    const context = useContext(ValueContext);
    return (
        <div
            style={{ boxShadow: "1px 1px 1px #ccc" }}
            className="flex gap-2 p-1 rounded-full border cursor-default "
        >
            {context.iconList.length > 0 &&
                context.iconList.map((item, index) => (
                    <Item key={index} data={item} closeModal={closeModal} />
                ))}
        </div>
    );
}

export default IconList;
