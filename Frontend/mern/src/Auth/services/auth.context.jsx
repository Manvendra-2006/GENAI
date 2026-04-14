import { createContext, useState } from "react";

export const AuthContext = createContext()
export function AuthProvider({ children }) {
    const [User, setUser] = useState(null)
    const [loading, setloading] = useState(false)
    return (
        <AuthContext.Provider value={{ User, setUser, loading, setloading }} >
            {children}
        </AuthContext.Provider>
    )
}