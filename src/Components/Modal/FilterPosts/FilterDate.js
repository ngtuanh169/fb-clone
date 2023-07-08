import { useState, useRef } from "react";
import { useClickOutSide } from "../../../Hooks/useClickOutSide";
import MainCard from "../../MainCard";
import Button from "../../Button";
import { AiFillCaretDown } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";
function FilterDate({
    text,
    listItem = [],
    filter = {},
    setFilter = () => {},
    nameFilter,
    abRight = false,
}) {
    const modalRef = useRef();
    const [openListDate, setOpenListDate] = useState(false);
    useClickOutSide(modalRef, () => setOpenListDate(false));
    return (
        <div ref={modalRef} className=" relative mr-2">
            <Button
                _className={
                    "flex items-center py-2 px-3 rounded-md bg-gray-200 hover:bg-gray-300"
                }
                onClick={() => setOpenListDate(!openListDate)}
            >
                <span className=" mr-2 font-semibold">
                    {filter[nameFilter] === 0
                        ? text
                        : `${text} ${filter[nameFilter]}`}
                </span>
                <AiFillCaretDown />
            </Button>
            {openListDate && (
                <div
                    className={`absolute top-[100%] p-1 ${
                        abRight ? "right-0" : "left-0"
                    } w-[250px]`}
                >
                    <MainCard>
                        <div className="max-h-[150px] p-2 scrollbar-thin scrollbar-thumb-slate-500 scrollbar-thumb-rounded-full overflow-hidden">
                            <div
                                className={` flex justify-between items-center font-semibold p-2 border-[2px] border-transparent ${
                                    filter[nameFilter] === 0
                                        ? "border-blue-500 bg-gray-200"
                                        : ""
                                } cursor-pointer rounded-md hover:bg-gray-200`}
                                onClick={() => {
                                    setFilter({
                                        ...filter,
                                        [nameFilter]: 0,
                                    });
                                    setOpenListDate(false);
                                }}
                            >
                                <span>{text}</span>
                                {filter[nameFilter] === 0 && <FcCheckmark />}
                            </div>
                            {listItem.length > 0 &&
                                listItem.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-between items-center font-semibold p-2 border-[2px] border-transparent ${
                                            filter[nameFilter] === item
                                                ? "border-blue-500 bg-gray-200"
                                                : ""
                                        } cursor-pointer rounded-md hover:bg-gray-200`}
                                        onClick={() => {
                                            setFilter({
                                                ...filter,
                                                [nameFilter]: item,
                                            });
                                            setOpenListDate(false);
                                        }}
                                    >
                                        <span>{item}</span>
                                        {filter[nameFilter] === item && (
                                            <FcCheckmark />
                                        )}
                                    </div>
                                ))}
                        </div>
                    </MainCard>
                </div>
            )}
        </div>
    );
}

export default FilterDate;
