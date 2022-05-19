export interface SuccessResponse<T> {
    data: T;
}

export type Response<T> = {
    meta: {
        request_id: string;
    };
} & SuccessResponse<T>;

export interface Post {
    id: string; // 'post6282422c523e1_591fdf4f'
    from_name: string; // 'Woodrow Lindholm'
    from_id: string; // 'user_14'
    message: string; // lorem ipsum
    type: 'status';
    created_time: string; // '2022-05-16T08:39:22+00:00'
}

export namespace Data {
    export interface Authorize {
        client_id: string;
        email: string;
        sl_token: string;
    }

    export interface GetPosts {
        page: number;
        posts: Post[];
    }
}

export namespace Params {
    export interface Authorize {
        client_id: string;
        email: string;
        name: string;
    }
}
