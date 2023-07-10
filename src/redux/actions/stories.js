export const addStories = (stories) => {
    //stories là mảng
    return {
        type: "add_stories",
        payload: { data: stories },
    };
};
