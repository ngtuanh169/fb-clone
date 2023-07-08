import LayoutLeft from "./LayoutLeft";
import LayoutRight from "./LayoutRight";
function LayoutBottom() {
    return (
        <div className="flex w-[1000px] mx-auto">
            <div className="w-[450px] ">
                <LayoutLeft />
            </div>
            <div className="flex-1 ml-4">
                <LayoutRight />
            </div>
        </div>
    );
}

export default LayoutBottom;
