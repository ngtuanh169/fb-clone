function MainCard({ children }) {
    return (
        <div
            className="flex flex-col w-full mb-4 rounded-lg bg-white shadow shadow-gray-400 "
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            {children}
        </div>
    );
}

export default MainCard;
