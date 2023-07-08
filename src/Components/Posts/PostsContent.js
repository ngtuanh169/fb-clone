import { useContext } from "react";
import { Link } from "react-router-dom";
import { ValueContext } from "./";
import Video from "../Video";
function PostsContent() {
    const context = useContext(ValueContext);
    return (
        <>
            <div className=" w-full p-2 pt-0">
                <span className="block text-[14px] lg:text-[15px] min-h-[50px] px-2">
                    Đang có sự cố kết nối xảy ra làm game không thể tạo trận. Bộ
                    phận kỹ thuật đang tiến hành kiểm tra và khắc phục. Các anh
                    hùng xin thử lại sau nhé.
                </span>
            </div>
            {!context.pagePhoto && (
                <div className="w-full border border-gray-300 ">
                    <Link to={"/photo/1"}>
                        {/* <Video /> */}
                        <img
                            className="w-full max-h-[300px] object-cover"
                            src={context.avatar}
                            alt=""
                        />
                    </Link>
                </div>
            )}
        </>
    );
}

export default PostsContent;
