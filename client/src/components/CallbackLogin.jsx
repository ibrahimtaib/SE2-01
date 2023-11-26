import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkUser } from "../api/api";


function CallbackLogin({ setUser }) {
    const navigate = useNavigate();
    const mockUser = {
        id: 1,
        name: 'Non cambia!',
        role: 'teacher',
    };
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userIDString = params.get('userID');

        if (userIDString) {
            checkUser({ id: userIDString })
                .then((res) => {
                    setUser(res.data);
                    navigate('/')

                })
                .catch((err) => {
                    navigate('/')
                })
        }
    }, []);

    return (<></>);
}
export default CallbackLogin;