import LayoutTop from "./LayoutTop";
import LayoutBottom from "./LayoutBottom";
import avt from "../../../../assets/images/avatar/avatar.jpg";
function MemberInfo() {
    return (
        <div className="">
            <LayoutTop
                id={1}
                name={"Nguyễn Tú Anh"}
                avt={avt}
                background={avt}
            />
            <LayoutBottom />
        </div>
    );
}

export default MemberInfo;
