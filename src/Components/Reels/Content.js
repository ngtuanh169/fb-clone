function Content({ text = "" }) {
    return (
        <div className=" text-[15px] text-white font-normal">
            <span>{text}</span>
        </div>
    );
}

export default Content;
