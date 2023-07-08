import LayoutTop from "./LayoutTop";
import LayoutBottom from "./LayoutBottom";
function LayoutLeft() {
    return (
        <div className="w-[350px] ">
            <div className="fixed top-0 w-[350px] h-screen pt-[56px] bg-white shadow-lg z-30">
                <LayoutTop />
                <LayoutBottom />
            </div>
        </div>
    );
}

export default LayoutLeft;
