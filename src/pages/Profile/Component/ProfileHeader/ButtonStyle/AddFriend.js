import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../../../Socket";
import friendsApi from "../../../../../api/friendsApi";
import LoadingCircleLine from "../../../../../Components/LoadingCircleLine";
import Button from "../../../../../Components/Button";
import CancelRequest from "./CancelRequest";
import { FaUserPlus } from "react-icons/fa";
function AddFriend({
    loading,
    setLoading = () => {},
    setButtonStyle = () => {},
    setButtonData = () => {},
}) {
    const { userId } = useParams();
    const user = useSelector((state) => state.user);
    const socketContext = useContext(SocketContext);
    const addFriend = async (senderId, receiverId) => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("senderId", senderId);
            params.append("receiverId", receiverId);
            const res = await friendsApi.addFriend(params);
            if (res.success) {
                const senData = {
                    id: res.data.id,
                    type: "notification",
                    typeNoti: "friendRequest",
                    receiverId: userId,
                    senderId: user.userId,
                    senderName: `${user.fName} ${user.lName}`,
                    senderAvt: user.avatar,
                    senderSx: user.sx,
                    time: res.data.time,
                };
                socketContext.send(JSON.stringify(senData));
                setButtonData(res.data);
                setButtonStyle({ Comp: CancelRequest });
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Button
            _className={`flex justify-center md:justify-start items-center p-2 px-3 mb-2 mx-2 text-white 
                bg-blue-500 rounded-md md:mx-0 md:mb-0 md:mr-2 md:mx-2 mt-5 md:mt-0 hover:bg-blue-600`}
            cursorDefault={loading}
            onClick={() => !loading && addFriend(user.userId, userId)}
        >
            {loading ? (
                <span className="block h-[20px] w-[20px] ">
                    <LoadingCircleLine />
                </span>
            ) : (
                <FaUserPlus />
            )}
            <span className=" whitespace-nowrap ml-2 font-semibold">
                Thêm bạn bè
            </span>
        </Button>
    );
}

export default AddFriend;
