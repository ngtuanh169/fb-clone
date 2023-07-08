import Item from "./Item";
import avatar from "../../../../../../assets/images/avatar/avatar.jpg";
function LayoutBottom() {
    const userList = [
        {
            id: 1,
            avatar,
            name: "Nguyễn Tú Anh",
            requestTime: 1686916069335,
            friends: 231,
            groups: 23,
            joinTimeFacebok: 1671894600425,
            address: "Hà Nội",
        },
        {
            id: 2,
            avatar,
            name: "Lê Anh Tuấn",
            requestTime: 1686916069335,
            friends: 23331,
            groups: 243,
            joinTimeFacebok: 1671894600425,
            address: "Ninh Bình",
        },
        {
            id: 3,
            avatar,
            name: "Nguyễn Văn Đức",
            requestTime: 1686916069335,
            friends: 3442231,
            groups: 2223,
            joinTimeFacebok: 1671894600425,
            address: "Nghệ Anh",
        },
        {
            id: 4,
            avatar,
            name: "Nguyễn Tú Anh",
            requestTime: 1686916069335,
            friends: 2323,
            groups: 23,
            joinTimeFacebok: 1671894600425,
            address: "Hà Nội",
        },
    ];
    return (
        <div className="flex flex-col items-center w-full ">
            {userList.length > 0 &&
                userList.map((item) => <Item key={item.id} data={item} />)}
        </div>
    );
}

export default LayoutBottom;
