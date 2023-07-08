import Title from "./Title";
import Content from "./Content";
import Status from "./Status";
function Posts({ closeModal = () => {}, addImg, setCurrentComp = () => {} }) {
    return (
        <div className="flex flex-col w-full p-3">
            <Title closeModal={closeModal} />
            <Status setCurrentComp={setCurrentComp} />
            <Content addImg={addImg} setCurrentComp={setCurrentComp} />
            <div className="mt-4 p-2 bg-blue-400 rounded-md  text-center cursor-pointer">
                <span className=" font-semibold text-white">Đăng</span>
            </div>
        </div>
    );
}

export default Posts;
