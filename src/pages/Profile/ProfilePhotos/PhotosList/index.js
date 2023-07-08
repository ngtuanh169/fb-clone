import PhotoItem from "./PhotoItem";
function PhotosList({ data = [] }) {
    return (
        <div className=" grid grid-cols-2 lg:grid-cols-5 gap-2 p-2">
            {data.length > 0 &&
                data.map((item) => <PhotoItem key={item.id} data={item} />)}
        </div>
    );
}

export default PhotosList;
