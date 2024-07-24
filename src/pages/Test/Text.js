function Text({ text = "", run = false, increase = true }) {
    return (
        <div className="w-[10px] text-center bg-gray-200">
            <span className=" font-medium">{text}</span>
        </div>
    );
}

export default Text;
