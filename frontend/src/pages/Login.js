import {Box, Card, Container, Paper, TextField, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {useState} from "react";
import httpClient from "../common/httpClient";
import {serverURL} from "../common/variables";


export default function Login(){
    const [email, setEmail] = useState("");
    const theme = useTheme();

    return (
        <div className={"loginContainer"}>
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
    if (!validateEmail(email)) return; //TOAST
    let result = await httpClient.post(serverURL + "/login", email);
    if (result.message === "Success") window.location.href = "/";
    return; // TOAST

}

function validateEmail(email){
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}