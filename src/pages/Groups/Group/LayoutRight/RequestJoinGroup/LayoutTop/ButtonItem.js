import { useState, useRef, useEffect } from "react";
import { useClickOutSide } from "../../../../../../Hooks/useClickOutSide";
import Button from "../../../../../../Components/Button";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
function ButtonItem({
    itemList,
    payload,
    setPayload = () => {},
    layoutRight,
    cursorDefault = false,
}) {
    const divRef = useRef();
    const [text, setText] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    useClickOutSide(divRef, () => setShowOptions(false));
    useEffect(() => {
        if (payload[itemList.name]) {
            const index = itemList.options.findIndex(
                (item) => item.value == payload[itemList.name]
            );
            setText(itemList.options[index].name);
        } else {
            setText("");
        }
    }, [payload]);
    return (
        <div ref={divRef} className="relative w-max">
            <Button
                _className={
                    " flex items-center px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                }
                cursorDefault={cursorDefault}
                onClick={() => !cursorDefault && setShowOptions(!showOptions)}
            >
                <span
                    className={`font-medium ${
                        text && itemList.title ? "text-blue-500" : ""
                    }`}
                >
                    {text ? text : itemList.title}
                </span>
            </Button>
            {showOptions && (
                <div
                    style={{ boxShadow: "0px 1px 2px 1px #ccc" }}
                    className={` absolute top-[100%] ${
                        layoutRight ? "right-0" : "left-0"
                    } flex flex-col w-[340px] p-2 bg-white rounded-md shadow-md z-30`}
                >
                    {itemList.options.length > 0 &&
                        itemList.options.map((item) => (
                            <div
                                key={item.id}
                                className={`w-full p-[2px] rounded-md ${
                                    payload[itemList.name] == item.value
                                        ? "border-2 border-blue-500"
                                        : ""
                                }`}
                            >
                                <Button
                                    _className={`flex items-center justify-between w-full p-2 ${
                                        payload[itemList.name] == item.value
                                            ? "bg-gray-200"
                                            : ""
                                    }  rounded-md cursor-pointer hover:bg-gray-200`}
                                    onClick={() => {
                                        setPayload({
                                            ...payload,
                                            page: 1,
                                            number: 0,
                                            [itemList.name]: item.value,
                                        });
                                        setShowOptions(false);
                                    }}
                                >
                                    <span className=" block flex-1 font-medium text-left">
                                        {item.name}
                                    </span>
                                    {payload[itemList.name] == item.value && (
                                        <BsCheck2
                                            className={`text-[22px] ${
                                                payload[itemList.name] ==
                                                item.value
                                                    ? "text-blue-500"
                                                    : ""
                                            }`}
                                        />
                                    )}
                                </Button>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default ButtonItem;
