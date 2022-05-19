import { SupermetricsFacade } from './facades';
import { GetDataParams, UserProperty } from './types';
import { getFields } from './getSchema';

const mockRequest = {
    configParams: {
        email: 'dufa456@gmail.com',
        postLimit: '1000' as const,
        name: 'Evghenii Notarius',
    },
    scriptParams: { lastRefresh: '1652733182946' },
    fields: [{ name: 'postLength' }, { name: 'userName' }],
};
PropertiesService.getUserProperties().setProperty(
    UserProperty.CLIENT_ID,
    'ju16a6m81mhid5ue1z3v2g0uh'
);

export const getData = (request: GetDataParams = mockRequest) => {
    console.log(request);
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
    const postMap: Record<string, number> = {};
    for (let page = 1, postAmount = 0; postAmount < postLimit; page++) {
        const res = facade.getPosts(page);
        for (let i = 0; i < res.posts.length; i++) {
            const post = res.posts[i];
            postMap[post.from_id] = (postMap[post.from_id] || 0) + 1;
        }
        postAmount += res.posts.length;
        console.log(`page:${page} - amount:${postAmount}`);
    }
    console.log(postMap);

    const cc = DataStudioApp.createCommunityConnector();
    const response = cc.newGetDataResponse().setFields(getFields());
    response.addAllRows(Object.entries(postMap.entries));

    return response.build();
};
