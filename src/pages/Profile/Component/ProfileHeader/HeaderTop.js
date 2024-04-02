import { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatBanner } from "../../../../Hooks/useFormat";
import { ScreenSize } from "../../../../App";
import SkeletonLoading from "../../../../Components/SkeletonLoading";
import ChangeProfilePicture from "../../../../Components/Modal/ChangeProfilePicture";
import { AiFillCamera } from "react-icons/ai";
import Button from "../../../../Components/Button";
function HeaderTop({ isLoading, userData = {} }) {
    const { userId } = useParams();
    const context = useContext(ScreenSize);
    const user = useSelector((state) => state.user);
    const [showModalBanner, setShowModalBanner] = useState(false);
    return (
        <>
            {showModalBanner && (
                <ChangeProfilePicture
                    title="Cập nhập ảnh bìa"
                    closeModal={() => setShowModalBanner(false)}
                />
            )}
            {isLoading ? (
                <div className="w-full h-[300px] md:h-[350px] lg:rounded-b-lg lg:h-[400px] overflow-hidden">
                    <SkeletonLoading />
                </div>
            ) : (
                <div className=" relative w-full lg:rounded-b-lg overflow-hidden">
                    <Link to={"/photo/1"} className="w-full">
                        <img
                            className="w-full max-h-[400px] object-cover"
                            src={formatBanner(
                                userId === user.userId
                                    ? user.banner
                                    : userData.banner
                            )}
                            alt=""
                        />
                    </Link>
                    {userId === user.userId && (
                        <div className=" absolute bottom-3 right-3 z-10">
                            <Button
                                _className={
                                    "flex items-center p-2 bg-gray-300 sm:bg-white rounded-full sm:rounded-md "
                                }
                                onClick={() => setShowModalBanner(true)}
                            >
                                <AiFillCamera className="text-[22px]" />
                                {context.width >= 640 && (
                                    <span className="ml-1 font-medium">
                                        Thay đổi ảnh bìa
                                    </span>
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default HeaderTop;
