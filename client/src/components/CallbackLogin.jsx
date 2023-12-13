/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../api/api";


function CallbackLogin({ setUser }) {
    const navigate = useNavigate();
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
                    console.error(err);
                    navigate('/')
                })
        }
    }, []);

    return (<></>);
}
export default CallbackLogin;