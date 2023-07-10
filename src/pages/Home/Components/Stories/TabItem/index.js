function TabItem({ children, text, id, active, setId }) {
    return (
        <div
            className="h-[50px] w-1/2 flex justify-center items-center py-2 rounded-md cursor-pointer relative hover:bg-hover"
            onClick={() => setId(id)}
        >
            <span
                className={`block mr-1 text-[22px] text-gray-600 ${
                    active === id && "text-blue-600"
                } `}
            >
                {children}
            </span>
            <span
                className={` text-gray-600 text-[15px] font-semibold ${
                    active === id && "text-blue-600"
                }`}
            >
                {text}
            </span>
            <b
                className={` absolute h-[3px] w-full bottom-0 rounded-sm ${
                    active === id && "bg-blue-600"
                }`}
            ></b>
        </div>
    );
}

export default TabItem;
