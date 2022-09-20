import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {

  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />

        <BrowserRouter>
              <Routes>
                          <Route path={"/feeds"} element={<Home
                             />}/>

                          <Route path={"/"} element={<Login
                            />}/>
              </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
