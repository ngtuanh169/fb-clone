function SubLayoutLeft({ children, name }) {
    return (
        <div className="w-full lg:w-[350px]">
            <div className="lg:fixed lg:top-0 lg:w-[350px] w-full lg:h-screen lg:pt-[56px] bg-white shadow-lg ">
                <div className="flex flex-col">
                    <div className="px-4 py-3">
                        <span className="text-[24px] font-bold">{name}</span>
                    </div>
                    <div className="w-full">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default SubLayoutLeft;
