import { useAuth0 } from "../react-auth0-spa";

const User = () => {
    const { user } = useAuth0();
    if (user){
        return(
            user.name
            )
    }
    else {
        return null
    }
}

export default User