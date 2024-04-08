import { APICore } from '../../../helper/apiCore';
import * as URL from '../../../helper/apiEndPoint';

const api = new APICore();

function logoutEndPoint(params: any): any {
    const { data } = params;
    return api.create(URL.LOGOUT, data);
}

export {
    logoutEndPoint,
};
