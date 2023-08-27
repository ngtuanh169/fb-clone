import { Fragment, useState, useEffect, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "./Layout/DefaultLayout";
import NotFound from "./pages/NotFound";
import { Routes, Route, useNavigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import { addUser } from "./redux/actions/user";
import authApi from "./api/authApi";
import NewNotification from "./Components/NewNotification";
import StatusMessage from "./Components/StatusMessage";
import ScrollTop from "./Components/ScrollTop";
import CheckLogin from "./Components/CheckLogin";
import { SocketProvider } from "./Socket";
export const ScreenSize = createContext();
function App() {
    const accessToken = localStorage.getItem("accessToken");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [checkLogin, setCheckLogin] = useState(true);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(() => {
        const handleSize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleSize);
        return () => window.removeEventListener("resize", handleSize);
    }, []);
    useEffect(() => {
        const getMe = async () => {
            try {
                const res = await authApi.getMe();
                dispatch(addUser(res[0]));
                setCheckLogin(false);
            } catch (error) {
                console.log(error);
            }
        };
        accessToken && checkLogin && getMe();
        if (!accessToken) {
            setCheckLogin(false);
            navigate("/login");
        }
    }, []);
    return (
        <SocketProvider>
            <ScreenSize.Provider value={windowSize}>
                <ScrollTop />
                <StatusMessage />
                {checkLogin && <CheckLogin />}
                {!checkLogin && (
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        {privateRoutes.map((route, index) => {
                            let Layout = DefaultLayout;
                            const Page = route.component;
                            if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                            <NewNotification />
                                        </Layout>
                                    }
                                ></Route>
                            );
                        })}
                        {publicRoutes.map((route, index) => {
                            let Layout = DefaultLayout;
                            const Page = route.component;
                            if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                ></Route>
                            );
                        })}
                    </Routes>
                )}
            </ScreenSize.Provider>
        </SocketProvider>
    );
}

export default App;
