import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if user is logged in
    useEffect(() => {
        const checkUser = async () => {
            // Fetch the current user (if any) from your Django backend
            try {
                const res = await fetch('/auth/me'); // Endpoint to get user info
                const data = await res.json();
                if (data.user) {
                    setUser(data.user);
                }
            } catch (err) {
                console.error(err);
            }
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        const res = await fetch('/auth/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.status === 'success') {
            setUser(data.user);
        } else {
            console.error(data.message);
        }
    };

    const signup = async (email, password, name) => {
        const res = await fetch('/auth/signup/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json();
        if (data.status === 'success') {
            setUser(data.user);
        } else {
            console.error(data.message);
        }
    };

    const logout = async () => {
        await fetch('/auth/logout/', { method: 'POST' });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
