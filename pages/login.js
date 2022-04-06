import React, { useContext } from "react"

import { AuthContext } from "../context/AuthContext"
import { useRouter } from "next/router"
import EmailPasswordAuthLogin from "../src/ui/emailPasswordAuthLogin"



const Login = () => {
    const { currentUser } = useContext(AuthContext)
    const Router = useRouter()

    if (currentUser) {
        Router.push("/")
        return <></>
    } else {
        return (
            <EmailPasswordAuthLogin />
        )
    }
}

export default Login