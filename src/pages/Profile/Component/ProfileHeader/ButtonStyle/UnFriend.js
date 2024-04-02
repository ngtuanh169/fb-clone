import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useClickOutSide } from "../../../../../Hooks/useClickOutSide";
import friendsApi from "../../../../../api/friendsApi";
import LoadingCircleLine from "../../../../../Components/LoadingCircleLine";
import Button from "../../../../../Components/Button";
import Confirm from "../../../../../Components/Modal/Confirm";
import AddFriend from "./AddFriend";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";
function UnFriend({
    loading,
    userData = {},
    setLoading = () => {},
    setButtonStyle = () => {},
}) {
    const { userId } = useParams();
    const user = useSelector((state) => state.user);
    const divRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    useClickOutSide(divRef, () => setShowModal(false));
    const unFriend = async (userId, othersId) => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("userId", userId);
            params.append("othersId", othersId);
            const res = await friendsApi.unfriend(params);
            if (res.success) {
                setButtonStyle({ Comp: AddFriend });
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {showConfirm && userData?.id && (
                <Confirm
                    title={`Hủy kết bạn với ${userData.name} `}
                    text={`Bạn có chắc hủy kết bạn với ${userData.name} không?`}
                    closeModal={() => setShowConfirm(false)}
                    confirm={() => {
                        unFriend(user.userId, userId);
                        setShowConfirm(false);
                    }}
                />
            )}
            <div
                ref={divRef}
                className=" relative mb-2 mx-2 md:mx-0 md:mb-0 md:mr-2 md:mx-2 mt-5 md:mt-0 z-30"
            >
                <Button
                    _className={`flex justify-center md:justify-start items-center p-2 px-3 text-white 
                bg-blue-500 rounded-md  hover:bg-blue-600`}
                    cursorDefault={loading}
                    onClick={() => setShowModal(!showModal)}
                >
                    {loading ? (
                        <span className="block h-[20px] w-[20px] ">
                            <LoadingCircleLine />
                        </span>
                    ) : (
                        <FaUserCheck />
                    )}
                    <span className=" whitespace-nowrap ml-2 font-semibold">
                        Bạn bè
                    </span>
                </Button>
                {showModal && (
                    <div
                        style={{ boxShadow: "0px 1px 3px 2px #ccc" }}
                        className=" absolute top-[110%] left-0 flex flex-col w-[180px] p-2 rounded-md bg-white z-30"
                    >
                        <Button
                            _className={
                                "flex items-center w-full p-2 rounded-md text-[15px] font-medium text-left hover:bg-gray-200 "
                            }
                            onClick={() => setShowConfirm(true)}
                        >
                            <FaUserTimes className="mr-1 text-[18px]" />
                            <span>Huỷ kết bạn</span>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}

export default UnFriend;
