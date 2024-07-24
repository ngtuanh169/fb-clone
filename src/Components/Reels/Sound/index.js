import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
function Sound({ control = {}, setControl = () => {} }) {
    return (
        <div
            className=" group relative cursor-pointer"
            onClick={() => setControl({ ...control, sound: !control.sound })}
        >
            {control.sound ? <FaVolumeUp /> : <FaVolumeMute />}
            <div className=" absolute left-0 top-[110%] flex justify-center w-full invisible opacity-0 transition-all delay-100 group-hover:visible group-hover:opacity-100">
                <div className=" ">
                    <span
                        style={{
                            boxShadow: "rgb(25 22 22) 1px 1px 2px 1px",
                        }}
                        className="block w-max px-2 py-[6px] text-[13px] rounded-lg bg-black "
                    >
                        {control.sound ? "Tắt tiếng" : "Bật tiếng"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Sound;
