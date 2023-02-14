import LayoutLeft from "./LayoutLeft";
import LayoutContent from "./LayoutContent";
import LayoutRight from "./LayoutRight";
function Home() {
	return (
		<div className="flex justify-bettween w-full px-3 ">
			<div className=" w-[300px] h-screen pt-6 fixed top-0 z-50">
				<LayoutLeft />
			</div>
			<div className=" w-full pt-6 flex justify-center ">
				<LayoutContent />
			</div>
			<div className=" w-[300px] h-screen pt-6 fixed boder top-0 right-0 z-50">
				<LayoutRight />
			</div>
		</div>
	);
}

export default Home;
