import LayoutLeft from "./LayoutLeft";
import LayoutRight from "./LayoutRight";
function LayoutBottom() {
    return (
        <div className="flex flex-col lg:flex-row w-full lg:w-[1000px] mx-auto">
            <div className="w-full max-w-[500px] lg:w-[450px] mx-auto ">
                <LayoutLeft />
            </div>
            <div className="w-full max-w-[500px] mx-auto lg:w-auto lg:flex-1 lg:ml-4">
                <LayoutRight />
            </div>
        </div>
    );
}

export default LayoutBottom;
