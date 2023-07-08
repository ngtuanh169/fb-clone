import InfoItem from "../Overview/InfoItem";
import FormEducation from "./FormEducation";
import icon from "../../../../assets/images/imgIcon/education.png";
function Education() {
    return (
        <div className="flex flex-col w-full py-7 lg:py-0 px-2">
            <div className="w-full">
                <span className=" font-medium text-[19px]">Học vấn</span>
            </div>
            <div className="flex items-center w-full mt-4"></div>
            <InfoItem
                icon={icon}
                text={"Trường Đại học Công Nghiệp Hà Nội"}
                Comp={FormEducation}
            />
        </div>
    );
}

export default Education;
