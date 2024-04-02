import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../../Socket";
import notificationApi from "../../../../api/notificationApi";
import SkeletonLoading from "../../../SkeletonLoading";
import NotifyItem from "../NotifyItem";
import FriendRequestList from "./FriendRequestList";
import { json } from "react-router-dom";
function AllNotifications({
    closeModal = () => {},
    callApi,
    setCallApi = () => {},
    loading,
    setLoading = () => {},
}) {
    const socketContext = useContext(SocketContext);
    const user = useSelector((state) => state.user);
    const [notificationList, setNotificationList] = useState([]);
    const [payload, setPayload] = useState({ limit: 8, page: 1, number: 0 });
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const count = async () => {
            try {
                setLoading(true);
                callApi && setCallApi(false);
                const res = await notificationApi.count({
                    userId: user.userId,
                });
                if (res.success && res.count > 0) {
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    setCallApi(true);
                }
                if (res.count <= 0) {
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        user?.userId && count();
    }, []);
    useEffect(() => {
        const getNotification = async () => {
            try {
                setLoading(true);
                const params = { userId: user.userId, ...payload };
                const res = await notificationApi.get(params);

                if (res[0]?.id) {
                    setNotificationList([...notificationList, ...res]);
                    setPayload({ ...payload, page: payload.page + 1 });
                }
                setCallApi(false);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        if (callApi && payload.page <= totalPage && user?.userId)
            getNotification();
    }, [callApi]);

    useEffect(() => {
        const handleOnMessage = (e) => {
            const data = JSON.parse(e.data);
            data.type === "notification" &&
                data.typeNoti !== "friendRequest" &&
                setPayload((prev) => {
                    return { ...prev, number: prev.number + 1 };
                });
        };
        socketContext &&
            socketContext.addEventListener("message", handleOnMessage);
        return () =>
            socketContext &&
            socketContext.removeEventListener("message", handleOnMessage);
    }, [socketContext]);
    return (
        <div className="">
            {notificationList.length > 0 && (
                <div className="px-1">
                    <span className=" text-[16px] font-medium">Gần nhất</span>
                </div>
            )}
            {notificationList.length > 0 && (
                <NotifyItem
                    data={notificationList[0]}
                    closeModal={closeModal}
                />
            )}
            <FriendRequestList closeModal={closeModal} />
            {notificationList.length > 1 && (
                <>
                    <div className="px-1">
                        <span className=" text-[16px] font-medium">
                            Trước đó
                        </span>
                    </div>
                    <div className="">
                        {notificationList.map(
                            (item, index) =>
                                index > 0 && (
                                    <NotifyItem
                                        key={item.id}
                                        data={item}
                                        closeModal={closeModal}
                                    />
                                )
                        )}
                    </div>
                </>
            )}
            {notificationList.length === 0 && (
                <div className="w-full text-center">
                    <span className="text-[15px] text-gray-500">
                        không có thông báo mới
                    </span>
                </div>
            )}
            {loading &&
                Array(2)
                    .fill(0)
                    .map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center w-full h-14 mb-2"
                        >
                            <div className="h-14 w-14 mr-4">
                                <SkeletonLoading circle={true} />
                            </div>
                            <div className="flex-1 h-[15px]">
                                <SkeletonLoading />
                            </div>
                        </div>
                    ))}
        </div>
    );
}

export default AllNotifications;
