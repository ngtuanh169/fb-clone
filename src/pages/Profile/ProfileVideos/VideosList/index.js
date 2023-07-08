import VideoItem from "./VideoItem";
function VideosList({ data = [] }) {
    return (
        <div className=" grid grid-cols-2 lg:grid-cols-5 gap-2 p-2">
            {data.length > 0 &&
                data.map((item) => <VideoItem key={item.id} data={item} />)}
        </div>
    );
}

export default VideosList;
