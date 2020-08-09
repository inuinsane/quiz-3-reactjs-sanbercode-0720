import React, { createContext, useState } from 'react';


export const AuthContext = createContext();

export const AuthProvider = props => {
    const [status, setStatus] =  useState(false);
    const [dataUser, setDataUser] = useState({
        username: 'admin',
        password: '@dm1n',
    });

    return (
        <AuthContext.Provider value={[status, setStatus, dataUser, setDataUser]}>
            {props.children}
        </AuthContext.Provider>
    )
}