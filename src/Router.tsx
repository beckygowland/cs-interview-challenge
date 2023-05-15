import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import RepoForm from './pages/RepoForm/RepoForm';
import CommitsList from './pages/CommitsList/CommitsList';
import PageNotFound from './pages/PageNotFound/PageNotFound';

export const ROUTES = {
    commitsList: "/:user/:repo",
    home: "/",
}

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.commitsList} element={<CommitsList />} />
                <Route path={ROUTES.home} element={<RepoForm />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
