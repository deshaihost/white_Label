import { APICore } from '../../../helper/apiCore';
import * as URL from '../../../helper/apiEndPoint';

const api = new APICore();

function loginEndPoint(params: any): any {
    return api.create(URL.LOGIN, params);
}


export {
    loginEndPoint,
};
