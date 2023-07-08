function NotiNumber({ number }) {
    return (
        <span className="flex items-center justify-center w-[19px] h-[19px] bg-red-600 rounded-full">
            <span className="text-[13px] font-medium text-white">{number}</span>
        </span>
    );
}

export default NotiNumber;
