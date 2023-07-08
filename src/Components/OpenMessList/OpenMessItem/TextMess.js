import { useRef, useEffect } from "react";
import TextMessItem from "./TextMessItem";
import img from "../../../assets/images/avatar/avatar.jpg";
function TextMess({ id }) {
    const textMessList = [
        // {
        //     userId: 1,
        //     avt: img,
        //     text: "Đang có sự cố kết nối xảy",
        //     time: 1683624513787,
        // },
        // {
        //     userId: 2,
        //     avt: img,
        //     text: "Đang có sự cố kết nối xảy",
        //     time: 1683624513787,
        // },
        // {
        //     userId: 2,
        //     avt: img,
        //     text: "Đang có sự cố kết nối xảy",
        //     time: 1683624513787,
        // },
        // {
        //     userId: 1,
        //     avt: img,
        //     text: "Đang có sự cố kết nối xảy",
        //     time: 1683624513787,
        // },
        {
            userId: 1,
            avt: img,
            text: "Đang có sự cố kết nối xảy",
            time: 1683624513787,
        },
        {
            userId: 2,
            avt: img,
            text: "asdasd adada adas Đang có sự cố kết nối xảy Đang có sự cố kết nối xảy Đang có sự cố kết nối xảy Đang có sự cố kết nối xảy",
            time: 1671894600425,
        },
        {
            userId: 1,
            avt: img,
            text: "Đang có sự cố kết nối xảy a Đang có sự cố kết nối xảy a Đang có sự cố kết nối xảy a",
            time: 1687336852728,
            sending: true,
        },
    ];
    const divRef = useRef();
    useEffect(() => {
        // console.log([divRef.current]);
    }, []);
    return (
        <div className="w-full h-max p-2 bg-white  ">
            <div className="flex flex-col w-full pt-2">
                {textMessList.map((item, index) => (
                    <div ref={divRef} key={index} className=" mt-4">
                        <TextMessItem data={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TextMess;
