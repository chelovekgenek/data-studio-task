import { SupermetricsFacade } from './facades';
import { GetDataParams, UserProperty } from './types';
import { getFields } from './getSchema';

export const getData = (request: GetDataParams): void => {
    const clientId = PropertiesService.getUserProperties().getProperty(
        UserProperty.CLIENT_ID
    );
    if (!clientId) return;

    const facade = new SupermetricsFacade({
        client_id: clientId,
        email: request.configParams.email,
        name: request.configParams.name,
    });

    const postLimit = Number(request.configParams?.postLimit) || 100;
    const postMap: Record<string, string> = {};
    for (let page = 1, postAmount = 0; postAmount < postLimit; page++) {
        const res = facade.getPosts(page);
        for (let i = 0; i < res.posts.length; i++) {
            const post = res.posts[i];
            postMap[post.from_id] = String(
                (Number(postMap[post.from_id]) || 0) + 1
            );
        }
        postAmount += res.posts.length;
    }
    const cc = DataStudioApp.createCommunityConnector();
    const response = cc.newGetDataResponse().setFields(getFields());
    response.addAllRows(Object.entries(postMap));

    return response.build();
};
