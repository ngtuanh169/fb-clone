import { Fragment } from "react";
import DefaultLayout from "./Layout/DefaultLayout";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
function App() {
    return (
        <Routes>
            {privateRoutes.map((route, index) => {
                const Layout = DefaultLayout;
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
    );
}

export default App;
