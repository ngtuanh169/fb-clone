import LayoutTop from "./LayoutTop";
import LayoutBottom from "./LayoutBottom";
import avt from "../../../../assets/images/avatar/avatar.jpg";
import banner from "../../../../assets/images/banner/user_bn.png";

function MemberInfo() {
    return (
        <div className="flex flex-col">
            <LayoutTop
                id={1}
                name={"Nguyễn Tú Anh"}
                avt={avt}
                background={banner}
            />
            <LayoutBottom />
        </div>
    );
}

export default MemberInfo;
