import { useState } from "react";
import friendsApi from "../../../../../api/friendsApi";
import LoadingCircleLine from "../../../../../Components/LoadingCircleLine";
import Button from "../../../../../Components/Button";
import Confirm from "../../../../../Components/Modal/Confirm";
import AddFriend from "./AddFriend";
import { FaUserTimes } from "react-icons/fa";
function CancelRequest({
    loading,
    setLoading = () => {},
    data,
    setButtonStyle = () => {},
    setButtonData = () => {},
}) {
    const [showModal, setShowModal] = useState(false);
    const cancelRequest = async (id) => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("id", id);
            const res = await friendsApi.cancelFriendRequest(params);
            if (res.success) {
                setButtonData({});
                setButtonStyle({ Comp: AddFriend });
            } else {
                setShowModal(true);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {showModal && (
                <Confirm
                    title={
                        "Rất tiếc, chúng tôi không thể xử lý yêu cầu này ngay bây giờ"
                    }
                    text={
                        "Rất tiếc, chúng tôi không thể xử lý yêu cầu này ngay bây giờ. Vui lòng thử lại."
                    }
                    closeModal={() => setShowModal(false)}
                    confirm={() => setShowModal(false)}
                />
            )}
            <Button
                _className={`flex justify-center md:justify-start items-center p-2 px-3 mb-2 mx-2 bg-gray-200 
                rounded-md md:mx-0 md:mb-0 md:mr-2 md:mx-2 mt-5 md:mt-0 hover:bg-gray-300`}
                cursorDefault={loading}
                onClick={() => data.id && cancelRequest(data.id)}
            >
                {loading ? (
                    <span className=" block h-[20px] w-[20px] ">
                        <LoadingCircleLine />
                    </span>
                ) : (
                    <FaUserTimes />
                )}
                <span className=" whitespace-nowrap ml-2 font-semibold">
                    Hủy lời mời
                </span>
            </Button>
        </>
    );
}

export default CancelRequest;
