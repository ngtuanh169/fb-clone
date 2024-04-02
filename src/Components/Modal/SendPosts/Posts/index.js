import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import postsApi from "../../../../api/postsApi";
import { PostsContext } from "../PostsProvider";
import LoadingCircleLine from "../../../LoadingCircleLine";
import Title from "./Title";
import Content from "./Content";
import Status from "./Status";
import Button from "../../../Button";
import { useParams } from "react-router-dom";
function Posts({
    closeModal = () => {},
    addImg,
    setCurrentComp = () => {},
    postsList = [],
    setPostsList = () => {},
}) {
    const { groupId } = useParams();
    const user = useSelector((state) => state.user);
    const { text, fileList, taggedFriends, status } = useContext(PostsContext);
    const [active, setActive] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (text || fileList.length > 0) {
            setActive(true);
        } else {
            setActive(false);
        }
        setError("");
    }, [text, fileList]);
    const handleSubmit = async (text, fileList, taggedFriends) => {
        try {
            console.log(fileList);
            const totalSize = fileList.reduce((total, item) => {
                return total + item.file.size;
            }, 0);
            console.log(totalSize);
            if (totalSize > 50000000) {
                return setError("files không được vượt quá 70MB");
            }
            setLoading(true);
            const params = new FormData();
            params.append("userId", user.userId);
            groupId && params.append("groupId", groupId);
            params.append("content", text);
            if (fileList.length > 0) {
                fileList.forEach((item) => params.append("files[]", item.file));
            }
            if (taggedFriends.length > 0) {
                const tags = taggedFriends.map((item) => item.id);
                params.append("tags", JSON.stringify(tags));
            }
            params.append("status", status);
            const res = await postsApi.add(params);
            if (res.success && res.data) {
                setPostsList([res.data, ...postsList]);
                closeModal();
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className=" flex flex-col w-full p-3 z-10">
                <Title closeModal={closeModal} loading={loading} />
                <Status setCurrentComp={setCurrentComp} loading={loading} />
                <Content
                    addImg={addImg}
                    setCurrentComp={setCurrentComp}
                    loading={loading}
                />
                {error && (
                    <div className="w-full pt-2 text-center z-99">
                        <span className="text-red-700 font-medium">
                            {error}
                        </span>
                    </div>
                )}
                <Button
                    _className={`flex items-center justify-center w-full mt-4 p-2 bg-blue-500 rounded-md ${
                        loading ? "opacity-60" : "hover:bg-blue-600"
                    }`}
                    cursorDefault={!active || loading}
                    onClick={() =>
                        active &&
                        !loading &&
                        handleSubmit(text, fileList, taggedFriends)
                    }
                >
                    <span className=" font-semibold text-white">Đăng</span>
                </Button>
            </div>
            {loading && (
                <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-matteGray z-99">
                    <div className="w-6 h-6 mb-2 ">
                        <LoadingCircleLine color={"black"} />
                    </div>
                    <span className="text-black font-medium text-[22px] select-none">
                        Đang đăng
                    </span>
                </div>
            )}
        </>
    );
}

export default Posts;
