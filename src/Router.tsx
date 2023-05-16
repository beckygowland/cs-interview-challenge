import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import RepoForm from './pages/RepoForm/RepoForm';
import CommitList from './pages/CommitsList/CommitList';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { ROUTES } from './Routes';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.commitList} element={<CommitList />} />
                <Route path={ROUTES.home} element={<RepoForm />} />
                <Route path={ROUTES.doesNotExist} element={<PageNotFound />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
