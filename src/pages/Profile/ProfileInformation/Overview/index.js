import InfoItem from "./InfoItem";
import FormWork from "../Work/FormWork";
import FormEducation from "../Education/FormEducation";
import FormAdress from "../Adress/FormAdress";
import FormRelationships from "../Relationships/FormRelationships";

import education from "../../../../assets/images/imgIcon/education.png";
import heart from "../../../../assets/images/imgIcon/heart.png";
import home from "../../../../assets/images/imgIcon/home.png";
import job from "../../../../assets/images/imgIcon/job.png";

function Overview() {
    const list = [
        {
            id: 1,
            icon: job,
            text: "Trường Đại học Công Nghiệp Hà Nội",
            Comp: FormWork,
        },
        {
            id: 2,
            icon: education,
            text: "Học tại Đại học Công Nghiệp Hà Nội (HAUI)",
            Comp: FormEducation,
        },
        { id: 3, icon: home, text: "Sống tại Hà Nội", Comp: FormAdress },
        { id: 4, icon: heart, text: "Độc thân", Comp: FormRelationships },
    ];
    return (
        <div className="py-7 px-3">
            {list.length > 0 &&
                list.map((item) => (
                    <InfoItem
                        key={item.id}
                        icon={item.icon}
                        text={item.text}
                        Comp={item.Comp}
                    />
                ))}
        </div>
    );
}

export default Overview;
