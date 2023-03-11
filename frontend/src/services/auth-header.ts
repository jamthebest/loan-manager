import { useAuthUser } from 'react-auth-kit';

const auth = useAuthUser();

export default function authHeader() {
    let user = auth();
    if (user && user.access_token) {
        return { Authorization: 'Bearer ' + user.access_token };
    } else {
        return { Authorization: '' };
    }
}