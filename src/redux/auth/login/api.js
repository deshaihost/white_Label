import { APICore } from '../../../helper/apiCore';
import * as URL from '../../../helper/apiEndPoint';

const api = new APICore();

function loginEndPoint(params: any): any {
    const { data } = params;
    return api.create(URL.LOGIN, data);
}


export {
    loginEndPoint,
};
