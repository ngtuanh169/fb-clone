import Home from "../pages/Home";
import Videos from "../pages/Videos";
import Marketplace from "../pages/Marketplace";
import Groups from "../pages/Groups";
import Games from "../pages/Games";
const publicRoutes = [];

const privateRoutes = [
	{ path: "/", component: Home },
	{ path: "/videos", component: Videos },
	{ path: "/marketplace", component: Marketplace },
	{ path: "/groups", component: Groups },
	{ path: "/games", component: Games },
];

export { publicRoutes, privateRoutes };
