-   Required

*   Return correct http codes by API
*   Improve error handling logic in facade
*   Add interceptors logic for fetch. It could be achieved through Proxy.
*   Check that key is valid in setCredentials
*   Test coverage

-   Optional

*   Configure CI/CD
    -   Run Tests and Build script for Merge Requests
    -   Deploy by tag or when in master branch
*   Inject project variables on deploy stage(SUPERMETRICS_API_URL)
*   Use bundler(webpack, parcel) to build js before push to remote
*   Better type coverage
*   Linter
*   Git hooks
    -   Run prettier when committing
    -   Run tests when pushing
