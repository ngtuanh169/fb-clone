import { useEffect, useRef, useState, useContext } from "react";
import { useSelector } from "react-redux";
import messageApi from "../../../api/messageApi";
import conversationsApi from "../../../api/conversationsApi";
import Button from "../../Button";
import Video from "../../Video";
import { SocketContext } from "../../../Socket";
import { MdInsertEmoticon } from "react-icons/md";
import { IoMdClose, IoIosSend } from "react-icons/io";
import { BsImage, BsPlayCircle } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
function SendMess({
    onFocus,
    active,
    data = {},
    textMessList = [],
    setTextMessList = () => {},
}) {
    const initValue = { images: [], text: "" };
    const user = useSelector((state) => state.user);
    const socketContext = useContext(SocketContext);
    const inputRef = useRef();
    const [showFull, setShowFull] = useState(false);
    const [formValues, setFormValues] = useState(initValue);

    useEffect(() => {
        inputRef.current && inputRef.current.focus();
    }, [data.conversationsId]);

    useEffect(() => {
        if (formValues.text || formValues.images.length > 0) {
            setShowFull(true);
        } else {
            setShowFull(false);
        }
    }, [formValues]);

    const changeValues = (name, value) => {
        if (name === "file" && value) {
            const type = value.type.split("/")[0];
            const id = new Date().getTime();
            const url =
                type === "image" || type === "video"
                    ? URL.createObjectURL(value)
                    : "";
            url &&
                setFormValues({
                    ...formValues,
                    images: [
                        ...formValues.images,
                        { id, url, file: value, type: value.type },
                    ],
                });
        }
        if (name === "text") {
            setFormValues({ ...formValues, [name]: value });
        }
    };
    const deleteImage = (data) => {
        const newArray = formValues.images.filter(
            (item) => item.id !== data.id
        );
        URL.revokeObjectURL(data.url);
        setFormValues({ ...formValues, images: newArray });
    };
    const changeSendingMess = (dataMess) => {
        setTextMessList((prev) =>
            prev.map((item) =>
                item.timeId == dataMess.timeId
                    ? { ...dataMess, sending: false, status: true }
                    : { ...item }
            )
        );
    };
    const handleSubmit = async () => {
        try {
            const timeId = new Date().getTime();
            const mess = {
                senderId: user.userId,
                receiverId: data.othersId,
                conversationsId: data.conversationsId,
                message: { text: formValues.text, image: [] },
                sending: true,
                timeId,
            };
            setTextMessList((prev) => [mess, ...prev]);
            setFormValues(initValue);
            const params = new FormData();
            params.append("timeId", timeId);
            params.append("senderId", user.userId);
            params.append("receiverId", data.othersId);
            params.append("conversationsId", data.conversationsId);
            params.append("text", formValues.text);
            if (formValues.images) {
                for (let i = 0; i < formValues.images.length; i++) {
                    params.append("images[]", formValues.images[i].file);
                }
            }
            const res = await messageApi.addMessage(params);
            if (!res.error) {
                changeSendingMess(res.data);
                const formData = {
                    type: res.type,
                    id: res.data.id,
                    senderId: res.data.senderId,
                    receiverId: res.data.receiverId,
                    conversationsId: res.data.conversationId,
                    message: res.data.message,
                    createdAt: res.data.createdAt,
                };
                socketContext && socketContext.send(JSON.stringify(formData));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleWatched = async () => {
        try {
            const params = new FormData();
            params.append("userId", user.userId);
            params.append("conversationsId", data.conversationsId);
            const mesRes = await messageApi.updateWatched(params);
            // const conversationsRes = await conversationsApi.unwatched()
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex items-end w-full px-2 py-4 bg-white z-40 ">
            <div
                className={` flex justify-between w-max ${
                    active ? "text-blue-600" : "text-slate-400"
                } text-[22px]`}
            >
                <Button
                    _className={`${
                        formValues.images.length > 0 || formValues.text
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
                    {formValues.images.length > 0 && (
                        <div className="flex w-[200px] p-2 pb-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full">
                            <div className="flex w-max ">
                                {formValues.images.map((item, index) => {
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
                                onFocus(true);
                                handleWatched();
                            }}
                            onBlur={() => onFocus(false)}
                            onKeyDown={(e) =>
                                e.keyCode === 13 && handleSubmit()
                            }
                        />
                        <Button
                            _className={"cursor-not-allowed"}
                            // hoverText={"Chọn biểu tượng cảm xúc"}
                            // classHoverText="left-[-60px]"
                        >
                            <span
                                className={`text-[20px] ${
                                    active ? "text-blue-600" : "text-slate-400"
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
                        onClick={() => formValues.text && handleSubmit()}
                    >
                        <IoIosSend className=" rotate-45 text-[22px] text-blue-500" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SendMess;
