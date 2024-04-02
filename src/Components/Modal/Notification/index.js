import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NotificationTop from "./NotificationTop";
import AllNotifications from "./AllNotifications";
import NotifyUnread from "./NotifyUnread";
import NotifyItem from "./NotifyItem";
import avt from "../../../assets/images/avatar/avatar.jpg";
function Notification({ closeModal = () => {} }) {
    // const friendRequestList = [
    //     {
    //         id: 2,
    //         userI: 12,
    //         userName: "Nguyen Tu Anh",
    //         avt: avt,
    //         link: "",
    //         time: "1680586641002",
    //         type: "friendRequest",
    //     },
    //     {
    //         id: 3,
    //         userI: 12,
    //         userName: "Nguyen Tu Anh",
    //         avt: avt,
    //         link: "",
    //         time: "1680586640502",
    //         type: "friendRequest",
    //     },
    //     {
    //         id: 4,
    //         userI: 12,
    //         userName: "Nguyen Tu Anh",
    //         avt: avt,
    //         link: "",
    //         time: "1680586640402",
    //         type: "friendRequest",
    //     },
    //     {
    //         id: 5,
    //         userI: 12,
    //         userName: "Nguyen Tu Anh",
    //         avt: avt,
    //         link: "",
    //         time: "1680586640202",
    //         type: "friendRequest",
    //     },
    //     {
    //         id: 6,
    //         userI: 12,
    //         userName: "Nguyen Tu Anh",
    //         avt: avt,
    //         link: "",
    //         time: "1680586640202",
    //         type: "friendRequest",
    //     },
    // ];
    // const notificationList = [
    //     {
    //         id: 2,
    //         userId: 13,
    //         userName: "Nguyen Tu Anh",
    //         avt: avt,
    //         time: "1680578105377",
    //         type: "likePost",
    //         groupId: 123,
    //         groupName: "Ninja School Online Sv5 Katana",
    //         postsId: 12,
    //         textPosts:
    //             "Tặng ngẫu nhiên 50 bạn 20 lượng , 1 bạn may mắn nhất 7tr xu",
    //     },
    //     {
    //         id: 3,
    //         userId: 313,
    //         userName: "Nguyen Tu Anh",
    //         avt: avt,
    //         time: "1680578105877",
    //         type: "commentPost",
    //         groupId: 123,
    //         groupName: "Ninja School Online Sv5 Katana",
    //         postsId: 12,
    //         textPosts:
    //             "Tặng ngẫu nhiên 50 bạn 20 lượng , 1 bạn may mắn nhất 7tr xu",
    //     },
    //     {
    //         id: 9,
    //         users: [
    //             { id: 23, name: "Tạ Hoàng Đức" },
    //             { id: 2, name: "Hoàng nhật hà" },
    //             { id: 3, name: "Lý Thành Long" },
    //         ],
    //         avt: avt,
    //         time: "1680586641002",
    //         type: "RequestJoinGroup",
    //         groupId: 123,
    //         groupName: "Ninja School Online Sv5 Katana",
    //         group: true,
    //     },
    //     {
    //         id: 4,
    //         userId: 313,
    //         userName: "Nguyen Tu Anh",
    //         avt: avt,
    //         time: "1680578106377",
    //         type: "likePost",
    //         postsId: 12,
    //     },
    //     {
    //         id: 5,
    //         userId: 313,
    //         userName: "Nguyen Tu Anh",
    //         avt: avt,
    //         link: "",
    //         time: "1680578106077",
    //         type: "commentPost",
    //         postsId: 12,
    //     },
    //     {
    //         id: 7,
    //         userId: 313,
    //         userName: "Nguyen Tu Anh",
    //         avt: avt,
    //         time: "1680586641002",
    //         type: "commentPost",
    //         group: true,
    //     },
    // ];

    // const [friendRequestList, setFriendRequestList] = useState([]);
    const navList = [
        { id: 1, name: "tất cả", Comp: AllNotifications },
        { id: 2, name: "chưa đọc", Comp: NotifyUnread },
    ];
    const divRef = useRef();
    const [currentNav, setCurrentNav] = useState(navList[0]);
    const [callApi, setCallApi] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handleOnScroll = (e) => {
            if (
                e.target.scrollHeight - 2 <
                e.target.offsetHeight + e.target.scrollTop
            ) {
                !loading && setCallApi(true);
            }
        };
        divRef.current &&
            divRef.current.addEventListener("scroll", handleOnScroll);
    }, []);
    return (
        <div
            ref={divRef}
            className="a w-[355px] max-h-[90vh] p-2 bg-white rounded-lg shadow-lg 
            scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full "
        >
            <div className="p-1">
                <NotificationTop
                    navList={navList}
                    currentNav={currentNav}
                    setCurrentNav={setCurrentNav}
                />
            </div>
            <div>
                <currentNav.Comp
                    callApi={callApi}
                    setCallApi={setCallApi}
                    closeModal={closeModal}
                    loading={loading}
                    setLoading={setLoading}
                />
            </div>
        </div>
    );
}

export default Notification;
