import SkeletonLoading from "../../../../Components/SkeletonLoading";
import FirendItem from "./FirendItem";
function FriendsList({ data = [], loading = false }) {
    return (
        <>
            {!loading && data.length === 0 && (
                <div className="w-full p-4 text-center">
                    <span className=" text-gray-400 font-medium">
                        Không có bạn bè để hiện thị
                    </span>
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2">
                {data.length > 0 &&
                    data.map((item) => (
                        <div key={item.id}>
                            <FirendItem data={item} />
                        </div>
                    ))}

                {loading &&
                    Array(4)
                        .fill(0)
                        .map((item, index) => (
                            <div
                                key={index}
                                className=" flex items-center rounded-md shadow-sm border p-4"
                            >
                                <div className="w-20 h-20 mr-4 rounded-lg overflow-hidden">
                                    <SkeletonLoading />
                                </div>
                                <div className="w-[100px] h-5 rounded-md overflow-hidden">
                                    <SkeletonLoading />
                                </div>
                            </div>
                        ))}
            </div>
        </>
    );
}

export default FriendsList;
