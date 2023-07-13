function Loading({ number }) {
    return (
        <div className=" relative w-full h-full">
            {Array(number)
                .fill(0)
                .map((item, index) => (
                    <div
                        key={index}
                        className=" absolute flex justify-center w-full h-full "
                    >
                        <span
                            style={{
                                rotate: `${(360 / number) * (index + 1)}deg`,
                            }}
                            className="flex items-start w-3 h-full "
                        >
                            <span
                                style={{
                                    animationDuration: `${0.07 * number}s`,
                                    animationDelay: `${0.07 * index}s`,
                                }}
                                className={`w-3 h-3 rounded-full  animate-loading `}
                            ></span>
                        </span>
                    </div>
                ))}
        </div>
    );
}

export default Loading;
