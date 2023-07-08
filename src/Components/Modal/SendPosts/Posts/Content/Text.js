import { useContext } from "react";
import { PostsContext } from "../../PostsProvider";
function Text() {
    const context = useContext(PostsContext);
    return (
        <div className="py-4">
            <textarea
                className="flex fle w-full h-max outline-none "
                rows="4"
                value={context.text}
                placeholder="Tu Anh ơi, bạn đang nghĩ gì thế ?"
                onChange={(e) => context.setText(e.target.value)}
            ></textarea>
        </div>
    );
}

export default Text;
