import React, { useState, useContext, useEffect } from "react"
import { getAuth, updateProfile } from "firebase/auth";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import { DropzoneArea } from 'react-mui-dropzone';
import { storage } from '../../firebase/initFirebase'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"

const UserProfileUi = () => {


    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        console.log(displayName, photoURL, emailVerified)
        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;
    }
    const [displayName, setDisplayName] = useState(user.displayName)
    const [email, setEmail] = useState(user.email)
    const [imageUrl, setImageUrl] = useState(user.photoURL);
    const [image, setImage] = useState(null)
    const [progresspercent, setProgresspercent] = useState(0)
    const [imageLoadingComplete, setImageLoadingComplete] = useState(null)

    useEffect(() => {
        updateProfile(auth.currentUser, {
            displayName: displayName, photoURL: `${imageUrl}`
        }).then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }, [imageLoadingComplete]);

    const handleSubmit = () => {
        event.preventDefault()
        const storageRef = ref(storage, `/avatars/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);

            },
            (error) => {
                alert(error);
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImage(null)
                    setImageUrl(downloadURL)

                    setImageLoadingComplete(true)
                });

            }

        );

    }
    console.log(imageUrl)
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="center" justify="center" direction="column" >
                    <Grid item>
                        <Avatar sx={{ width: '20em', height: '20em', mt: '1em' }} alt="Image" src={imageUrl} />
                    </Grid>
                    <Grid item>
                        <TextField
                            sx={{ mt: '1em' }}
                            id="email"
                            name="Email"
                            label="Email"
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            sx={{ mt: '1em', mb: '1em' }}
                            id="displayName"
                            name="displayName"
                            label="Display Name"
                            type="text"
                            value={displayName}
                            onChange={(event) => setDisplayName(event.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            maxFileSize={1000000}
                            filesLimit='1'
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(files) => setImage(files[0])}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" type="submit" style={{

                            margin: "5px"
                        }}>
                            Update
                        </Button>

                    </Grid>
                </Grid>
            </form >
        </>
    )
}

export default UserProfileUi