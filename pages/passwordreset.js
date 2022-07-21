import React, { useContext } from "react"

import { AuthContext } from "../context/AuthContext"
import { useRouter } from "next/router"
import EmailPasswordReset from "../src/ui/emailPasswordReset"



const Login = () => {
    const { currentUser } = useContext(AuthContext)
    const Router = useRouter()

    if (currentUser) {
        Router.push("/")
        return <></>
    } else {
        return (
            <EmailPasswordReset />
        )
    }
}

export default Login