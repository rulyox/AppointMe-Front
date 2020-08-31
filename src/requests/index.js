import { getData } from './user';
import { get, create } from './appointment';

export default {
    user: { getData },
    appointment: { get, create }
};
