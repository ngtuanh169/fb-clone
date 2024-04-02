import { useState, useContext, useEffect } from "react";
import Button from "../Button";
import Item from "./Item";
import { SocketContext } from "../../Socket/index";
import avt from "../../assets/images/avatar/avatar.jpg";
function NewNotification({ chidren }) {
    const context = useContext(SocketContext);

    const dataFriendRequest = {
        id: 1,
        type: "friendRequest",
        userId: 231,
        userName: "Nguyen Tu Anh",
        avt,
        time: 1685716211822,
    };
    const dataLikePost = {
        id: 2,
        type: "likePost",
        userId: 231,
        userName: "Nguyen Tu Anh",
        avt,
        time: 1685716211822,
        postsId: 12,
        textPosts:
            "Tặng ngẫu nhiên 50 bạn 20 lượng , 1 bạn may mắn nhất 7tr xu",
    };
    const dataCommentPost = {
        id: 3,
        type: "commentPost",
        userId: 231,
        userName: "Nguyen Tu Anh",
        avt,
        time: 1685716211822,
        postsId: 12,
        textPosts:
            "Tặng ngẫu nhiên 50 bạn 20 lượng , 1 bạn may mắn nhất 7tr xu",
    };
    const dataCommentPostGroup = {
        id: 4,
        type: "commentPost",
        userId: 231,
        userName: "Nguyen Tu Anh",
        avt,
        time: 1685716211822,
        groupId: 123,
        groupName: "Ninja School Online Sv5 Katana",
        postsId: 12,
        textPosts:
            "Tặng ngẫu nhiên 50 bạn 20 lượng , 1 bạn may mắn nhất 7tr xu",
    };
    const dataLikePostGroup = {
        id: 5,
        type: "likePost",
        userId: 231,
        userName: "Nguyen Tu Anh",
        avt,
        time: 1685716211822,
        groupId: 123,
        groupName: "Ninja School Online Sv5 Katana",
        postsId: 12,
        textPosts:
            "Tặng ngẫu nhiên 50 bạn 20 lượng , 1 bạn may mắn nhất 7tr xu",
    };
    const dataRequestJoinGroup = {
        id: 9,
        users: [{ id: 23, name: "Tạ Hoàng Đức" }],
        avt: avt,
        time: "1680586641002",
        type: "RequestJoinGroup",
        groupId: 123,
        groupName: "Ninja School Online Sv5 Katana",
        group: true,
    };

    const [notiList, setNotiList] = useState([]);
    const addNoti = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === "notification") {
            const idNoti = new Date().getTime();
            setNotiList((prev) => [...prev, { idNoti, ...data }]);
        }
    };

    useEffect(() => {
        context && context.addEventListener("message", addNoti);
        return () => context && context.removeEventListener("message", addNoti);
    }, [context]);
    return (
        <div className=" fixed bottom-3 left-3 flex flex-col justify-end z-50">
            {notiList.length > 0 &&
                notiList.map((item, index) => {
                    if (index === 0) {
                        return (
                            <Item
                                key={item.idNoti}
                                data={item}
                                notiList={notiList}
                                setNotiList={setNotiList}
                            />
                        );
                    }
                })}
        </div>
    );
}

export default NewNotification;
