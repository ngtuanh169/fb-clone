export const formatTime = (time) => {
	if (!time) {
		return undefined;
	}
	const ojDateTime = new Date(time);
	const day = ojDateTime.getDate();
	const month = ojDateTime.getMonth() + 1;
	const fullYear = ojDateTime.getFullYear();

	const fullTime = new Date(time).getTime();
	const timeNow = new Date().getTime();

	const seconds = Math.floor((timeNow - fullTime) / 1000);
	if (seconds < 60) {
		return "vừa xong";
	}
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) {
		return `${minutes} phút trước`;
	}
	const hours = Math.floor(minutes / 60);
	if (hours < 24) {
		return `${hours} giờ trước`;
	}
	const days = Math.floor(hours / 24);
	if (days < 30) {
		return `${days} ngày trước`;
	}
	const months = Math.floor(days / 30);
	if (months < 12) {
		return `${day} tháng ${month}`;
	}
	return `${day} tháng ${month}, ${fullYear}`;
};
