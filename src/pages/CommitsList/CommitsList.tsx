import React, { useEffect, useState } from 'react';
import { useGithubApi } from '../../utils/githubApi/githubApi';
import { useParams } from 'react-router-dom';
import CommitRow from './components/CommitRow/CommitRow';
import usePaginatedCommitFetch from './hooks/usePaginatedCommitFetch';
import './CommitList.css'
import moment from 'moment';

export default function CommitsList() {
    const { user, repo } = useParams();
    const { error, data, isLoading, fetchMoreCommits } = usePaginatedCommitFetch(user!, repo!);

    if (error) {
        if (error.message === "Not Found") {
            return <div>Could not find repo</div>
        }
        return <div>An unexpected error occured</div>
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
            {isLoading && <div>loading...</div>}
            {!isLoading && <button onClick={fetchMoreCommits}>Load more</button>}
        </div>
    );
}
