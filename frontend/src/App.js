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
                          <Route path={"/"} element={<Home
                              theme = {theme}/>}/>

                          <Route path={"/login"} element={<Login
                              theme = {theme}
                          />}/>
              </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
