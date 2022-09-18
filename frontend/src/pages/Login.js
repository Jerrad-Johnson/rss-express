import {Box, Card, Container, Paper, TextField, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {useState} from "react";
import httpClient from "../common/httpClient";
import {defaultToastPromiseMessages, errorStrings, responseStrings, serverURL} from "../common/variables";
import toast, {Toaster} from "react-hot-toast";
import {toastDecorated, toastDecoratedPromise} from "../common/fns";

let cc = console.log;

export default function Login(){
    const [email, setEmail] = useState("");
    const theme = useTheme();

    return (
        <div className={"loginContainer"}>
            <Toaster
            position={"bottom-center"
            }/>
            <Typography variant={"h4"} component={"h1"}>
                Login
            </Typography>
            <div className={"evenly my-8"}>
                <div>
                    <TextField variant={"standard"} placeholder={"E-mail address"}
                    value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
                </div>

                <div>
                    <Button variant={"contained"} onClick={(e) => {
                        e.preventDefault();
                        handleLogin(email);
                    }}>Submit</Button>
                </div>
            </div>

            <Typography>
                If you do not have an account, one will be created automatically.
            </Typography>

        </div>
    )
}

async function handleLogin(email) {
    if (!validateEmail(email)) {
        toastDecorated(responseStrings.invalidEmail)
        return;
    }

    let result = await toastDecoratedPromise(getLogin(email), defaultToastPromiseMessages);
    if (result.message === responseStrings.success) window.location.href = "/";
}

async function getLogin(email){
    return await httpClient.post(serverURL + "/login", {"email": email});
}

function validateEmail(email){
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}