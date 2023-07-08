import Posts from "../../../Components/Posts";
import Search from "..";
import avt from "../../../assets/images/avatar/avatar.jpg";
function PostsSearch() {
    return (
        <Search>
            <div className="flex flex-col items-center w-full mt-8">
                <div className="w-full sm:w-[600px]">
                    <Posts
                        userId={1}
                        name={"Nguyễn Tú Anh"}
                        avatar={avt}
                        time={1685705053000}
                        iconClose={true}
                    />
                </div>
                <div className="w-full sm:w-[600px]">
                    <Posts
                        userId={1}
                        name={"Nguyễn Tú Anh"}
                        avatar={avt}
                        time={1685705053000}
                        iconClose={true}
                    />
                </div>
            </div>
        </Search>
    );
}

export default PostsSearch;
