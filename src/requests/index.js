import { getData, getToken, signUp, checkToken } from './user';
import { get, create } from './appointment';

export default {
    user: { getData, getToken, signUp, checkToken },
    appointment: { get, create }
};
