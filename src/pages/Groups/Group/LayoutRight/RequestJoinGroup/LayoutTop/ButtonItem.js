import { useState, useRef } from "react";
import { useClickOutSide } from "../../../../../../Hooks/useClickOutSide";
import Button from "../../../../../../Components/Button";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
function ButtonItem({
    itemList,
    searchValues,
    changeValue = () => {},
    layoutRight,
}) {
    const divRef = useRef();
    const [showOptions, setShowOptions] = useState(false);
    useClickOutSide(divRef, () => setShowOptions(false));
    return (
        <div ref={divRef} className="relative w-max">
            <Button
                _className={
                    " flex items-center px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                }
                onClick={() => setShowOptions(!showOptions)}
            >
                {Object.keys(searchValues).length > 1 ? (
                    <>
                        <span
                            className={` mr-2 font-medium ${
                                searchValues[itemList.name].id
                                    ? "text-blue-500"
                                    : ""
                            } `}
                        >
                            {searchValues[itemList.name].id
                                ? searchValues[itemList.name].name
                                : itemList.title}
                        </span>
                        <AiOutlineCaretDown
                            className={
                                searchValues[itemList.name].id
                                    ? "text-blue-500"
                                    : ""
                            }
                        />
                    </>
                ) : (
                    <>
                        <span className=" mr-2 font-medium">
                            {searchValues[itemList.name].id
                                ? searchValues[itemList.name].name
                                : itemList.options[0].name}
                        </span>
                        <AiOutlineCaretDown />
                    </>
                )}
            </Button>
            {showOptions && (
                <div
                    style={{ boxShadow: "0px 1px 2px 1px #ccc" }}
                    className={` absolute top-[100%] ${
                        layoutRight ? "right-0" : "left-0"
                    } flex flex-col w-[340px] p-2 bg-white rounded-md shadow-md z-10`}
                >
                    {itemList.options.length > 0 &&
                        itemList.options.map((item) => (
                            <div
                                key={item.id}
                                className={`w-full p-[2px] rounded-md ${
                                    searchValues[itemList.name].id === item.id
                                        ? "border-2 border-blue-500"
                                        : ""
                                }`}
                            >
                                <Button
                                    _className={`flex items-center justify-between w-full p-2 ${
                                        searchValues[itemList.name].id ===
                                        item.id
                                            ? "bg-gray-200"
                                            : ""
                                    }  rounded-md cursor-pointer hover:bg-gray-200`}
                                    onClick={() => {
                                        changeValue(itemList.name, item);
                                        setShowOptions(false);
                                    }}
                                >
                                    <span className=" block flex-1 font-medium text-left">
                                        {item.name}
                                    </span>
                                    {searchValues[itemList.name].id ===
                                        item.id && (
                                        <BsCheck2
                                            className={`text-[22px] ${
                                                searchValues[itemList.name]
                                                    .id === item.id
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
