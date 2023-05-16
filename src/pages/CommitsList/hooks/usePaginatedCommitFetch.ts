import React, { useCallback, useEffect, useState } from 'react';
import { useGithubApi } from '../../../utils/githubApi/githubApi';
import { useParams } from 'react-router-dom';

export default function usePaginatedCommitFetch(user: string, repo: string) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<undefined | Error>()
    const [data, setData] = useState<Array<any>>([])
    const [page, setPage] = useState(1)
    const api = useGithubApi();

    const fetchMoreCommits = useCallback(() => {
        setIsLoading(true)
        setPage((curPage) => curPage + 1)
    }, [setPage])

    useEffect(() => {
        if (user && repo) {
            api.request('GET /repos/{owner}/{repo}/commits', {
                owner: user,
                repo,
                page,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            }).then((resp) => {
                setData([...data, ...resp.data])
            }).catch((err) => {
                setError(err)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }, [page, user, repo])

    return {isLoading, error, data, fetchMoreCommits}
}
