import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useClickOutSide } from "../../../../Hooks/useClickOutSide";
import userIntroductionApi from "../../../../api/userIntroductionApi";
import LoadingCircleLine from "../../../../Components/LoadingCircleLine";
import Button from "../../../../Components/Button";
import { BsPencil, BsFillCaretDownFill } from "react-icons/bs";
import { HiOutlinePlusSm } from "react-icons/hi";
import { AiOutlineCheck } from "react-icons/ai";
function ItemOptions({
    item,
    introductionList,
    setIntroductionList = () => {},
}) {
    const _options = item.options ? JSON.parse(item.options) : null;
    const { userId } = useParams();
    const user = useSelector((state) => state.user);
    const divRef = useRef();
    const [options, setOptions] = useState(_options);
    const [showOptions, setShowOptions] = useState(false);
    const [formVlues, setFormValues] = useState({
        codeId: item.codeId,
        codeName: item.codeName,
    });
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    useClickOutSide(divRef, () => setShowOptions(false));
    useEffect(() => {
        if (options) {
            !+item.codeId &&
                setFormValues({
                    codeId: options[0].code_id,
                    codeName: options[0].code_name,
                });
        }
    }, []);
    const updateIntroduction = async (values) => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("userId", user.userId);
            params.append("introductionId", item.id);
            params.append("codeId", values.codeId);
            params.append(
                "codeName",
                values.codeId == 0 ? "" : values.codeName
            );
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
                            ref={divRef}
                            className=" relative flex items-center justify-between w-full p-2 bg-gray-200 rounded-md 
                            cursor-pointer hover:bg-gray-300"
                            onClick={() => setShowOptions(!showOptions)}
                        >
                            <span className=" font-medium">
                                {formVlues.codeName}
                            </span>
                            <span>
                                <BsFillCaretDownFill />
                            </span>
                            {showOptions && (
                                <div
                                    className=" absolute top-[100%] flex flex-col min-w-[300px] max-h-[300px] p-2 bg-white 
                                        shadow-md rounded-lg z-[99] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full"
                                >
                                    {options.map((item) => (
                                        <div
                                            className={`w-full p-[2px] border-2 ${
                                                formVlues.codeId == item.code_id
                                                    ? "border-blue-500"
                                                    : " border-transparent"
                                            } rounded-md `}
                                        >
                                            <Button
                                                _className={`flex justify-between items-center w-full p-2 text-left rounded-md ${
                                                    formVlues.codeId ==
                                                    item.code_id
                                                        ? "bg-gray-200"
                                                        : ""
                                                } hover:bg-gray-200`}
                                                onClick={() =>
                                                    setFormValues({
                                                        codeId: item.code_id,
                                                        codeName:
                                                            item.code_name,
                                                    })
                                                }
                                            >
                                                <span className="font-medium">
                                                    {item.code_name}
                                                </span>
                                                {formVlues.codeId ==
                                                    item.code_id && (
                                                    <span className="text-blue-500">
                                                        <AiOutlineCheck />
                                                    </span>
                                                )}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                                    loading || item.codeId == formVlues.codeId
                                }
                                onClick={() =>
                                    !loading && updateIntroduction(formVlues)
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

export default ItemOptions;
