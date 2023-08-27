import { formatAvatar } from "../../../Hooks/useFormat";
import Loading from "../../Loading";
function InfoUser({ data = {} }) {
    return (
        <div className="flex flex-col items-center w-full mt-5 mb-1">
            {data.othersName ? (
                <>
                    <div className=" h-[60px] w-[60px]">
                        <img
                            className=" w-full h-full rounded-full boder"
                            src={formatAvatar(data.othersAvt, data.othersSx)}
                            alt=""
                        />
                    </div>
                    <div className="">
                        <span className=" font-medium">{data.othersName}</span>
                    </div>
                    <div className="">
                        <span className="text-[13px]">Facebook</span>
                    </div>
                    <div className="">
                        <span className="text-[13px]">
                            Các bạn là bạn bè trên Facebook
                        </span>
                    </div>
                    <div className="">
                        <span className="text-[13px]">Sống tại Hà Nội</span>
                    </div>
                </>
            ) : (
                <div className="w-[30px] h-[30px]">
                    <Loading number={10} sizeSpan={1} />
                </div>
            )}
        </div>
    );
}

export default InfoUser;
