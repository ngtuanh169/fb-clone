import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeMess } from "../../../redux/actions/openMessList";
import { formatAvatar, formatTimestamp } from "../../../Hooks/useFormat";
import userApi from "../../../api/userApi";
import SkeletonLoading from "../../SkeletonLoading";
import Button from "../../Button";
import { FaPhoneAlt } from "react-icons/fa";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
function MessItemTool({ data, active }) {
    const dispatch = useDispatch();
    // const [isLogin, setIsLogin] = useState(false);
    const [dataUser, setDataUser] = useState({});
    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await userApi.getInfo({ userId: data.othersId });
                res[0].status === "success" && setDataUser(res[0]);
            } catch (error) {
                console.log(error);
            }
        };
        data.othersId && getInfo();
    }, [data.othersId]);
    return (
        <div className="flex justify-between w-full p-[2px] border-b">
            <Button
                _className=" p-2 rounded-md hover:bg-hover"
                to={`/profile/${data.othersId}`}
            >
                {data.othersName ? (
                    <div className=" flex items-center w-full h-full">
                        <div className="relative w-[30px] h-[30px]">
                            <img
                                className="h-full w-full rounded-full"
                                src={formatAvatar(
                                    data.othersAvt,
                                    data.othersSx
                                )}
                                alt=""
                            />
                            {dataUser?.statusLogin === "1" && (
                                <span className=" absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col ml-2 ">
                            <span className="font-semibold line-clamp-1 ">
                                {data.othersName}
                            </span>
                            <span className="text-[12px] text-gray-500 leading-3 line-clamp-1">
                                {dataUser?.statusLogin === "1"
                                    ? "Đang hoạt động"
                                    : `Hoạt động ${formatTimestamp(
                                          dataUser.userUpdateAt
                                      )}`}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                        <SkeletonLoading />
                    </div>
                )}
            </Button>
            <div
                className={`flex items-center p-2 ${
                    active ? "text-blue-600" : "text-slate-400"
                }`}
            >
                <span className="p-[8px] rounded-full cursor-pointer hover:bg-hover">
                    <FaPhoneAlt />
                </span>
                <span className="p-[8px] rounded-full cursor-pointer hover:bg-hover">
                    <BsFillCameraVideoFill />
                </span>
                <span className="p-[8px] rounded-full cursor-pointer hover:bg-hover">
                    <AiOutlineMinus />
                </span>
                <span
                    className="p-[8px] rounded-full cursor-pointer hover:bg-hover"
                    onClick={() => dispatch(removeMess(data.id))}
                >
                    <VscChromeClose />
                </span>
            </div>
        </div>
    );
}

export default MessItemTool;
