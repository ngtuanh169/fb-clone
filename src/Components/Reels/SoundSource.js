import { CgLoadbarSound } from "react-icons/cg";
function SoundSource({ data = {} }) {
    return (
        <div className="w-full flex flex-nowrap">
            <div className="w-max">
                <CgLoadbarSound className="text-[25px] text-white" />
            </div>
            <div className="relative grow overflow-hidden">
                <div className=" absolute top-0 left-0 w-[100px] h-full bg-gradient-to-r from-black via-transparent to-transparent opacity-90"></div>
                <div className=" flex flex-nowrap gap-8 w-max text-white">
                    {Array(3)
                        .fill(0)
                        .map((item, index) => (
                            <span key={index}>
                                {`${data.userName} - Âm thanh gốc`}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default SoundSource;
