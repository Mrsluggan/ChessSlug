import { request, setAuthToken, setUser} from '../../axios_helper';

export const handleRegister = (firstName: string, lastName: string, login: string, password: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        request("POST", "/register", JSON.stringify({ firstName, lastName, login, password })).then((data) => {
            console.log(data);
            handleLogin(login, password).then((res) => {
                if (res === true) {
                    resolve(true);
                } else {
                    reject(new Error("Login failed"));
                }
            }).catch((error) => {
                console.log(error);
                setAuthToken("");
                reject(error);
            });
        }).catch((error) => {
            console.log(error);
            setAuthToken("");
            reject(error);
        });
    });
};

export const handleLogin = async (login: string, password: string): Promise<boolean> => {
    return request("POST", "/login", JSON.stringify({ login, password }))
        .then((response) => {
            if (response.data?.token) {
                setAuthToken(response.data?.token);
                
                setUser(response.data);
                return true;
            } else {
                localStorage.clear();
                return false;
            }
        })
        .catch((error) => {
            console.log(error);
            localStorage.clear();
            return false;
        });
};

export const handleLogout = () => {
    window.location.reload();
    localStorage.clear();
}