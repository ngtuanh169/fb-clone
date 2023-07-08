import InfoItem from "../Overview/InfoItem";
import FormWork from "./FormWork";
import icon from "../../../../assets/images/imgIcon/job.png";
function Work() {
    return (
        <div className="flex flex-col w-full py-7 lg:py-0 px-2">
            <div className="w-full">
                <span className=" font-medium text-[19px]">Công việc</span>
            </div>
            <div className="flex items-center w-full mt-4"></div>
            <InfoItem
                icon={icon}
                text={"Trường Đại học Công Nghiệp Hà Nội"}
                Comp={FormWork}
            />
        </div>
    );
}

export default Work;
