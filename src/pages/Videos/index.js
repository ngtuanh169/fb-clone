import SubLayoutLeft from "../../Components/SubLayoutLeft";
import SearchSubLayout from "../../Components/Modal/SearchSubLayout";
import Posts from "../../Components/Posts";
import avatar from "../../assets/images/avatar/avatar.jpg";
function Videos() {
    return (
        <div className="flex">
            <div className="flex flex-col lg:flex-row w-full">
                <div className="">
                    <SubLayoutLeft name={"Watch"}>
                        <div className="mb-2 lg:mb-0">
                            <SearchSubLayout nameInput="Tìm kiếm video" />
                        </div>
                    </SubLayoutLeft>
                </div>
                <div className="flex-1 pt-5  ">
                    <div className="w-full sm:w-[550px] lg:w-[820px] mx-auto">
                        <Posts
                            userId={1}
                            avatar={avatar}
                            name={"Nguyễn Tú Anh"}
                            time={1671894600425}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Videos;
