import React, { useEffect, useState } from 'react';
import { useGithubApi } from '../../utils/githubApi/githubApi';
import { useParams } from 'react-router-dom';
import CommitRow from './components/CommitRow/CommitRow';
import usePaginatedCommitFetch from './hooks/usePaginatedCommitFetch';
import './CommitList.css'
import moment from 'moment';
import Button from '../../components/Button/Button';

export default function CommitsList() {
    const { user, repo } = useParams();
    const { error, data, isLoading, fetchMoreCommits } = usePaginatedCommitFetch(user!, repo!);

    if (error) {
        if (error.message === "Not Found") {
            return <p className='CommitListError'>Could not find repo</p>
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
