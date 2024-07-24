import { useContext } from "react";
import { ValueContext } from "./";
import Video from "../Video";
import RenderGridLayout from "../RenderGridLayout";
function PostsContent() {
    const { postsData, pagePhoto } = useContext(ValueContext);
    console.log(postsData.files?.length);
    return (
        <>
            <div className=" w-full p-2 pt-0">
                <span className="block text-[14px] lg:text-[15px] px-2">
                    {postsData.content}
                </span>
            </div>
            {!pagePhoto && (
                <div
                    className={`w-full ${
                        postsData.files?.length > 0
                            ? "border border-gray-300"
                            : ""
                    } `}
                >
                    {postsData.files?.length === 1 &&
                    (postsData.isVideo || postsData.isReels) ? (
                        <div className="w-full ">
                            <Video
                                videoUrl={postsData.files[0].url}
                                duration={postsData.files[0].duration}
                                maxHeight={true}
                            />
                        </div>
                    ) : (
                        <div className="w-full">
                            <RenderGridLayout
                                fileList={postsData.files}
                                postsId={postsData.id}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default PostsContent;
