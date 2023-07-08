import { useState, createContext } from "react";
const PostsContext = createContext();
function PostsProvider({ children }) {
    const [text, setText] = useState("");
    const [fileList, setFileList] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [taggedFriends, setTaggedFriends] = useState([]);
    const addFile = (e) => {
        const id = new Date().getTime();
        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setFileList([...fileList, { id, type: file.type, url: fileUrl }]);
    };
    const changeFile = (id, file) => {
        if (!file) {
            return;
        }
        const fileId = fileList.findIndex((item) => item.id === id);
        URL.revokeObjectURL(fileList[fileId].url);
        const fileUrl = URL.createObjectURL(file);
        fileList[fileId].url = fileUrl;
        fileList[fileId].type = file.type;
        setFriendsList([...fileList]);
    };
    const deleteFile = (id) => {
        if (!id) {
            return;
        }

        const newArray = fileList.filter((item) => item.id !== id);
        setFileList(newArray);
    };
    const addTag = (user) => {
        const newArray = taggedFriends.map((item) => item.id);
        const check = newArray.includes(user.id);
        if (!check) {
            setTaggedFriends([...taggedFriends, user]);
            const newArray = friendsList.filter((item) => item.id !== user.id);
            setFriendsList(newArray);
        }
    };
    const deleteTag = (user) => {
        const newArray = taggedFriends.filter((item) => {
            return item.id !== user.id;
        });
        setTaggedFriends(newArray);
        setFriendsList([...friendsList, user]);
    };
    const valueContext = {
        text,
        setText,
        fileList,
        setFileList,
        addFile,
        changeFile,
        deleteFile,
        friendsList,
        setFriendsList,
        taggedFriends,
        setTaggedFriends,
        addTag,
        deleteTag,
    };

    return (
        <PostsContext.Provider value={valueContext}>
            {children}
        </PostsContext.Provider>
    );
}

export { PostsProvider, PostsContext };
