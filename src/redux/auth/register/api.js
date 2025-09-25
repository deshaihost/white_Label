import { APICore } from '../../../helper/apiCore';
import * as URL from '../../../helper/apiEndPoint';

const api = new APICore();

function registerEndPoint(params) {
    const { data } = params;
    return api.create(URL.REGISTER, data);
}


export {
    registerEndPoint,
};

