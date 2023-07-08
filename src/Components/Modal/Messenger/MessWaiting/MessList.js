import MessItem from "../MessItem";
import avatar from "../../../../assets/images/avatar/avatar.jpg";
function MessList({ closeModal = () => {} }) {
    return (
        <div className="my-2 px-2 w-full h-[400px] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full">
            {Array(10)
                .fill(0)
                .map((item, index) => (
                    <MessItem
                        key={index}
                        id={index}
                        avatar={avatar}
                        name={"Nguyễn Tú Anh"}
                        text={
                            "Dịch vụ của Google, được cung cấp miễn phí, dịch nhanh các từ, cụm từ và trang web giữa tiếng Anh và hơn 100 ngôn ngữ khác."
                        }
                        time={1676558206712}
                        closeModal={closeModal}
                    />
                ))}
        </div>
    );
}

export default MessList;
