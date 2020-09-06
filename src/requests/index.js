import { getData, getToken, signUp, checkToken } from './user';
import { get, create, deleteAppointment } from './appointment';

export default {
    user: { getData, getToken, signUp, checkToken },
    appointment: { get, create, deleteAppointment }
};
