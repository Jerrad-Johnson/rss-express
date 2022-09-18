import {Box, Card, Container, Paper, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {useState} from "react";


export default function Login(){
    const [email, setEmail] = useState("");

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

function handleLogin(email){

}