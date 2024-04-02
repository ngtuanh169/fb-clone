function LoadingCircleLine({ color = "" }) {
    return (
        <div className=" relative w-full h-full">
            {Array(3)
                .fill(0)
                .map((item, index) => (
                    <div
                        key={index}
                        style={{ animationDelay: `${-0.45 + index * 0.14}s` }}
                        className={`absolute w-full h-full rounded-full border-[3px] ${
                            color ? `border-t-${color}` : "border-t-gray-600"
                        } border-x-transparent
                             border-b-transparent animate-loadingCircleLine`}
                    ></div>
                ))}
        </div>
    );
}

export default LoadingCircleLine;
