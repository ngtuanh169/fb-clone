import { Fragment, useState, useEffect, createContext } from "react";
import DefaultLayout from "./Layout/DefaultLayout";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import NewNotification from "./Components/NewNotification";
import ScrollTop from "./Components/ScrollTop";
export const ScreenSize = createContext();
function App() {
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
    return (
        <ScreenSize.Provider value={windowSize}>
            <ScrollTop />

            <Routes>
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
        </ScreenSize.Provider>
    );
}

export default App;
