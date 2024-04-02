import Modal from "../";
import MainCard from "../../MainCard";
import LoadingCircleLine from "../../LoadingCircleLine";
import Button from "../../Button";
import { CgClose } from "react-icons/cg";
function Confirm({
    title,
    text,
    confirm = () => {},
    loading = false,
    closeModal = () => {},
}) {
    return (
        <Modal closeModal={closeModal}>
            <div className="w-[370px] sm:w-[550px] m-auto">
                <MainCard>
                    <div className="flex flex-col px-2 pb-2">
                        <div className=" relative flex items-center w-full h-[60px] px-2 border-b">
                            <span className=" text-[20px] font-bold pr-[36px] line-clamp-1">
                                {title}
                            </span>
                            <div className=" absolute top-0 right-0 flex items-center h-full ">
                                <Button
                                    _className={
                                        "flex justify-center items-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300"
                                    }
                                    onClick={closeModal}
                                >
                                    <CgClose className="h-6 w-6 text-gray-600" />
                                </Button>
                            </div>
                        </div>
                        <div className="block min-h-[80px] p-2 ">
                            <span>{text}</span>
                        </div>
                        <div className="flex justify-end py-2">
                            <Button
                                _className={
                                    "flex justify-center items-center group w-[50px] h-[36px] mr-2 rounded-md hover:bg-hover"
                                }
                                onClick={closeModal}
                            >
                                <span className=" font-medium text-blue-500 group-hover:text-gray-600 ">
                                    Hủy
                                </span>
                            </Button>
                            <Button
                                _className={` flex justify-center items-center gap-2 w-[160px] h-[36px] bg-blue-600
                                             rounded-md hover:bg-blue-700`}
                                cursorDefault={loading}
                                onClick={() => {
                                    !loading && confirm();
                                }}
                            >
                                {loading && (
                                    <span className="block w-5 h-5">
                                        <LoadingCircleLine />
                                    </span>
                                )}
                                <span className=" font-medium text-white">
                                    Xác nhận
                                </span>
                            </Button>
                        </div>
                    </div>
                </MainCard>
            </div>
        </Modal>
    );
}

export default Confirm;
