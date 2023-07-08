import { Link } from "react-router-dom";
import NotificationTop from "./NotificationTop";
import NotifyItem from "./NotifyItem";
import avt from "../../../assets/images/avatar/avatar.jpg";
function Notification({ closeModal = () => {} }) {
    const friendRequestList = [
        {
            id: 2,
            userI: 12,
            userName: "Nguyen Tu Anh",
            avt: avt,
            link: "",
            time: "1680586641002",
            type: "friendRequest",
        },
        {
            id: 3,
            userI: 12,
            userName: "Nguyen Tu Anh",
            avt: avt,
            link: "",
            time: "1680586640502",
            type: "friendRequest",
        },
        {
            id: 4,
            userI: 12,
            userName: "Nguyen Tu Anh",
            avt: avt,
            link: "",
            time: "1680586640402",
            type: "friendRequest",
        },
        {
            id: 5,
            userI: 12,
            userName: "Nguyen Tu Anh",
            avt: avt,
            link: "",
            time: "1680586640202",
            type: "friendRequest",
        },
        {
            id: 6,
            userI: 12,
            userName: "Nguyen Tu Anh",
            avt: avt,
            link: "",
            time: "1680586640202",
            type: "friendRequest",
        },
    ];
    const dataList = [
        {
            id: 2,
            userId: 13,
            userName: "Nguyen Tu Anh",
            avt: avt,
            time: "1680578105377",
            type: "likePost",
            groupId: 123,
            groupName: "Ninja School Online Sv5 Katana",
            postsId: 12,
            textPosts:
                "Tặng ngẫu nhiên 50 bạn 20 lượng , 1 bạn may mắn nhất 7tr xu",
        },
        {
            id: 3,
            userId: 313,
            userName: "Nguyen Tu Anh",
            avt: avt,
            time: "1680578105877",
            type: "commentPost",
            groupId: 123,
            groupName: "Ninja School Online Sv5 Katana",
            postsId: 12,
            textPosts:
                "Tặng ngẫu nhiên 50 bạn 20 lượng , 1 bạn may mắn nhất 7tr xu",
        },
        {
            id: 9,
            users: [
                { id: 23, name: "Tạ Hoàng Đức" },
                { id: 2, name: "Hoàng nhật hà" },
                { id: 3, name: "Lý Thành Long" },
            ],
            avt: avt,
            time: "1680586641002",
            type: "RequestJoinGroup",
            groupId: 123,
            groupName: "Ninja School Online Sv5 Katana",
            group: true,
        },
        {
            id: 4,
            userId: 313,
            userName: "Nguyen Tu Anh",
            avt: avt,
            time: "1680578106377",
            type: "likePost",
            postsId: 12,
        },
        {
            id: 5,
            userId: 313,
            userName: "Nguyen Tu Anh",
            avt: avt,
            link: "",
            time: "1680578106077",
            type: "commentPost",
            postsId: 12,
        },
        {
            id: 7,
            userId: 313,
            userName: "Nguyen Tu Anh",
            avt: avt,
            time: "1680586641002",
            type: "commentPost",
            group: true,
        },
    ];
    return (
        <div
            className="a w-[355px] max-h-[90vh] p-2 bg-white rounded-lg shadow-lg 
            scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full "
        >
            <div className="p-1">
                <NotificationTop />
            </div>
            <div className="">
                <div className="px-1">
                    <span className=" text-[16px] font-medium">Gần nhất</span>
                </div>
                {dataList.length > 0 && (
                    <NotifyItem data={dataList[0]} closeModal={closeModal} />
                )}
                {friendRequestList.length > 0 && (
                    <>
                        <div className="flex justify-between px-1">
                            <span className=" text-[16px] font-medium">
                                Lời mời kết bạn
                            </span>
                            {friendRequestList.length > 3 && (
                                <Link
                                    to={"/friends/request"}
                                    onClick={closeModal}
                                >
                                    <span className=" text-[16px] text-blue-500 border-x-[3px] border-blue-500 rounded-md">
                                        Xem tất cả
                                    </span>
                                </Link>
                            )}
                        </div>
                        <div className="">
                            {friendRequestList.map(
                                (item, index) =>
                                    index < 3 && (
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
                {dataList.length > 1 && (
                    <>
                        <div className="px-1">
                            <span className=" text-[16px] font-medium">
                                Trước đó
                            </span>
                        </div>
                        <div className="">
                            {dataList.map(
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
            </div>
        </div>
    );
}

export default Notification;
