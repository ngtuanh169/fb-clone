import Button from "../../../../Button";
import Posts from "../../Posts";
import { HiArrowSmLeft } from "react-icons/hi";
function Title({ setCurrentComp = () => {} }) {
    return (
        <div className=" relative flex items-center justify-center w-full h-[60px] p-3 border-b">
            <span className=" text-[20px] font-bold">Gắn thẻ người khác</span>
            <div className=" absolute top-0 left-3 flex items-center h-full">
                <Button
                    _className={
                        "flex items-center justify-center h-9 w-9 rounded-full bg-gray-200 hover:bg-gray-300"
                    }
                    onClick={() => setCurrentComp(undefined)}
                >
                    <HiArrowSmLeft className="text-[20px] text-gray-500" />
                </Button>
            </div>
        </div>
    );
}

export default Title;
