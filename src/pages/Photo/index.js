import File from "./File";
import Posts from "../../Components/Posts";
import Video from "../../Components/Video";
import avatar from "../../assets/images/avatar/avatar.jpg";
function Photo() {
    return (
        <div className="flex flex-col lg:flex-row w-screen h-screen overflow-hidden">
            <div className="lg:flex-1 lg:h-screen h-[40vh] bg-black">
                <File />
            </div>
            <div className="w-full h-[60vh] lg:w-[360px] lg:h-screen bg-white group  ">
                <div
                    className="w-full flex-1 h-full scrollbar-thin scrollbar-thumb-transparent scrollbar-thumb-rounded-full
                    group-hover:scrollbar-thumb-gray-400"
                >
                    <Posts
                        userId={1}
                        avatar={avatar}
                        name={"Nguyễn Tú Anh"}
                        time={1671894600425}
                        iconClose={true}
                        pagePhoto={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default Photo;
