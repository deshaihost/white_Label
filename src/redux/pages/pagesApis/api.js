import { APICore } from '../../../helper/apiCore';
import * as URL from '../../../helper/apiEndPoint';

const api = new APICore();

function getUserDataEndPoint(params: any): any {
    const { data } = params;
    return api.create(URL.GET_USER_DATA, data);
}


export {
    getUserDataEndPoint,
};
