import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkAuthStatus, signInUser, signOutUser, signUpUser } from "../helpers/api-communicator";

type User = {
    name: string;
    email: string;
}

type UserAuth = {
    user: User|null;
    isSignedIn: boolean;
    signUp: (name:string, email:string, password:string)=> Promise<void>;
    signIn: (email:string, password:string)=> Promise<void>;
    signOut: ()=> Promise<void>;
}

const AuthContext = createContext<UserAuth|null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User|null>(null);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    useEffect(() => {
        // Check if user is signed in by verifying cookie from server
        async function checkStatus(){
            const result = await checkAuthStatus();
            setUser({name: result.name, email: result.email});
            setIsSignedIn(true);
            }
        checkStatus();  
        }, []);
    
    const signUp = async (name: string, email: string, password: string) => {
        const data = await signUpUser(name, email, password);
        if(data==="ERROR"){
            console.log("Error in Sign Up")
        }
        setUser({name: data.name, email: data.email});
    };
    const signIn = async (email: string, password: string) => {
        const data = await signInUser(email, password);
        if(data==="ERROR"){
            console.log("Error in Sign In")
        }
        setUser({name: data.name, email: data.email});
        setIsSignedIn(true);
    };
    const signOut = async () => {
        const response = await signOutUser();   
        if(response === "ERROR"){
            console.log("Error in Sign Out");
        }
        setUser(null);
        setIsSignedIn(false);
        window.location.reload();
    }; 

    const value = {
        user,
        isSignedIn,
        signUp,
        signIn,
        signOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext);
