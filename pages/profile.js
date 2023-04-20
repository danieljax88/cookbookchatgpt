import React, { useContext } from "react"

import { AuthContext } from "../context/AuthContext"
import { useRouter } from "next/router"
import EmailPasswordReset from "../src/ui/emailPasswordReset"
import UserProfileUi from "../src/ui/UserProfileUi"



const Profile = () => {
    const { currentUser } = useContext(AuthContext)
    const Router = useRouter()

    if (currentUser) {
        return (
            <UserProfileUi />
        )
    } else {
        return (
            Router.push("/")
        )
    }
}

export default Profile