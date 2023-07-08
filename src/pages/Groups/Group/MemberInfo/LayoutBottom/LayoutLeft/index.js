import Introduce from "./Introduce";
import Image from "./Image";
function LayoutLeft() {
    return (
        <div className=" flex flex-col">
            <Introduce />
            <Image />
        </div>
    );
}

export default LayoutLeft;
