import InfoItem from "../Overview/InfoItem";
import FormRelationships from "./FormRelationships";
import icon from "../../../../assets/images/imgIcon/heart.png";
function Relationships() {
    return (
        <div className="flex flex-col w-full py-7 lg:py-0 px-2">
            <div className="w-full">
                <span className=" font-medium text-[19px]">Mối quan hệ</span>
            </div>
            <div className="flex items-center w-full mt-4"></div>
            <InfoItem icon={icon} text={"Độc thân"} Comp={FormRelationships} />
        </div>
    );
}

export default Relationships;
