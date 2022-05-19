import * as S from './supermetrics.types';
import { SlToken } from './sl-token.property';

export type HttpMethod = GoogleAppsScript.URL_Fetch.HttpMethod;
export type FetchOptions = {
    params?: Record<string, string | number>;
};

export class SupermetricsFacade {
    private readonly apiUrl: string = 'https://api.supermetrics.com/';
    private readonly config: S.Params.Authorize;

    constructor(params: S.Params.Authorize) {
        this.config = params;
    }

    authorize(): S.Data.Authorize {
        const { data } = this.fetch<S.Data.Authorize, S.Params.Authorize>(
            '/assignment/register',
            'post',
            this.config
        );
        return data;
    }

    getPosts(page: number): S.Data.GetPosts {
        let token = SlToken.get();
        if (!token) {
            const { sl_token } = this.authorize();
            token = SlToken.set(sl_token);
        }
        const { code, data } = this.fetch<S.Data.GetPosts>(
            '/assignment/posts',
            'get',
            null,
            { params: { sl_token: token, page } }
        );
        /*
            500 is returned on any error even if unauthorized
            401 is a correct code in that case
            based on this I could make more clear exit from recursion
        */
        if (code === 500) {
            SlToken.delete();
            return this.getPosts(page);
        }
        return data;
    }

    private fetch<T, P = null>(
        url: string,
        method: HttpMethod,
        payload: P,
        options: FetchOptions = {}
    ): { code: number; data: T } {
        const res = UrlFetchApp.fetch(this.buildUrl(url, options.params), {
            method,
            contentType: 'application/json',
            payload: payload ? JSON.stringify(payload) : undefined,
            muteHttpExceptions: true,
        });
        const code = res.getResponseCode();
        const { data }: S.Response<T> = JSON.parse(res.getContentText());
        return { code, data };
    }

    private buildUrl(str: string, params?: FetchOptions['params']): string {
        const baseUrl = this.apiUrl.endsWith('/')
            ? this.apiUrl.substring(0, this.apiUrl.length - 1)
            : this.apiUrl;
        const pathname = str.startsWith('/')
            ? str.substring(1, this.apiUrl.length)
            : str;
        let url = `${baseUrl}/${pathname}`;

        if (params) {
            const query = Object.entries(params).map(
                ([key, value]) => `${key}=${value}`
            );
            if (Object.keys(query).length) {
                url += `?${query.join('&')}`;
            }
        }

        return url;
    }
}
