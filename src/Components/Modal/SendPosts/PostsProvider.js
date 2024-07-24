import { useState, createContext, useEffect } from "react";
const PostsContext = createContext();
function PostsProvider({ children }) {
    const [text, setText] = useState("");
    const [fileList, setFileList] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [taggedFriends, setTaggedFriends] = useState([]);
    const [status, setStatus] = useState(0);

    const addFile = (e) => {
        const isRequired = ["image", "video"];
        const file = e.target.files[0];
        const type = file.type.split("/");
        const check = isRequired.findIndex((item) => item === type[0]);
        if (check < 0) {
            return;
        }
        const id = new Date().getTime();
        const fileUrl = URL.createObjectURL(file);
        setFileList([...fileList, { id, type: file.type, url: fileUrl, file }]);
    };

    const changeFile = (id, file) => {
        if (!file) {
            return;
        }
        const isRequired = ["image", "video"];
        const type = file.type.split("/");
        const check = isRequired.findIndex((item) => item === type[0]);
        if (check < 0) {
            return;
        }
        const fileId = fileList.findIndex((item) => item.id === id);
        URL.revokeObjectURL(fileList[fileId].url);
        const fileUrl = URL.createObjectURL(file);
        fileList[fileId].url = fileUrl;
        fileList[fileId].type = file.type;
        fileList[fileId].file = file;
        setFriendsList([...fileList]);
    };
    const deleteFile = (id) => {
        if (!id) {
            return;
        }

        const newArray = fileList.filter((item) => item.id !== id);
        setFileList(newArray);
    };

    const addTag = (data = {}) => {
        const newArray = taggedFriends.map((item) => item.id);
        const check = newArray.includes(data.id);
        if (!check) {
            setTaggedFriends([...taggedFriends, data]);
        }
    };

    const deleteTag = (data = {}) => {
        const newArray = taggedFriends.filter((item) => {
            return item.id !== data.id;
        });
        setTaggedFriends(newArray);
    };

    const valueContext = {
        status,
        setStatus,
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
