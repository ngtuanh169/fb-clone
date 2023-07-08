import { useState } from "react";
import MainCard from "../../../../Components/MainCard";
import Button from "../../../../Components/Button";

import { BsPencil } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";
function InfoItem({ icon, text, Comp }) {
    const [openForm, setOpenForm] = useState(false);
    return (
        <div className="flex justify-between w-full mb-4">
            {openForm ? (
                <Comp closeForm={() => setOpenForm(false)} />
            ) : (
                <>
                    <div className="flex items-center">
                        <img
                            src={icon}
                            className="w-[25px] h-[25px] opacity-60"
                        />
                        <span className="ml-3 line-clamp-1">{text}</span>
                    </div>
                    <div className="">
                        <Button
                            _className={
                                "flex justify-center items-center w-[36px] h-[36px] rounded-full bg-gray-200 hover:bg-gray-300"
                            }
                            onClick={() => setOpenForm(true)}
                        >
                            <BsPencil className="text-[20px]" />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default InfoItem;
