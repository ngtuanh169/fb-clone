function MainCard({ children }) {
	return (
		<div className="flex flex-col w-full mb-4 p-2 rounded-md bg-white shadow shadow-gray-400">
			{children}
		</div>
	);
}

export default MainCard;
