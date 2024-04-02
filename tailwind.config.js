/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                hover: "#e5e7eb",
                bgModal: "rgb(var(--color-bg-modal) / 0.8)",
                matteBlack: "rgb(var(--color-matteBlack) / 0.7)",
                matteBlack2: "rgb(var(--color-matteBlack) / 0.3)",
                matteBlack3: "rgb(var(--color-matteBlack) / 0.9)",
                matteGray: "rgb(var(--color-matteGray) / 0.5)",
            },
            backgroundImage: {
                urlNavIcons:
                    "url('https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/VmCHzrfvU1w.png')",
                urlIcons:
                    "url('https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/BIWLlTEZ9Z4.png')",
                urlIcons2:
                    "url('https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/JGSnPtKWL6p.png')",
                urlIcons3:
                    "url('https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/1aJkS5O7tya.png')",
                urlIcons4:
                    "url('https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/dX5WoC_N0lP.png')",
                urlIcons5:
                    "url('https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/K_JV4KD8eC_.png')",
                bgFileDetails:
                    "url('https://res.cloudinary.com/dziswrfiq/image/upload/v1695986309/facebook_clone/banner/a1_t3ujjs.jpg')",
            },
            backgroundSize: {
                szNavIcons: "37px 555px",
                szIcons: "189px 169px",
                szIcons2: "41px 381px",
                szIcons3: "25px 1715px",
                szIcons4: "30px 2190px",
                szIcons5: "22px 312px",
            },
            backgroundPosition: {
                //bg-navIcons
                friendIcon: "0 -296px",
                groupIcon: "0 -37px",
                watchIcon: "0 -518px",
                marketplaceICon: "0 -407px",
                //bg-icons
                settingIcon: "-84px -105px",
                questionMarkIcon: "0px -412px",
                leftIcon: "-75px -59px",
                //bg-icons2
                exclamationMarkIcon: "0px -214px",
                lockAndHeartIcon: "0px -234px",
                //bg-icons3
                feedTable: "0px -1116px",
                language: "0px -885px",
                letters: "0px -780px",
                squareWarning: "-10px -5px",
                //bg-icons4
                userIcon4: "0px -990px",
                groupIcon4: "0px -1080px",
                commentIcon4: "0px -900px",
                //bg-icons5
                joinGroup: "0px -168px",
                joinedTheGroup: "0px -150px",
            },
            dropShadow: {
                custom1: "0 2px 2px #6f6c6c",
                custom2: "0 2px 0px #6f6c6c",
                dropBottom: "0 3px 0 #6f6c6c",
                shadow001: "0 0 2px #ccc",
                shadow012: "0 1px 2px #ccc",
            },
            keyframes: {
                buttonVideo: {
                    "0%": { transform: "scale(1) ", opacity: "1" },
                    "100%": { transform: "scale(2) ", opacity: "0" },
                },
                zommInx2: {
                    from: { transform: "scale(1)" },
                    to: { transform: "scale(2)" },
                },
                growUp: {
                    from: { transform: "scale(0)" },
                    to: { transform: "scale(1)" },
                },
                openNewNoti: {
                    from: { transform: "translateY(200px)" },
                    to: { transform: "translateY(0)" },
                },
                closeNewNoti: {
                    from: { transform: "translateY(0)" },
                    to: { transform: "translateY(200px)" },
                },
                postsIcon: {
                    "0%": {
                        transform: "scale(1) rotate(0)",
                    },
                    "30%": {
                        transform: "scale(1.3) rotate(-20deg)",
                    },
                    "70%": {
                        transform: "scale(1.3) rotate(-20deg)",
                    },
                    "100%": {
                        transform: "scale(1) rotate(0)",
                    },
                },
                smaller: {
                    from: { transform: "scale(1)" },
                    to: { transform: "scale(0)" },
                },
                loading: {
                    "0%": { backgroundColor: "#676565" },
                    "70%": { backgroundColor: "transparent" },
                    "100%": { backgroundColor: "transparent" },
                },
                loadingCircleLine: {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                },
                statusMess: {
                    from: { width: "100%" },
                    to: { width: "0%" },
                },
                openStatusMess: {
                    from: { transform: "translateX(-350px)" },
                    to: { transform: "translateX(0)" },
                },
                closeStatusMess: {
                    "0%": { transform: "translateX(0)" },
                    "20%": { transform: "translateX(30px)" },
                    "100%": { transform: "translateX(-350px)" },
                },
                SkeletonLoading: {
                    "0%": { left: "-50%" },
                    "50%": { left: "100%" },
                    "100%": { left: "-50%" },
                },
                dotNotification: {
                    "0%": { top: "0`" },
                    "15%": { top: "-2px" },
                    "30%": { top: "0" },
                    "40%": { top: "-2px" },
                    "50%": { top: "0" },
                    "100%": { top: "0" },
                },
            },
            transitionProperty: {
                height: "height",
            },
            animation: {
                buttonVideo: "buttonVideo 0.4s linear forwards",
                growUp: "growUp 0.2s linear",
                openNewNoti: "openNewNoti 0.2s ease-out",
                closeNewNoti: "closeNewNoti 0.2s ease-out",
                postsIcon: "postsIcon .5s linear ",
                postsIcon: "postsIcon .5s linear ",
                smaller: "smaller .3s linear",
                loading: "loading 3s linear infinite",
                statusMess: "statusMess 3s linear forwards ",
                openStatusMess: "openStatusMess 0.3s linear forwards ",
                closeStatusMess: "closeStatusMess 0.3s linear forwards ",
                SkeletonLoading: "SkeletonLoading 3s linear infinite ",
                loadingCircleLine: "loadingCircleLine 1.2s infinite ",
                dotNotification: "dotNotification 1.2s infinite ",
            },
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        require("tailwind-scrollbar"),
    ],
    variants: {
        scrollbar: ["rounded"],
    },
};
