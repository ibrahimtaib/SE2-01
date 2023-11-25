import { useNavigate } from "react-router-dom";


function CallbackLogin({ setUser }) {
    const navigate = useNavigate();
    const mockUser = {
        id: 1,
        name: 'Non cambia!',
        role: 'teacher',
    };
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userString = params.get('user');
        const userIDString = params.get('userID');

        if (userString) {
            //TODO: API for the user 
            mockUser.name = userString;
            setUser(mockUser);
            navigate('/');
            setIsDelayedActionComplete(true);

        }
    }, []);

    return (<></>);
}
export default CallbackLogin;