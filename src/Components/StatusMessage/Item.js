import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteStatusMess } from "../../redux/actions/statusMessage";
import Button from "../Button";
import { MdError, MdOutlineClose } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
function Item({ data }) {
    const dispatch = useDispatch();
    const divRef = useRef();
    useEffect(() => {
        const timeId = setTimeout(() => {
            dispatch(deleteStatusMess(data.id));
        }, 3500);
        return () => clearTimeout(timeId);
    }, []);
    useEffect(() => {
        const timeId = setTimeout(() => {
            if (divRef.current) {
                divRef.current.classList.remove("animate-openStatusMess");
                divRef.current.classList.add("animate-closeStatusMess");
            }
        }, 3000);
        console.log(divRef.current);
        return () => clearTimeout(timeId);
    }, []);
    return (
        <div
            ref={divRef}
            style={{ boxShadow: "0px 1px 3px 2px #ccc" }}
            className=" relative flex flex-col w-[300px]  mt-2 bg-white rounded-lg overflow-hidden animate-openStatusMess"
        >
            <div className=" absolute top-2 right-2">
                <Button
                    _className={
                        "flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300"
                    }
                    onClick={() => dispatch(deleteStatusMess(data.id))}
                >
                    <MdOutlineClose className="text-[15px]" />
                </Button>
            </div>
            <div className="flex w-full px-2 pt-2">
                <span className="flex items-center">
                    {data.status === "success" ? (
                        <BsCheckCircleFill className="text-green-500 text-[20px]" />
                    ) : (
                        <MdError className="text-red-500 text-[20px]" />
                    )}
                </span>
                <span
                    className={`ml-1 font-medium ${
                        data.status === "success"
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    {data.status === "success" ? "Thàng công" : "Thất bại"}
                </span>
            </div>
            <div className="w-full min-h-[60px] px-2 pb-2 pt-2">
                <span className="text-[14px]">{data.mess}</span>
            </div>
            <div
                className={`w-full h-1 animate-statusMess ${
                    data.status === "success" ? "bg-green-500" : "bg-red-500"
                }`}
            ></div>
        </div>
    );
}

export default Item;
