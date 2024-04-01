import { APICore } from '../../../helper/apiCore';
import * as URL from '../../../helper/apiEndPoint';

const api = new APICore();

function sendPasswordResetEmailEndPoint(params: any): any {
    const { data } = params;
    return api.create(URL.SEND_PASSWORD_RESET_EMAIL, data);
}


export {
    sendPasswordResetEmailEndPoint,
};
