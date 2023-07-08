import { useParams } from "react-router-dom";
import Search from "../index";
import Item from "./Item";
import avt from "../../../assets/images/avatar/avatar.jpg";
function PeoPleSearch() {
    const { text } = useParams();
    const userList = [
        {
            id: 1,
            name: "Nguyễn Tú Anh",
            avt,
            friends: 23123,
            follower: 346278,
            address: "Hà Nội",
            isFriend: true,
        },
        {
            id: 2,
            name: "Hoàng Anh Tuấn",
            avt,
            friends: 23123,
            follower: 32,
            address: "Thanh Hóa",
            isFriend: true,
        },
        {
            id: 3,
            name: "Tạ Nam Trung",
            avt,
            friends: 32,
            follower: 234642,
            address: "Hà Nội",
            isFriend: true,
        },
        {
            id: 4,
            name: "Lâm Thái Hòa",
            avt,
            friends: 5555,
            follower: 3436278,
            address: "Hà Nội",
            isFriend: false,
        },
        {
            id: 5,
            name: "Văn Thanh Hà",
            avt,
            friends: 44342,
            follower: 4234,
            address: "Hà Nội",
            isFriend: false,
        },
        {
            id: 6,
            name: "Nguyễn Văn Hòa",
            avt,
            friends: 23123,
            follower: 346278,
            address: "Hà Nội",
            isFriend: false,
        },
        {
            id: 7,
            name: "Nguyễn Tuấn Anh",
            avt,
            friends: 23123,
            follower: 346278,
            address: "Hà Nội",
            isFriend: false,
        },
    ];
    return (
        <Search>
            <div className="flex flex-col items-center w-full mt-8">
                {userList.length > 0 &&
                    userList.map((item) => (
                        <Item
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            avt={item.avt}
                            friends={item.friends}
                            followers={item.follower}
                            address={item.address}
                            isFriend={item.isFriend}
                        />
                    ))}
            </div>
        </Search>
    );
}

export default PeoPleSearch;
