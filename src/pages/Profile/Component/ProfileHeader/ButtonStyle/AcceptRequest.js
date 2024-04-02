import { useState, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import { useClickOutSide } from "../../../../../Hooks/useClickOutSide";
import { SocketContext } from "../../../../../Socket";
import friendsApi from "../../../../../api/friendsApi";
import LoadingCircleLine from "../../../../../Components/LoadingCircleLine";
import Button from "../../../../../Components/Button";
import UnFriend from "./UnFriend";
import AddFriend from "./AddFriend";
import { FaUserCheck } from "react-icons/fa";
function AcceptRequest({
    loading,
    setLoading = () => {},
    data,
    setButtonData = () => {},
    setButtonStyle = () => {},
}) {
    const user = useSelector((state) => state.user);
    const socketContext = useContext(SocketContext);
    const divRef = useRef();
    const [showModal, setShowModal] = useState(false);
    useClickOutSide(divRef, () => setShowModal(false));
    const cancelRequest = async (id) => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("id", id);
            const res = await friendsApi.cancelFriendRequest(params);
            if (res.success) {
                setButtonData({});
                setButtonStyle({ Comp: AddFriend });
            }
            if (res.success && res?.notification) {
                const sendData = {
                    ...res.notification,
                    senderName: `${user.fName} ${user.lName}`,
                    senderAvt: user.avatar,
                    senderSx: user.sx,
                };
                socketContext && socketContext.send(JSON.stringify(sendData));
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const acceptRequest = async (id, senderId, receiverId) => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("id", id);
            params.append("senderId", senderId);
            params.append("receiverId", receiverId);
            const res = await friendsApi.acceptFriendRequest(params);
            if (res.success) {
                setButtonData({});
                setButtonStyle({ Comp: UnFriend });
            }
            if (res.success && res?.notification) {
                const sendData = {
                    ...res.notification,
                    senderName: `${user.fName} ${user.lName}`,
                    senderAvt: user.avatar,
                    senderSx: user.sx,
                };
                socketContext && socketContext.send(JSON.stringify(sendData));
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div
            ref={divRef}
            className=" relative mx-2 mt-5 md:mx-2  md:mt-0 md:mx-0 md:mb-0 md:mr-2 mb-2"
        >
            <Button
                _className={`flex justify-center md:justify-start items-center p-2   text-white 
                bg-blue-500 rounded-md  hover:bg-blue-600`}
                cursorDefault={loading}
                onClick={() => !loading && setShowModal(!showModal)}
            >
                {loading ? (
                    <span className="block h-[20px] w-[20px] ">
                        <LoadingCircleLine />
                    </span>
                ) : (
                    <FaUserCheck />
                )}
                <span className=" whitespace-nowrap ml-2 font-semibold">
                    Phản hồi
                </span>
            </Button>
            {showModal && (
                <div
                    style={{ boxShadow: "0px 1px 3px 2px #ccc" }}
                    className=" absolute top-[110%] left-0 flex flex-col w-max p-2 rounded-md bg-white z-30"
                >
                    <Button
                        _className={
                            "w-full p-2 rounded-md text-[15px] font-medium text-left hover:bg-gray-200 "
                        }
                        onClick={() =>
                            data.id &&
                            data.senderId &&
                            data.receiverId &&
                            acceptRequest(
                                data.id,
                                data.senderId,
                                data.receiverId
                            )
                        }
                    >
                        <span>Chấp nhận lời mời</span>
                    </Button>
                    <Button
                        _className={
                            "w-full p-2 rounded-md text-[15px] font-medium text-left hover:bg-gray-200 "
                        }
                        onClick={() => data.id && cancelRequest(data.id)}
                    >
                        <span>Hủy lời mời</span>
                    </Button>
                </div>
            )}
        </div>
    );
}

export default AcceptRequest;
