function SkeletonLoading({ circle = false }) {
    return (
        <div
            className={`relative w-full h-full bg-[#e4e5e6] overflow-hidden ${
                circle ? " rounded-full" : "rounded-lg"
            }`}
        >
            <div className=" absolute w-1/2 h-full bg-gradient-to-r from-[#e4e5e6] via-white to-[#e4e5e6] animate-SkeletonLoading"></div>
        </div>
    );
}

export default SkeletonLoading;
