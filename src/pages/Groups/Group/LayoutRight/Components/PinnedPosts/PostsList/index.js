import { useState, useRef, useEffect, useContext } from "react";
import { ScreenSize } from "../../../../../../../App";
import Button from "../../../../../../../Components/Button";
import PostsItem from "./PostsItem";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import avatar from "../../../../../../../assets/images/avatar/avatar.jpg";
function PostsList() {
    const postsList = [
        {
            id: 1,
            name: "Nguyen Tu Anh",
            avt: avatar,
            time: 1680845058447,
            text: "Con game ra đi tội các ad và dân buôn ôm acc quá, vẫn lạc quan tốt",
            image: avatar,
            likes: 1233,
            comments: 2314,
            liked: true,
        },
        {
            id: 2,
            name: "Nguyen Tu Anh",
            avt: avatar,
            time: 1680845058447,
            text: "Con game ra đi tội các ad và dân buôn ôm acc quá, vẫn lạc quan tốt",
            image: "",
            likes: 133,
            comments: 214,
            liked: false,
        },
        {
            id: 3,
            name: "Nguyen Tu Anh",
            avt: avatar,
            time: 1680845058447,
            text: "Con game ra đi tội các ad và dân buôn ôm acc quá, vẫn lạc quan tốt",
            image: avatar,
            likes: 4233,
            comments: 5314,
            liked: true,
        },
    ];
    const context = useContext(ScreenSize);
    const divRef = useRef();
    const [clientWidth, setClientWidth] = useState(0);
    const [number, setNumber] = useState(0);
    const [showButtonPrev, setShowButtonPrev] = useState(false);
    const [showButtonNext, setShowButtonNext] = useState(false);
    const [slIndex, setSlIndex] = useState(0);
    const [sliderLength, setSliderLength] = useState(postsList.length - 2);
    const buttonPrev = (slIndex) => {
        slIndex > 0 && setSlIndex(slIndex - 1);
    };
    const buttonNext = (slIndex) => {
        slIndex < sliderLength && setSlIndex(slIndex + 1);
    };
    useEffect(() => {
        divRef.current && setClientWidth(divRef.current.clientWidth);
        if (context.width >= 500) {
            setNumber(2);
        } else {
            setNumber(1);
        }
    }, [context.width]);
    useEffect(() => {
        slIndex > 0 ? setShowButtonPrev(true) : setShowButtonPrev(false);
        sliderLength > 0 && slIndex < sliderLength && setShowButtonNext(true);
        slIndex >= sliderLength && setShowButtonNext(false);
    }, [slIndex]);
    return (
        <div ref={divRef} className="relative w-full py-2 overflow-hidden">
            {showButtonPrev && (
                <div className=" absolute left-4 top-[50%] z-50 ">
                    <Button
                        _className={
                            "flex justify-center items-center w-12 h-12 rounded-full overflow-hidden bg-gray-200 drop-shadow-shadow012 hover:bg-gray-300"
                        }
                        onClick={() => buttonPrev(slIndex)}
                    >
                        <BsChevronLeft className="w-6 h-6" />
                    </Button>
                </div>
            )}
            {showButtonNext && (
                <div className=" absolute right-4 top-[50%] z-50 ">
                    <Button
                        _className={
                            "flex justify-center items-center w-12 h-12 rounded-full overflow-hidden bg-gray-200 drop-shadow-shadow012 hover:bg-gray-300"
                        }
                        onClick={() => buttonNext(slIndex)}
                    >
                        <BsChevronRight className="w-6 h-6" />
                    </Button>
                </div>
            )}
            <div
                style={{
                    transform: `translateX(-${
                        (clientWidth / number) * slIndex
                    }px)`,
                }}
                className="flex w-max bg-white transition-transform ease-linear duration-150"
            >
                {postsList.length > 0 &&
                    postsList.map((item) => (
                        <div
                            key={item.id}
                            style={{ width: `${clientWidth / number}px` }}
                            className="px-2 "
                        >
                            <PostsItem data={item} />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default PostsList;
