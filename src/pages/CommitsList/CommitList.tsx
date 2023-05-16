import React from 'react';
import { redirect, useParams } from 'react-router-dom';
import CommitRow from './components/CommitRow/CommitRow';
import {usePaginatedCommitFetch} from './hooks/usePaginatedCommitFetch';
import './CommitList.css'
import moment from 'moment';
import Button from '../../components/Button/Button';
import { ROUTES } from '../../Routes';

export default function CommitsList() {
    const { user, repo } = useParams();
    const { error, data, isLoading, fetchMoreCommits } = usePaginatedCommitFetch(user!, repo!);

    if (error) {
        if (error.message === "Not Found") {
            redirect(ROUTES.doesNotExist)
            return null;
        }
        return <p className='CommitListError'>An unexpected error occured</p>
    }
    return (
        <div className='CommitList'>
            <h1 className='CommitListHeader'>Showing results for: /{user}/{repo} </h1>
            <table className='CommitListTable'>
                <tbody>
                    {data.map((commit) =>
                        <CommitRow
                            key={commit.sha}
                            url={commit.html_url}
                            author={commit.commit.author.name}
                            description={commit.commit.message}
                            date={moment(commit.commit.author.date)} />)
                    }
                </tbody>
            </table>
            {isLoading && <p className='CommitListLoading'>loading...</p>}
            {!isLoading && <Button className='CommitListLoadMore' onClick={fetchMoreCommits} children="Load more" />}
        </div>
    );
}
