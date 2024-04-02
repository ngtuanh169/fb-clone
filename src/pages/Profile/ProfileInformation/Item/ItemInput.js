import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import userIntroductionApi from "../../../../api/userIntroductionApi";
import LoadingCircleLine from "../../../../Components/LoadingCircleLine";
import Button from "../../../../Components/Button";
import { BsPencil } from "react-icons/bs";
import { HiOutlinePlusSm } from "react-icons/hi";
function ItemInput({ item, introductionList, setIntroductionList = () => {} }) {
    const user = useSelector((state) => state.user);
    const { userId } = useParams();
    const [formVlues, setFormValues] = useState({
        codeId: item.codeId ? item.codeId : 0,
        codeName: item.codeName,
    });
    const [showModal, setShowModal] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const updateIntroduction = async (values) => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("userId", user.userId);
            params.append("introductionId", item.id);
            params.append("codeId", values.codeId);
            params.append("codeName", values.codeName);
            const res = await userIntroductionApi.update(params);
            if (res.success && res?.data) {
                const arr = introductionList.map((item) =>
                    item.id == res.data.id ? { ...item, ...res.data } : item
                );
                setIntroductionList(arr);
            }
            setLoading(false);
            setShowModal(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-full mb-6">
            {!showModal && (
                <div className="w-full ">
                    {item.codeName ? (
                        <div key={item.id} className="w-full ">
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <img
                                        className="h-6 w-6 opacity-50"
                                        src={item.linkIcon}
                                        alt=""
                                    />
                                    <span className=" ml-2 ">{`${item.content} ${item.codeName}`}</span>
                                </div>
                                {userId == user.userId && (
                                    <Button
                                        _className={`flex items-center justify-center h-7 w-7 rounded-full hover:bg-gray-200`}
                                        hoverText={"Chỉnh sửa"}
                                        onClick={() => setShowModal(!showModal)}
                                    >
                                        <BsPencil />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div key={item.id} className="w-full">
                            {userId == user.userId ? (
                                <Button
                                    _className={`flex decoration-blue-500 hover:underline `}
                                    onClick={() => setShowModal(true)}
                                >
                                    <span
                                        className="flex items-center justify-center h-6 w-6 rounded-full border-2 
                                        border-blue-500"
                                    >
                                        <HiOutlinePlusSm className="text-blue-500 text-[18px]" />
                                    </span>
                                    <span className="text-blue-500 ml-2 font-medium ">{`Thêm ${item.name}`}</span>
                                </Button>
                            ) : (
                                <div className="flex items-center w-full">
                                    <img
                                        className="h-6 w-6 opacity-50"
                                        src={item.linkIcon}
                                        alt=""
                                    />
                                    <span className=" ml-2 font-medium text-gray-500 ">{`Không có `}</span>
                                    <span className=" ml-1 font-medium text-gray-500 lowercase">{`${item.name}`}</span>
                                    <span className=" ml-1 font-medium text-gray-500 ">{`để hiển thị`}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
            {showModal && (
                <div className="flex w-full">
                    <div className="flex flex-col w-full">
                        <div
                            className={`w-full p-[2px] rounded-md border-2 ${
                                isFocus
                                    ? "border-blue-500"
                                    : "border-transparent"
                            }`}
                        >
                            <div className="flex flex-col w-full p-3 rounded-md border border-gray-300 hover:border-gray-500">
                                <label
                                    htmlFor={item.name}
                                    className={`text-[13px] leading-[13px] cursor-text pb-3 ${
                                        isFocus ? "text-blue-500" : ""
                                    }`}
                                >
                                    {item.name}
                                </label>
                                <input
                                    className=" outline-none"
                                    id={item.name}
                                    type="text"
                                    value={
                                        formVlues.codeName
                                            ? formVlues.codeName
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formVlues,
                                            codeName: e.target.value,
                                        })
                                    }
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <Button
                                _className={` py-1 px-4 mr-2 bg-gray-200 font-medium rounded-md hover:bg-gray-300`}
                                cursorDefault={loading}
                                onClick={() => !loading && setShowModal(false)}
                            >
                                <span>Hủy</span>
                            </Button>
                            <Button
                                _className={`flex items-center py-1 px-4 mr-2 bg-blue-200 font-medium rounded-md hover:bg-blue-300`}
                                cursorDefault={
                                    loading ||
                                    item.codeName === formVlues.codeName
                                }
                                onClick={() =>
                                    item.codeName !== formVlues.codeName &&
                                    !loading &&
                                    updateIntroduction(formVlues)
                                }
                            >
                                {loading && (
                                    <span className="block h-5 w-5">
                                        <LoadingCircleLine />
                                    </span>
                                )}
                                <span className="text-blue-800">Lưu</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemInput;
