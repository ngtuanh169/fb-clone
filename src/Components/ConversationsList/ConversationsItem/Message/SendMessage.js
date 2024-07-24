import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadFile } from "../../../../cloudinary";
import messageApi from "../../../../api/messageApi";
import conversationsApi from "../../../../api/conversationsApi";
import {
    addMessage,
    updateMessage,
} from "../../../../redux/actions/conversationsList";
import { delete_id } from "../../../../redux/actions/messNotification";
import { getTimestamp } from "../../../../Hooks/useGetDate";
import Button from "../../../Button";
import Video from "../../../Video";
import { SocketContext } from "../../../../Socket";
import { MdInsertEmoticon } from "react-icons/md";
import { IoMdClose, IoIosSend } from "react-icons/io";
import { BsImage, BsPlayCircle } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
function SendMessage({
    isFocus,
    setIsFocus,
    data = {},
    messageList,
    setMessageList = () => {},
    setNumber = () => {},
}) {
    const initValue = { files: [], text: "" };
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const inputRef = useRef();
    const [formValues, setFormValues] = useState(initValue);
    const [callApi, setCallApi] = useState(false);
    const [totalSize, setTotalSize] = useState(0);

    useEffect(() => {
        inputRef.current && inputRef.current.focus();
    }, [data.conversationsId]);

    useEffect(() => {
        isFocus && updateWatchedMessage();
    }, [data?.messageList]);

    const addFiles = (value) => {
        if (!value) return;
        const type = value.type.split("/")[0];
        const id = new Date().getTime();
        const url =
            type === "image" || type === "video"
                ? URL.createObjectURL(value)
                : "";
        url &&
            setFormValues({
                ...formValues,
                files: [
                    ...formValues.files,
                    { id, url, file: value, type: value.type },
                ],
            });
    };

    const changeValues = (name, value) => {
        if (name === "file" && value) addFiles(value);
        if (name === "text") {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const deleteImage = (data) => {
        const newArray = formValues.files.filter((item) => item.id !== data.id);
        URL.revokeObjectURL(data.url);
        setFormValues({ ...formValues, files: newArray });
    };

    const updateWatchedMessage = async () => {
        try {
            const params = new FormData();
            params.append("userId", user.userId);
            params.append("conversationsId", data.conversationsId);
            const res = await messageApi.updateWatched(params);
            if (!res.error) {
                dispatch(delete_id(data.conversationsId));
            }
        } catch (error) {
            console.log(error);
        }
    };

    // upload file lên cloudinary sử dụng trong hàm handleSubmit
    const handleData = async (file) => {
        const res = await uploadFile(file);
        if (!res.url) return;
        const data = {
            public_id: res.public_id,
            type: res.resource_type,
            url: res.url,
            duration: res.duration,
            frameRate: res?.video ? res.video.dar : "0",
        };
        return data;
    };

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                if (!formValues.text.trim() && formValues.files.length < 1)
                    return;
                let fileData = [];
                const createdAt = getTimestamp();
                const timeId = new Date().getTime();
                const messageData = {
                    timeId,
                    conversationId: data.conversationsId,
                    message: {
                        image: formValues.files,
                        text: formValues.text.trim(),
                    },
                    receiverId: data.othersId,
                    senderId: user.userId,
                    createdAt,
                    sending: true,
                };

                setMessageList([messageData, ...messageList]);

                setFormValues(initValue);

                if (formValues.files.length > 0) {
                    const promises = [];
                    for (const item of formValues.files) {
                        promises.push(handleData(item.file));
                    }
                    await Promise.all(promises)
                        .then((value) => (fileData = value))
                        .catch((error) => console.log(error));
                }

                const params = new FormData();
                params.append("senderId", user.userId);
                params.append("receiverId", data.othersId);
                params.append("conversationsId", data.conversationsId);
                params.append("text", formValues.text);
                params.append("files", JSON.stringify(fileData));
                params.append("createdAt", createdAt);

                const res = await messageApi.addMessage(params);

                if (!res.error) {
                    const formData = {
                        timeId,
                        id: res.data.id,
                        senderId: res.data.senderId,
                        receiverId: res.data.receiverId,
                        conversationsId: res.data.conversationId,
                        message: res.data.message,
                        files: JSON.stringify(res.data.files),
                        createdAt: res.data.createdAt,
                    };
                    setMessageList([formData, ...messageList]);
                    const sendData = {
                        type: res.type,
                        id: res.data.id,
                        senderId: res.data.senderId,
                        receiverId: res.data.receiverId,
                        conversationsId: res.data.conversationId,
                        message: res.data.message,
                        files: JSON.stringify(res.data.files),
                        createdAt: res.data.createdAt,
                    };
                    setNumber((prev) => prev + 1);
                    socket && socket.send(JSON.stringify(sendData));
                }
                setCallApi(false);
            } catch (error) {
                console.log(error);
            }
        };
        callApi && handleSubmit();
    }, [callApi]);

    return (
        <div className="flex items-end w-full px-2 py-4 bg-white z-40 ">
            <div
                className={` flex justify-between w-max ${
                    isFocus ? "text-blue-600" : "text-slate-400"
                } text-[22px]`}
            >
                <Button
                    _className={`${
                        formValues.files.length > 0 || formValues.text
                            ? "w-0 h-[38px]"
                            : " w-[22px] h-[38px]"
                    } mr-2 cursor-not-allowed overflow-hidden transition-all`}
                    // hoverText={"Mở hành động"}
                    classHoverText="left-[-35px]"
                >
                    <span className=" ">
                        <AiFillPlusCircle />
                    </span>
                </Button>
                <Button
                    _className={
                        " w-[22px] h-[38px] mr-2 z-10 hover:text-gray-400"
                    }
                    hoverText={"Thêm ảnh/video"}
                    classHoverText="left-[-30px]"
                >
                    <label
                        className="flex items-center w-full h-full cursor-pointer"
                        htmlFor="img"
                    >
                        <BsImage />
                    </label>
                    <input
                        className="h-0 w-0"
                        id="img"
                        type="file"
                        onChange={(e) =>
                            changeValues("file", e.target.files[0])
                        }
                    />
                </Button>
            </div>
            <div className="flex flex-1 justify-between items-end">
                <div className="flex flex-col justify-end w-full p-1 bg-gray-200 rounded-3xl">
                    {formValues.files.length > 0 && (
                        <div className="flex w-[200px] p-2 pb-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full">
                            <div className="flex w-max ">
                                {formValues.files.map((item, index) => {
                                    const type = item.type.split("/")[0];
                                    return (
                                        <div
                                            key={item.id}
                                            className=" relative w-12 h-12 mr-2"
                                        >
                                            {type === "image" ? (
                                                <img
                                                    className=" w-full h-full object-cover rounded-lg border "
                                                    src={item.url}
                                                    alt=""
                                                />
                                            ) : (
                                                <div className=" relative w-full h-full rounded-lg border overflow-hidden">
                                                    <Video
                                                        videoUrl={item.url}
                                                        type={item.type}
                                                        showControls={false}
                                                    />
                                                    <div
                                                        className=" absolute top-0 left-0 flex items-center justify-center
                                                            w-full h-full bg-matteBlack2  "
                                                    >
                                                        <BsPlayCircle className=" w-7 h-7 text-white" />
                                                    </div>
                                                </div>
                                            )}

                                            <Button
                                                _className={
                                                    "absolute top-[-8px] right-[-8px] flex items-center justify-center h-5 w-5 bg-white rounded-full "
                                                }
                                                onClick={() =>
                                                    deleteImage(item)
                                                }
                                            >
                                                <IoMdClose />
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="w-full flex px-2 py-1">
                        <input
                            ref={inputRef}
                            className="flex w-full outline-none bg-transparent"
                            type="text"
                            placeholder="Aa"
                            value={formValues.text}
                            onChange={(e) =>
                                changeValues("text", e.target.value)
                            }
                            onFocus={() => {
                                setIsFocus(true);
                                updateWatchedMessage();
                            }}
                            onBlur={() => setIsFocus(false)}
                            onKeyDown={(e) =>
                                e.keyCode === 13 && setCallApi(true)
                            }
                        />
                        <Button
                            _className={"cursor-not-allowed"}
                            // hoverText={"Chọn biểu tượng cảm xúc"}
                            // classHoverText="left-[-60px]"
                        >
                            <span
                                className={`text-[20px] ${
                                    isFocus ? "text-blue-600" : "text-slate-400"
                                }`}
                            >
                                <MdInsertEmoticon />
                            </span>
                        </Button>
                    </div>
                </div>
                <div className=" ml-2 pb-1">
                    <Button
                        _className={
                            "flex items-center justify-center h-[30px] w-[30px] rounded-full hover:bg-gray-200"
                        }
                        onClick={() => setCallApi(true)}
                    >
                        <IoIosSend className=" rotate-45 text-[22px] text-blue-500" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SendMessage;
