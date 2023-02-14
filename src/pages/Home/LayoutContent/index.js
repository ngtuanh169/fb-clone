import Stories from "../Components/Stories";
import InputBox from "../Components/InputBox";
import Posts from "../../../Components/Posts";
import avatar from "../../../assets/images/avatar/avatar.jpg";
function LayoutContent() {
	return (
		<div className=" w-[500px] min-h-screen overflow-y-auto">
			<Stories />
			<InputBox />
			<Posts
				userId={1}
				avatar={avatar}
				name={"Nguyễn Tú Anh"}
				time={1671894600425}
			/>
			<Posts
				userId={2}
				avatar={avatar}
				name={"Nguyễn Tú Anh"}
				time={1671894600425}
			/>
		</div>
	);
}

export default LayoutContent;
