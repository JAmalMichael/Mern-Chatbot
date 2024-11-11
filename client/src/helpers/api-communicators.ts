import axios from "axios"

//an asynchronous function that uses the post request to send in data to the designated routes
export const loginUser = async (email: string, password: string) => {
    const res = await axios.post('/user/login', {
        email,
        password
    });
    
        if(res.status !== 200) {
            throw new Error ("unable to login")
        }
        const data = await res.data;
        return data;
}            
export const checkAuthStatus = async () => {
    const res = await axios.get('/user/auth-status');
    
        if(res.status !== 200) {
            throw new Error ("unable to authenticate");
        }
        const data = await res.data;
        return data;
}