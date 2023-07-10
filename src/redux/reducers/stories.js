import avt from "../../assets/images/avatar/avatar.jpg";
import file from "../../assets/videos/video3.mp4";
const initState = [
    {
        userId: 1,
        storyId: 1,
        name: "Nguyễn Tú Anh",
        avatar: avt,
        time: 1688972155675,
        file,
    },
    {
        userId: 2,
        storyId: 2,
        name: "Nguyễn Văn Hùng",
        avatar: avt,
        time: 1688972155675,
        file,
    },
    {
        userId: 3,
        storyId: 3,
        name: "Tô Anh",
        avatar: avt,
        time: 1688972155675,
        file,
    },
    {
        userId: 4,
        storyId: 4,
        name: "Lâm Tuấn Anh",
        avatar: avt,
        time: 1688972155675,
        file,
    },
    {
        userId: 5,
        storyId: 5,
        name: "Hoàng Văn Hoàng",
        avatar: avt,
        time: 1688972155675,
        file,
    },
    {
        userId: 6,
        storyId: 6,
        name: "Tạ Văn Tùng",
        avatar: avt,
        time: 1688972155675,
        file,
    },
    {
        userId: 7,
        storyId: 7,
        name: "Ma Văn Thứ",
        avatar: avt,
        time: 1688972155675,
        file,
    },
];

const stories = (state = initState, action) => {
    switch (action.type) {
        case "add_stories":
            return [...state, ...action.payload.data];
        default:
            return state;
    }
};

export default stories;
