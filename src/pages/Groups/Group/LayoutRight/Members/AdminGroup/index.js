import { useState } from "react";
import Member from "../Member";
import avt from "../../../../../../assets/images/avatar/avatar.jpg";
import Button from "../../../../../../Components/Button";
function AdminGroup() {
    const list = [
        {
            id: 1,
            name: "Nguyen Tu Anh",
            avt,
            address: "Hà Nội",
            isFriend: true,
        },
        {
            id: 2,
            name: "Nguyen Văn Bằng",
            avt,
            address: "Hải phòng",
            isFriend: false,
        },
        {
            id: 3,
            name: "Tạ Đình Nam",
            avt,
            address: "Thái Bình",
            isFriend: false,
        },
        {
            id: 4,
            name: "Nguyen Tu Anh",
            avt,
            address: "Nha Trang",
            isFriend: true,
        },
        {
            id: 5,
            name: "Nguyen Tu Anh",
            avt,
            address: "Thanh Hóa",
            isFriend: false,
        },
        {
            id: 6,
            name: "Nguyen Tu Anh",
            avt,
            address: "Thanh Hóa",
            isFriend: false,
        },
        {
            id: 7,
            name: "Nguyen Tu Anh",
            avt,
            address: "Thanh Hóa",
            isFriend: false,
        },
    ];
    const [maxLength, setMaxLength] = useState(3);
    const [userList, setUserList] = useState(list);

    return (
        <div className="flex flex-col py-4 border-b">
            <div className="w-full">
                <span className=" font-medium">
                    Quản trị viên & người kiểm duyệt
                </span>
                <span className=" px-1 font-medium">·</span>
                <span>{userList.length}</span>
            </div>
            {userList.length > 0 &&
                userList.map(
                    (item, index) =>
                        index < maxLength && (
                            <Member
                                key={item.id}
                                id={item.id}
                                avt={item.avt}
                                name={item.name}
                                admin={true}
                                address={item.address}
                                isFriend={item.isFriend}
                            />
                        )
                )}
            <div className="mt-3 ">
                {maxLength < list.length && (
                    <Button
                        _className={
                            "w-full p-2 text-center rounded-md bg-gray-200 hover:bg-gray-300"
                        }
                        onClick={() => setMaxLength(maxLength + 3)}
                    >
                        <span className=" font-medium">Xem thêm</span>
                    </Button>
                )}
            </div>
        </div>
    );
}

export default AdminGroup;
