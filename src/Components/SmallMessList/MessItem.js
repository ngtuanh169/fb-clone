import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMess, removeMess } from "../../redux/actions/openMessList";
import Button from "../Button";
import { MdOutlineClose } from "react-icons/md";
import avatar from "../../assets/images/avatar/avatar.jpg";
function MessItem({ id, avt, name, outside }) {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     console.log(id);
    // }, []);
    return (
        <div className=" relative group ">
            <Button
                _className={`absolute right-[-5px] top-[-5px] w-[20px] flex justify-center items-center h-[20px] bg-white rounded-full 
                    invisible opacity-0  hover:bg-slate-300 group-hover:visible group-hover:opacity-100`}
                onClick={() => !outside && dispatch(removeMess(id))}
            >
                <MdOutlineClose />
            </Button>
            {!outside && (
                <div
                    className=" absolute right-[100%] bottom-0 flex justify-center items-end 
                invisible opacity-0 group-hover:visible group-hover:opacity-100"
                >
                    <span className="min-w-[150px] w-max h-full p-3 rounded-lg drop-shadow-custom1 font-semibold bg-white ">
                        {name + id}
                    </span>
                    <span className="w-0 h-0 mb-3 border-l-[15px] border-y-[10px] border-b-transparent border-t-transparent border-l-white drop-shadow-custom2 z-50"></span>
                </div>
            )}
            <img
                className="w-[50px] h-[50px] rounded-full shadow-xl cursor-pointer animate-growUp"
                src={avatar}
                alt=""
                onClick={() => !outside && dispatch(addMess(id, avt, name))}
            />
        </div>
    );
}

export default MessItem;
