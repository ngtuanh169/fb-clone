import { Link } from "react-router-dom";
import Video from "../Video";
import { BsPlayCircle } from "react-icons/bs";
function RenderGridLayout({ fileList = [], postsId = 0 }) {
    let gridColumns = "",
        columnEnd = "",
        columnEnd2 = "";

    if (fileList.length === 2) {
        gridColumns = "grid-cols-2 sm:grid-cols-2";
    } else if (fileList.length === 3) {
        gridColumns = "grid-cols-2";
        columnEnd = "col-span-2";
    } else if (fileList.length > 3) {
        gridColumns = "grid-cols-3";
        columnEnd = "col-span-3";
    }
    return (
        <div className={`grid ${gridColumns} gap-[2px] w-full rounded-md`}>
            {fileList.length > 0 &&
                fileList.map((item, index) => {
                    const type = item.type.split("/")[0];
                    let divColumEnd = "";
                    if (index === 0) {
                        divColumEnd = columnEnd;
                    }
                    if (index === 1) {
                        divColumEnd = columnEnd2;
                    }
                    if (index < 4) {
                        return (
                            <div
                                style={{
                                    height:
                                        fileList.length > 2 ? "200px" : "100%",
                                }}
                                key={index}
                                className={`relative max-h-[450px] ${divColumEnd}`}
                            >
                                {type === "image" ? (
                                    postsId ? (
                                        <Link
                                            to={`/photo/${postsId}/${item.id}`}
                                        >
                                            <img
                                                className=" w-full h-full object-cover"
                                                src={item.url}
                                            />
                                        </Link>
                                    ) : (
                                        <img
                                            className=" w-full h-full object-cover"
                                            src={item.url}
                                        />
                                    )
                                ) : (
                                    <div className="w-full h-full">
                                        {postsId ? (
                                            <Link
                                                to={`/photo/${postsId}/${item.id}`}
                                            >
                                                <Video
                                                    videoUrl={item.url}
                                                    type={item.type}
                                                    duration={item.duration}
                                                    showControls={false}
                                                />
                                                <div
                                                    className=" absolute top-0 left-0 flex items-center justify-center
                                                 w-full h-full bg-matteBlack2  "
                                                >
                                                    <BsPlayCircle className=" text-[50px] text-white " />
                                                </div>
                                            </Link>
                                        ) : (
                                            <>
                                                <Video
                                                    videoUrl={item.url}
                                                    type={item.type}
                                                    duration={item.duration}
                                                    showControls={false}
                                                />
                                                <div
                                                    className=" absolute top-0 left-0 flex items-center justify-center
                                                 w-full h-full bg-matteBlack2  "
                                                >
                                                    <BsPlayCircle className=" text-[50px] text-white " />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                                {index === 3 && fileList.length > 4 && (
                                    <div
                                        className=" absolute top-0 left-0 flex items-center justify-center
                                                 w-full h-full bg-matteBlack2 z-20"
                                    >
                                        <span className="text-[25px] font-bold text-white">
                                            +{fileList.length - 4}
                                        </span>
                                    </div>
                                )}
                            </div>
                        );
                    }
                    return;
                })}
        </div>
    );
}

export default RenderGridLayout;
