import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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
    }, []);
    
    const signUp = async (name: string, email: string, password: string) => {};
    const signIn = async (email: string, password: string) => {};
    const signOut = async () => {}; 

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
