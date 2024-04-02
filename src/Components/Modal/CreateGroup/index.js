import { useState, useEffect, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import useForm from "../../../Hooks/useForm";
import { useClickOutSide } from "../../../Hooks/useClickOutSide";
import groupApi from "../../../api/groupApi";
import { SocketContext } from "../../../Socket";
import MainCard from "../../MainCard";
import Modal from "../";
import Button from "../../Button";
import LoadingCircleLine from "../../LoadingCircleLine";
import Privacy from "./Privacy";
import TagFriend from "../../TagFriend";
import ModalAddFriends from "./ModalAddFriends";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
function CreateGroup({ closeModal = () => {} }) {
    const validates = [
        {
            name: "name",
            rules: { isRequired: true, isMinLength: 4, isMaxLength: 255 },
        },
    ];
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const socketContext = useContext(SocketContext);
    const divRef = useRef();
    const [formValues, setFormValues] = useState({
        name: "",
        status: 0,
        addFriends: [],
    });
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    useClickOutSide(divRef, () => setShowModal(false));
    useEffect(() => {
        const createGroup = async () => {
            try {
                setLoading(true);
                const params = new FormData();
                params.append("userId", user.userId);
                params.append("name", formValues.name);
                params.append("status", formValues.status);
                params.append(
                    "addFriends",
                    JSON.stringify(formValues.addFriends)
                );
                const res = await groupApi.create(params);
                if (res.success) {
                    if (res.data.sendUsersList.length > 0) {
                        const sendData = {
                            senderId: user.userId,
                            senderName: `${user.fName} ${user.lName}`,
                            senderAvt: user.avatar,
                            senderSx: user.sx,
                            receiverId: res.data.sendUsersList,
                            type: res.data.type,
                            typeNoti: res.data.typeNoti,
                            content: res.data.content,
                            groupId: res.data.groupId,
                            groupName: formValues.name,
                            time: res.data.time,
                        };
                        socketContext &&
                            socketContext.send(JSON.stringify(sendData));
                    }
                    navigate(`/group/${res.data.groupId}`);
                }
            } catch (error) {
                console.log(error);
            }
        };
        submit && !loading && createGroup();
    }, [submit]);
    const handleOnChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = async () => {
        setSubmit(true);
    };
    const { invalid, errors, removeError, formSubmit } = useForm(
        validates,
        handleSubmit
    );
    const deleteFriend = (id) => {
        const arr = formValues.addFriends.filter((item) => item.id !== id);
        setFormValues({ ...formValues, addFriends: arr });
    };
    return (
        <Modal closeModal={closeModal}>
            <div className="w-[370px] sm:w-[500px]  m-auto">
                <MainCard>
                    <div className=" relative w-full px-4 pt-4 pb-2 text-center border-b">
                        <span className=" text-[18px] font-semibold">
                            Tạo nhóm
                        </span>
                        <div className="absolute top-[10px] right-[10px] h-full">
                            <Button
                                _className={
                                    " h-9 w-9 my-auto rounded-full bg-gray-200 hover:bg-gray-300 "
                                }
                                onClick={closeModal}
                            >
                                <CgClose className="m-auto text-[22px]" />
                            </Button>
                        </div>
                    </div>
                    <div className=" flex flex-col w-full px-4 py-2">
                        <div className="">
                            <span className=" font-medium">Tên nhóm</span>
                        </div>
                        <div className="mt-2">
                            <textarea
                                className={`w-full p-2 outline-none border ${
                                    errors.name ? "border-red-500" : ""
                                } rounded-md `}
                                rows="2"
                                value={formValues.name}
                                onChange={(e) => {
                                    handleOnChange("name", e.target.value);
                                    removeError("name");
                                }}
                                onBlur={(e) => invalid("name", e.target.value)}
                            ></textarea>
                        </div>
                        <p className="text-[13px] text-red-500">
                            {errors.name && errors.name}
                        </p>
                    </div>
                    <div className=" w-full px-4 py-2">
                        <div className=" flex flex-col w-full">
                            <div className="">
                                <span className=" font-medium">
                                    Chọn quyền riêng tư
                                </span>
                            </div>
                            <Privacy
                                formValues={formValues}
                                setFormValues={setFormValues}
                            />
                        </div>
                    </div>
                    <div className=" flex flex-col w-full px-4 pt-2 pb-4">
                        <div className="flex mb-2">
                            <span className=" font-medium">Mời bạn bè</span>
                            <span className=" font-light ml-1">
                                (không bắt buộc)
                            </span>
                        </div>
                        <div
                            ref={divRef}
                            className=" relative flex flex-col w-full rounded-md border"
                        >
                            <div className="flex flex-wrap gap-1 w-full px-2 pt-1">
                                {formValues.addFriends.length > 0 &&
                                    formValues.addFriends.map((item) => (
                                        <TagFriend
                                            key={item.id}
                                            id={item.id}
                                            name={item.userName}
                                            onClick={() =>
                                                deleteFriend(item.id)
                                            }
                                        />
                                    ))}
                            </div>
                            <div className="w-full">
                                <input
                                    className="w-full p-2 outline-none rounded-md "
                                    type="text"
                                    placeholder="Nhập tên bạn bè"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    onFocus={() => setShowModal(true)}
                                />
                            </div>
                            {showModal && (
                                <ModalAddFriends
                                    text={text}
                                    formValues={formValues}
                                    setFormValues={setFormValues}
                                />
                            )}
                        </div>
                    </div>
                    <div className=" flex flex-col w-full px-4 pt-2 pb-4">
                        <Button
                            _className={
                                "flex items-center justify-center w-full h-10 bg-blue-500 rounded-md hover:bg-blue-600"
                            }
                            cursorDefault={loading}
                            onClick={() => !loading && formSubmit(formValues)}
                        >
                            {loading && (
                                <span className="block h-5 w-5 mr-1">
                                    <LoadingCircleLine />
                                </span>
                            )}
                            <span className=" font-medium text-white">
                                Tạo nhóm
                            </span>
                        </Button>
                    </div>
                </MainCard>
            </div>
        </Modal>
    );
}

export default CreateGroup;
