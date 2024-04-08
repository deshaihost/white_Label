import { APICore } from '../../../helper/apiCore';
import * as URL from '../../../helper/apiEndPoint';

const api = new APICore();

function getUserDataEndPoint(params: any): any {
    const { data } = params;
    return api.get(URL.GET_USER_DATA, data);
}

function postCreateCheckoutSessionEndPoint(params: any): any {
    const { data } = params;
    return api.create(URL.POST_CREATE_CHECKOUT_SESSION, data);
}

function updateAccountInfoEndPoint(params: any): any {
    const { data } = params;
    return api.update(URL.UPDATE_ACCOUNT_INFO, data);
}


export {
    getUserDataEndPoint,
    postCreateCheckoutSessionEndPoint,
    updateAccountInfoEndPoint
};
