import { APICore } from '../../../helper/apiCore';
import * as URL from '../../../helper/apiEndPoint';

const api = new APICore();

function getSeccionIdEndPoint(params: any): any {
    const { data } = params;
    return api.create(URL.GET_SESSION_INITIALIZE, data);
}

function chatBoxAIEndPoint(params: any): any {
    const { data } = params;
    return api.create(URL.CHAT_BOX_AI, data);
}


export {
    getSeccionIdEndPoint,
    chatBoxAIEndPoint
};
