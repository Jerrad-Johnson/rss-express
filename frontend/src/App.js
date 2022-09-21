import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Feeds from "./pages/Feeds";
import Login from "./pages/Login";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import LoginRecruiter from "./pages/LoginRecruiter";

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
                  <Route path={"/feeds"} element={<Feeds
                    />}/>
                  <Route path={"/"} element={<Login
                    />}/>
                  <Route path={"/recruiterlogin"} element={<LoginRecruiter
                    />}/>
              </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
