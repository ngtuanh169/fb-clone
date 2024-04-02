import Button from "../../../Button";
import { GrClose } from "react-icons/gr";
function Title({ closeModal = () => {}, loading = false }) {
    return (
        <div className="p-4 mb-2 border-b-[1px] relative">
            <Button
                _className={`absolute top-3 right-3 w-[35px] h-[35px] bg-gray-300 rounded-full ${
                    loading ? "" : "hover:bg-gray-400"
                }`}
                cursorDefault={loading}
                onClick={() => !loading && closeModal()}
            >
                <GrClose className="mx-auto" />
            </Button>
            <h3 className="text-xl font-bold text-center text-gray-600 select-none">
                Tạo bài viết
            </h3>
        </div>
    );
}

export default Title;
