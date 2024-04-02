import Introduce from "./Introduce";
import Image from "./Image";
function LayoutLeft({ data = {} }) {
    console.log(data);
    return (
        <div className=" flex flex-col">
            <Introduce data={data} />
            <Image />
        </div>
    );
}

export default LayoutLeft;
