import PlayVideo from "./PlayVideo";
import TimeLine from "./TimeLine";
import Tools from "./Tools";
function Controls() {
    return (
        <div className="flex items-center w-full h-full px-2 pb-2">
            <div className="">
                <PlayVideo />
            </div>
            <div className="flex-1">
                <TimeLine />
            </div>
            <div className="">
                <Tools />
            </div>
        </div>
    );
}

export default Controls;
