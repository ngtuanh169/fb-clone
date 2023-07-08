import Button from "../../Button";
import { BsCheck2 } from "react-icons/bs";
function FilterPostsGruop({
    modalList = [],
    currentModal,
    setCurrentModal = () => {},
    closeModal = () => {},
}) {
    return (
        <div
            style={{ boxShadow: "0 1px 10px #8e8d8d" }}
            className="flex flex-col w-[350px] p-2 rounded-lg bg-white "
        >
            {modalList.length > 0 &&
                modalList.map((item) => (
                    <div key={item.id} className="w-full">
                        <Button
                            _className={
                                "flex  w-full p-2 rounded-md hover:bg-hover"
                            }
                            onClick={() => {
                                setCurrentModal(item);
                                closeModal();
                            }}
                        >
                            <div className="flex flex-col w-[85%] text-left ">
                                <span className=" font-medium">
                                    {item.name}
                                </span>
                                <span className="text-[13px]">{item.des}</span>
                            </div>
                            <div className="flex-1 my-auto">
                                {currentModal.id === item.id && (
                                    <BsCheck2 className="text-blue-500 text-[22px] mx-auto" />
                                )}
                            </div>
                        </Button>
                    </div>
                ))}

            {/* <div className="w-full">
                <Button
                    _className={
                        "flex flex-col w-full p-2 rounded-md hover:bg-hover"
                    }
                >
                    <span className=" font-medium">Bài viết mới nhất</span>
                    <span className="text-[13px]">
                        Hiện thị bài viết gần đây đầu tiên
                    </span>
                </Button>
            </div>
            <div className="w-full p-1 rounded-md"></div> */}
        </div>
    );
}

export default FilterPostsGruop;
