export const ROUTES = {
    commitList: "/:user/:repo",
    home: "/",
    doesNotExist: '/does/not/exist'
}

// This is overkill for the current situation, but sets up a 
// good pattern for updating routes as an app scales and links are harder to track down
export function getCommitsListUrl(user: string, repo: string) {
    return replaceVariables(ROUTES.commitList, {user, repo})
}

function replaceVariables(url: string, variables: any) {
    let replacedUrl = url;
    Object.keys(variables).forEach((key) => {
        replacedUrl = replacedUrl.replace(`:${key}`, variables[key])
    })
    return replacedUrl
}