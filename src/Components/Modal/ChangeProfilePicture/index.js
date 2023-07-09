import MainCard from "../../MainCard";
import Modal from "..";
import Button from "../../Button";
import { IoMdClose } from "react-icons/io";
function ChangeProfilePicture({
    title = "",
    handleChange = () => {},
    closeModal = () => {},
}) {
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
                                        htmlFor="photo"
                                        className=" font-medium"
                                    >
                                        Chọn ảnh
                                    </label>
                                    <input
                                        className=" border p-2 rounded-md"
                                        type="file"
                                        id="photo"
                                    />
                                </div>
                            </div>
                            <div className="p-2">
                                <div className="">
                                    <label
                                        htmlFor="des"
                                        className=" font-medium"
                                    >
                                        Mô tả
                                    </label>
                                    <textarea
                                        className="w-full p-2 border outline-none rounded-md focus:border-blue-500"
                                        name=""
                                        id="des"
                                        rows="4"
                                        placeholder="Nội dung bài đăng..."
                                    ></textarea>
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
                                onClick={handleChange}
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
