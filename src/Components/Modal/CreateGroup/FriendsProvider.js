import { useState, createContext } from "react";
import avt from "../../../assets/images/avatar/avatar.jpg";
const FriendsContext = createContext();
function FriendsProvider({ children }) {
    const list = [
        { id: 1, name: "Nguyễn Tú Anh", avt, address: "Hà Nội" },
        { id: 2, name: "Mai Hoàng Anh", avt, address: "Hải Phòng" },
        { id: 3, name: "Tạ Thạc Long", avt, address: "Hồ Chí Minh" },
        { id: 4, name: "Nguyễn Văn Tùng", avt, address: "Hà Nội" },
        { id: 5, name: "Tạ Thạc Lợi", avt, address: "Ninh Bình" },
        { id: 6, name: "Nguyễn Văn Hiếu", avt, address: "Hà Nội" },
        { id: 7, name: "Tạ Thạc Phú", avt, address: "Cà Mau" },
        { id: 8, name: "Phùng Văn Phú", avt, address: "Hải Phòng" },
        { id: 9, name: "Hoàng Văn Nam", avt, address: "Hà Nội" },
        { id: 10, name: "Nguyễn Văn Lập", avt, address: "Hà Nội" },
        { id: 11, name: "Văn Lập", avt, address: "Hà Nội" },
    ];
    const [friensList, setFriendsList] = useState(list);
    const [addedFriends, setAddedFriends] = useState([]);

    const handleAddFriend = (id) => {
        const newFriendsList = friensList.filter((item) => item.id !== id);
        const newAddedFriends = friensList.filter((item) => item.id == id);
        setFriendsList(newFriendsList);
        setAddedFriends([...addedFriends, ...newAddedFriends]);
    };

    const handleDeleteFriend = (id) => {
        const newAddedFriends = addedFriends.filter((item) => item.id !== id);
        const newFriendsList = addedFriends.filter((item) => item.id == id);
        setAddedFriends(newAddedFriends);
        setFriendsList([...friensList, ...newFriendsList]);
    };

    const valueContext = {
        friensList,
        addedFriends,
        setFriendsList,
        setAddedFriends,
        handleAddFriend,
        handleDeleteFriend,
    };

    return (
        <FriendsContext.Provider value={valueContext}>
            {children}
        </FriendsContext.Provider>
    );
}

export { FriendsProvider, FriendsContext };
