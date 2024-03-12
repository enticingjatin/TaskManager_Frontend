import React, { useState } from 'react'
import MyContext from "./contextConfig";

const MyState = (props) => {
    const initialData = {
        loggedIn: false,
        userToken: null
    }

    const [context, setContext] = useState(initialData)

    return (
        <MyContext.Provider value={{ context, setContext }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState