import Stories from "../Components/Stories";
import InputBox from "../../../Components/InputBox";
import Posts from "../../../Components/Posts";
import avatar from "../../../assets/images/avatar/avatar.jpg";
function LayoutContent() {
    return (
        <div className=" w-full max-w-[500px] sm:max-w-none sm:w-[500px] 2xl:w-[600px] min-h-screen ">
            <Stories />
            <InputBox />
            <Posts
                userId={1}
                avatar={avatar}
                name={"Nguyễn Tú Anh"}
                time={1671894600425}
            />
            <Posts
                userId={2}
                avatar={avatar}
                name={"Nguyễn Tú Anh"}
                time={1671894600425}
                group={true}
                groupId="2"
                groupName="Ninja School Online"
            />
            <Posts
                userId={2}
                avatar={avatar}
                name={"Nguyễn Văn Tùng"}
                time={1671894600425}
            />
            <Posts
                userId={2}
                avatar={avatar}
                name={"Nguyễn Thị Hoan"}
                time={1671894600425}
            />
        </div>
    );
}

export default LayoutContent;
