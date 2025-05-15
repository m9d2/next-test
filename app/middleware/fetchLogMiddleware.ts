export default function myMiddleware(useSWRNext: any) {
    return (key: any, fetcher: any, config: any) => {
        const extendedFetcher = (...args: any[]) => {
            return fetcher(...args)
        }
        return useSWRNext(key, extendedFetcher, config)
    }
}
