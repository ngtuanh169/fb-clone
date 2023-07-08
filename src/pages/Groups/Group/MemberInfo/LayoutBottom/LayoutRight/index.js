import MainCard from "../../../../../../Components/MainCard";
import Posts from "../../../../../../Components/Posts";
import avatar from "../../../../../../assets/images/avatar/avatar.jpg";
function LayoutRight() {
    return (
        <div className="flex flex-col w-full">
            <div className="w-full">
                <MainCard>
                    <span className="block p-2 text-[18px] font-bold">
                        Bài viết trong nhóm
                    </span>
                </MainCard>
            </div>
            <Posts
                userId={1}
                avatar={avatar}
                name="Nguyen Tu Anh"
                time={1680840924949}
                group={true}
                groupName="Giao Lưu - Blue Sky"
                groupId={212}
                adGroup={true}
                iconClose={true}
            />
        </div>
    );
}

export default LayoutRight;
