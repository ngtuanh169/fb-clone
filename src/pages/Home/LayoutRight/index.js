import FriendRequest from "./FriendRequest";
import Button from "../../../Components/Button";
import Contact from "./Contact";
function LayoutRight() {
    return (
        <div className="w-full h-full  px-2">
            <FriendRequest />
            <Contact />
        </div>
    );
}

export default LayoutRight;
