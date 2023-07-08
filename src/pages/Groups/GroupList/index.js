import GroupItem from "./GroupItem";
import Button from "../../../Components/Button";
import avt from "../../../assets/images/avatar/avatar.jpg";
function GroupList() {
    const data = [
        {
            id: 1,
            avt,
            name: "KINH NGHIỆM CẮM TRẠI A->Z",
            members: 3634334,
            status: "Riêng tư",
            joined: true,
            des: "Đảo Mèo Ta do Khế Thúi thành lập vào năm 2019. Duyệt tất cả bài viết về các bé mèo cơ nhỡ, sự đáng yêu của các bé mèo ta ! Youtube Khế Thúi",
        },
        {
            id: 5,
            avt,
            name: "KINH NGHIỆM CẮM TRẠI A->Z",
            members: 3123,
            status: "Công khai",
            joined: true,
        },
        {
            id: 6,
            avt,
            name: "KINH NGHIỆM CẮM TRẠI A->Z",
            members: 3123,
            status: "Riêng tư",
            joined: false,
        },
        {
            id: 7,
            avt,
            name: "KINH NGHIỆM CẮM TRẠI 777A->Z",
            members: 3123,
            status: "Riêng tư",
            joined: false,
        },
    ];
    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                {data.length > 0 &&
                    data.map((item) => (
                        <GroupItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            avt={item.avt}
                            members={item.members}
                            status={item.status}
                            joined={item.joined}
                            des={item.des}
                        />
                    ))}
            </div>
            <div className="">
                <Button
                    _className={
                        "w-full rounded-md py-[3px] bg-gray-200 hover:bg-gray-300"
                    }
                >
                    <span className=" font-semibold">Xem thêm</span>
                </Button>
            </div>
        </div>
    );
}

export default GroupList;
