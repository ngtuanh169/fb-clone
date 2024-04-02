import { useState, useEffect, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import { ValueContext } from "./index";
import { formatAvatar } from "../../Hooks/useFormat";
import { SocketContext } from "../../Socket";
import commentApi from "../../api/commentApi";
import Video from "../Video";
import LoadingCircleLine from "../LoadingCircleLine";
import Button from "../Button";
import { BsCamera, BsPlayCircle } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
function PostInput({
    isFocus = false,
    setIsFocus = () => {},
    parentId = 0,
    commentsList = [],
    setCommentsList = () => {},
}) {
    const initValues = {
        text: "",
        parentId,
        file: {},
    };
    const user = useSelector((state) => state.user);
    const socketContext = useContext(SocketContext);
    const { pagePhoto, postsData, setPostsData } = useContext(ValueContext);
    const inputRef = useRef();
    const [formValues, setFormValues] = useState(initValues);
    const [file, setFile] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        isFocus && inputRef.current && inputRef.current.focus();
    }, [isFocus]);

    const handleAddFile = (file) => {
        if (!file) {
            return;
        }
        const type = file.type.split("/")[0];
        if (type !== "image" && type !== "video") {
            return;
        }
        const fileUrl = URL.createObjectURL(file);
        setFile({ fileUrl, type });
        setFormValues({ ...formValues, file });
    };

    const deleteFile = () => {
        URL.revokeObjectURL(file.fileUrl);
        setFile({});
        setFormValues({ ...formValues, file: {} });
    };

    const addComment = async (formValues) => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("postsId", postsData.id);
            params.append("parentId", formValues.parentId);
            params.append("file", formValues.file);
            params.append("text", formValues.text);
            const res = await commentApi.add(params);
            if (res.success && res?.data) {
                setFormValues(initValues);
                setFile({});
                setPostsData({
                    ...postsData,
                    countComments: postsData.countComments + 1,
                });
                setCommentsList([...commentsList, { ...res.data, fake: true }]);
            }
            if (res.success && user.userId !== postsData.userId) {
                const sendData = {
                    ...res.noti,
                    senderId: user.userId,
                    senderName: `${user.fName} ${user.lName}`,
                    senderAvt: user.avatar,
                    senderSx: user.sx,
                };
                socketContext && socketContext.send(JSON.stringify(sendData));
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-full flex ">
            <div className="w-max">
                <img
                    style={{
                        width: pagePhoto ? "32px" : "40px",
                        height: pagePhoto ? "32px" : "40px",
                    }}
                    className="rounded-full mr-2 border "
                    src={formatAvatar(user.avatar, user.sx)}
                    alt=""
                />
            </div>
            <div className=" flex-1 flex flex-col">
                <div className="flex flex-col w-full rounded-xl py-2 px-4 bg-slate-100">
                    <div className="w-full">
                        <input
                            ref={inputRef}
                            style={{ opacity: loading ? ".6" : "" }}
                            className=" w-full bg-transparent outline-none"
                            type="text"
                            placeholder="Viết câu trả lời..."
                            value={formValues.text}
                            onChange={(e) =>
                                !loading &&
                                setFormValues({
                                    ...formValues,
                                    text: e.target.value,
                                })
                            }
                            onBlur={() => setIsFocus(false)}
                            onKeyDown={(e) =>
                                e.keyCode === 13 &&
                                !loading &&
                                addComment(formValues)
                            }
                        />
                    </div>
                    <div className="flex justify-between w-full mt-2">
                        <div className="flex items-center">
                            <label
                                htmlFor="addFile"
                                className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-gray-200"
                            >
                                <BsCamera className="text-[20px] text-gray-500" />
                            </label>
                            <input
                                className="h-0 w-0 outline-none bg-transparent"
                                type="file"
                                id="addFile"
                                onChange={(e) =>
                                    !loading && handleAddFile(e.target.files[0])
                                }
                            />
                        </div>
                        <div className="flex items-center">
                            <Button
                                _className={
                                    "flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-200"
                                }
                                cursorDefault={
                                    (!formValues.text &&
                                        !formValues.file.name) ||
                                    loading
                                }
                                onClick={() =>
                                    (formValues.text || formValues.file.name) &&
                                    !loading &&
                                    addComment(formValues)
                                }
                            >
                                {loading ? (
                                    <span className=" block w-5 h-5 ">
                                        <LoadingCircleLine />
                                    </span>
                                ) : (
                                    <IoIosSend className=" rotate-45 text-[20px] text-blue-500" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
                {file.fileUrl && (
                    <div className="relative w-full my-2">
                        <Button
                            _className={
                                "absolute right-2 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300"
                            }
                            onClick={!loading && deleteFile}
                        >
                            <GrClose className="text-[12px]" />
                        </Button>
                        <div
                            style={{ opacity: loading ? ".6" : "" }}
                            className=" relative w-[100px] h-[100px] rounded-xl overflow-hidden"
                        >
                            {file.type === "image" ? (
                                <img
                                    className="h-full w-full object-cover"
                                    src={file.fileUrl}
                                />
                            ) : (
                                <>
                                    <Video
                                        videoUrl={file.fileUrl}
                                        showControls={false}
                                    />
                                    <div
                                        className=" absolute top-0 left-0 flex items-center justify-center
                                                 w-full h-full bg-matteBlack2 z-10 "
                                    >
                                        <BsPlayCircle className=" text-[50px] text-white z-30" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostInput;
