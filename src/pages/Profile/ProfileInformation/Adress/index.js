import InfoItem from "../Overview/InfoItem";
import icon from "../../../../assets/images/imgIcon/home.png";
import FormAdress from "./FormAdress";
function Adress() {
    return (
        <div className="flex flex-col w-full py-7 lg:py-0 px-2">
            <div className="w-full">
                <span className=" font-medium text-[19px]">Nơi sinh sống</span>
            </div>
            <div className="flex items-center w-full mt-4"></div>
            <InfoItem icon={icon} text={"Sống tại Hà Nội"} Comp={FormAdress} />
        </div>
    );
}

export default Adress;
