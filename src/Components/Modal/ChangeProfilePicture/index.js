import { useEffect, useState } from "react";
import useForm from "../../../Hooks/useForm";
import MainCard from "../../MainCard";
import Modal from "..";
import Button from "../../Button";
import { IoMdClose } from "react-icons/io";
function ChangeProfilePicture({
    title = "",
    video = false,
    handleChange = () => {},
    closeModal = () => {},
}) {
    const validates = [
        { name: "file", rules: { isFlies: video ? "video" : "picture" } },
    ];
    const [loading, setLoading] = useState(false);
    const [formValue, setFormValue] = useState({
        file: "",
        text: "",
        fileUrl: "",
    });
    const changeFile = (file) => {
        file && setFormValue({ ...formValue, file });
    };
    useEffect(() => {
        if (formValue.file[0]) {
            formValue.fileUrl && URL.revokeObjectURL(formValue.fileUrl);
            const url = URL.createObjectURL(formValue.file[0]);
            setFormValue({ ...formValue, fileUrl: url });
        }
        return () =>
            formValue.fileUrl && URL.revokeObjectURL(formValue.fileUrl);
    }, [formValue.file]);

    const handleSubmit = async () => {
        const res = await handleChange(formValue.file[0], formValue.text);
        console.log(res);
    };
    const { invalid, errors, removeError, formSubmit } = useForm(
        validates,
        handleSubmit
    );
    return (
        <Modal closeModal={closeModal}>
            <div className=" w-full mx-2 md:mx-auto md:w-[700px] h-[300px] m-auto">
                <MainCard>
                    <div className="flex flex-col w-full p-2">
                        <div className="pb-2 border-b">
                            <div className=" relative text-center p-2">
                                <span className=" text-[20px] font-semibold">
                                    {title}
                                </span>
                                <Button
                                    _className={" absolute top-[5px] right-0"}
                                    onClick={closeModal}
                                >
                                    <span className="flex justify-center items-center w-9 h-9 bg-gray-200 rounded-full hover:bg-gray-300">
                                        <IoMdClose className="w-5 h-5" />
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <div className=" border-b">
                            <div className="p-2">
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="file"
                                        className=" font-medium"
                                    >
                                        {` Chọn ${video ? "video" : "ảnh"}`}
                                    </label>
                                    <input
                                        className=" border p-2 rounded-md"
                                        type="file"
                                        id="file"
                                        name="file"
                                        onChange={(e) => {
                                            changeFile(e.target.files);
                                            removeError("file");
                                        }}
                                        onBlur={(e) =>
                                            invalid("file", e.target.files)
                                        }
                                    />
                                    {errors.file && (
                                        <p className="text-[12px] text-red-500">
                                            {errors.file}
                                        </p>
                                    )}
                                    {formValue.fileUrl && !errors.file && (
                                        <div className="w-[100px] h-[100px] mx-auto py-2 ">
                                            {video ? (
                                                <video
                                                    className="w-full h-full object-cover"
                                                    src={formValue.fileUrl}
                                                />
                                            ) : (
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={formValue.fileUrl}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-2">
                                <div className="">
                                    <label
                                        htmlFor="text"
                                        className=" font-medium"
                                    >
                                        Mô tả
                                    </label>
                                    <textarea
                                        className="w-full p-2 border outline-none rounded-md focus:border-blue-500"
                                        name="text"
                                        id="text"
                                        rows="4"
                                        placeholder="Nội dung bài đăng..."
                                        value={formValue.text}
                                        onChange={(e) => {
                                            setFormValue({
                                                ...formValue,
                                                text: e.target.value,
                                            });
                                            removeError("text");
                                        }}
                                        onBlur={(e) =>
                                            invalid("text", e.target.value)
                                        }
                                    ></textarea>
                                    {errors.text && (
                                        <p className="text-[12px] text-red-500">
                                            {errors.text}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end p-2 pt-4">
                            <Button
                                _className={
                                    "w-[50px] py-2 text-center rounded-md hover:bg-gray-300"
                                }
                                onClick={closeModal}
                            >
                                <span className=" font-medium">Hủy</span>
                            </Button>
                            <Button
                                _className={
                                    " w-[100px] py-2 ml-2 text-center bg-blue-600 rounded-md hover:bg-blue-700"
                                }
                                onClick={() => formSubmit(formValue)}
                            >
                                <span className=" text-white font-medium">
                                    Lưu
                                </span>
                            </Button>
                        </div>
                    </div>
                </MainCard>
            </div>
        </Modal>
    );
}

export default ChangeProfilePicture;
