import MainCard from "../MainCard";
import SkeletonLoading from "../SkeletonLoading";
function PostsLoading() {
    return (
        <div className="w-full">
            <MainCard>
                <div className="flex gap-2 w-full p-2 ">
                    <div className="w-10 h-10 ">
                        <SkeletonLoading circle />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="w-[80px] h-[10px] rounded-md mb-2">
                            <SkeletonLoading />
                        </div>
                        <div className="w-[100px] h-[10px] rounded-md">
                            <SkeletonLoading />
                        </div>
                    </div>
                </div>
                <div className="flex items-end gap-2 w-full h-[150px] p-2 px-[48px]">
                    <div className="flex justify-between w-full">
                        <div className="w-[50px] h-[10px] rounded-md overflow-hidden">
                            <SkeletonLoading />
                        </div>
                        <div className="w-[50px] h-[10px] rounded-md overflow-hidden">
                            <SkeletonLoading />
                        </div>
                        <div className="w-[50px] h-[10px] rounded-md overflow-hidden">
                            <SkeletonLoading />
                        </div>
                    </div>
                </div>
            </MainCard>
        </div>
    );
}

export default PostsLoading;
