import { useState } from "react";
import Member from "../Member";
import avt from "../../../../../../assets/images/avatar/avatar.jpg";
function NewJoinGroup() {
    const list = [
        {
            id: 1,
            name: "Nguyen Tu Anh",
            avt,
            address: "Hà Nội",
            isFriend: true,
            time: 1681308887127,
        },
        {
            id: 2,
            name: "Nguyen Văn Bằng",
            avt,
            address: "Hải phòng",
            isFriend: false,
            time: 1681308887127,
        },
        {
            id: 3,
            name: "Tạ Đình Nam",
            avt,
            address: "Thái Bình",
            isFriend: false,
            time: 1681308887127,
        },
        {
            id: 4,
            name: "Nguyen Tu Anh",
            avt,
            address: "Nha Trang",
            isFriend: true,
            time: 1681308887127,
        },
        {
            id: 5,
            name: "Nguyen Tu Anh",
            avt,
            address: "Thanh Hóa",
            isFriend: false,
            time: 1681308887127,
        },
        {
            id: 6,
            name: "Nguyen Tu Anh",
            avt,
            address: "Thanh Hóa",
            isFriend: false,
            time: 1681308887127,
        },
        {
            id: 7,
            name: "Nguyen Tu Anh",
            avt,
            address: "Thanh Hóa",
            isFriend: true,
            time: 1681308887127,
        },
    ];
    const [userList, setUserList] = useState(list);
    return (
        <div className="flex flex-col py-4 ">
            <div className="w-full">
                <span className=" font-medium">Mới vào nhóm</span>
                <span className=" px-1 font-medium">·</span>
                <span>{userList.length}</span>
            </div>
            {userList.length > 0 &&
                userList.map((item) => (
                    <Member
                        key={item.id}
                        id={item.id}
                        avt={item.avt}
                        name={item.name}
                        address={item.address}
                        isFriend={item.isFriend}
                        time={item.time}
                    />
                ))}
        </div>
    );
}

export default NewJoinGroup;
