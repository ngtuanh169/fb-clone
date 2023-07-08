import LayouTop from "./LayoutTop";
import LayoutBottom from "./LayoutBottom";
function RequestJoinGroup() {
    return (
        <div className="flex flex-col w-full">
            <div className="w-full">
                <LayouTop />
            </div>
            <div className="w-full py-5">
                <LayoutBottom />
            </div>
        </div>
    );
}

export default RequestJoinGroup;
