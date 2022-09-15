import {useReducer, useState} from "react";
import useInterval from "../hooks/useInterval";
import axios from "axios";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {CircularProgress, LinearProgress, TextField} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import {IconButton} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {serverURL} from "../common/variables";

let cc = console.log;

function Home(){
   const [feeds, setFeeds] = useState([{
       url: "http://feeds.feedburner.com/SlickdealsnetFP?format=xml",
       position: 0,
   }, {
       url: "http://feeds.feedburner.com/SlickdealsnetHT?format=xml",
       position: 1,
   }, {
       url: "http://feeds.feedburner.com/SlickdealsnetForums-9?format=xml",
       position: 2
   }]);

   const [drawerState, setDrawerState] = useState({
        left: false,
    });

/*    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerState({ ...drawerState, [anchor]: open });
    };*/

    const optionsInitialState = {
        rssEntriesLimit: 7,
        columnsPerRow: 2,
    }

    const [options, optionsDispatch] = useReducer(optionsReducer, optionsInitialState);

    function optionsReducer(state, action){
        switch(action.type){
            case "setRSSEntriesLimit":
                return {...state, rssEntriesLimit: action.payload};
            case "setColumnCount":
                return {...state, columnsPerRow: action.payload};
            default:
                return {...state};
        }
    }

    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    let feedDOMCards = feeds.map((e) => {
        return (
            <RSSCard key={e.position}
                     url={e.url}
                     position={e.position}
                     options = {options}
                     optionsDispatch = {optionsDispatch}
            />
        )
    });

    const [open, setOpen] = useState(false);
    const drawerWidth = 200;

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDrawerToggle = () => {
        setOpen((prev) => !prev);
    }

    const drawer = [0].map((e, k) => (
        <div key={k}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                        <ListItem>
                            <div className={"menuItem"}>
                                <span className={"menuItemSpan"}>Max Results</span>
                                <TextField
                                    id="standard-basic"
                                    value={options.rssEntriesLimit}
                                    variant="standard"
                                    sx={{width: "30%"}}
                                    InputProps={{
                                        inputProps: {
                                            type: 'number',
                                            max: 100, min: 1
                                        }
                                    }}
                                    onChange={(e) => {
                                       optionsDispatch({type: "setRSSEntriesLimit", payload: +e.target.value})
                                    }}
                                />
                            </div>
                        </ListItem>
                    <ListItem>
                        <div className={"menuItem"}>
                            <span className={"menuItemSpan"}>Columns</span>
                            <TextField
                                id="standard-basic"
                                value={options.columnsPerRow}
                                variant="standard"
                                sx={{width: "30%"}}
                                InputProps={{
                                    inputProps: {
                                       type: 'number',
                                       max: 100, min: 1
                                    }
                                }}
                                onChange={(e) => {
                                    optionsDispatch({type: "setColumnCount", payload: +e.target.value})
                                }}
                            />
                        </div>
                    </ListItem>
                </List>
                <Divider />
                <List>
                        <ListItem>
                            <div className={"menuItemButtons"}>
                                <Button variant={"contained"}>Save Options</Button>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className={"menuItemButtons"}>
                                <Button variant={"contained"}>Reload Now</Button>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className={"menuItemButtons"}>
                                <Button variant={"contained"}>Logout</Button>
                            </div>
                        </ListItem>
                </List>
            </Drawer>
        </div>
    ));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <div className={"mainContainer"}>
                    <div className={"rssContainer"}>
                        {feedDOMCards}
                    </div>

                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    edge="start"
                    sx={{ mr: 2 }}
                >Options</IconButton>

                </div>
            {drawer}
        </ThemeProvider>
    )
}

function RSSCard({url, position, options, optionsDispatch}){
    const [rssResults, setRSSResults] = useState("Loading.");
    const [getEntriesNow, setGetEntriesNow] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [reloading, setReloading] = useState("no");
    const [willRefresh, setWillRefresh] = useState(false);


    useInterval(
        () => {
            setGetEntriesNow(true);
        },
        willRefresh ? 120000 : null,
    )

    if (Array.isArray(rssResults?.entries) && rssResults?.entries?.length > options.rssEntriesLimit) rssResults.entries.splice(options.rssEntriesLimit);

    const handleChange = (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };

    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));



    if (getEntriesNow === true) {
        if (rssResults !== "Loading.") setReloading("yes");
        let timer = Math.trunc(Math.random() * (50 - 10) + 10) * 1000
        setGetEntriesNow(false);
        getXML(url, setRSSResults, setReloading, willRefresh, setWillRefresh);
    }

    let panelsFromRSSTitles = (<></>)

    if (Array.isArray(rssResults?.entries) && rssResults?.entries?.length > 0){
        panelsFromRSSTitles = rssResults.entries.map((e, k) => {
            return (
                <div key={k}>
                    <Accordion expanded={expanded === `panel${k}`} onChange={handleChange(`panel${k}`)}>
                        <AccordionSummary
                            aria-controls={`panel${k}bh-content`}
                            id={`panel${k}bh-header`}
                        >
                            <span className={"rssAccordionTitle"}> {e.title} </span>
                        </AccordionSummary>

                        <a href={e.link} target={"_blank"}>
                            <AccordionDetails>
                                    <span className={"rssItemDescription"}>{e.description}</span>
                                    <span className={"rssDateDescription"}>{e.pubDate}</span>
                            </AccordionDetails>
                        </a>
                    </Accordion>
                </div>
            );
        });
    }

    let feedTitle = (
        <Typography variant="subtitle" component="h2" className={"feedTitle"}>
            {rssResults?.feedTitle}
        </Typography>
    )

    let reloadingIndicator = (<></>);


    //TODO Add logic to show red if load errored.
    if (reloading === "yes"){
        reloadingIndicator = (
            <div className={"reloadingIndicator"}>
                <LinearProgress/>
            </div>
        );
    } else if (reloading === "no"){
        reloadingIndicator = (
            <div className={"reloadingIndicator"}>
                <LinearProgress variant="determinate" value={100} />
            </div>
        );
    } else if (reloading === "error"){
        reloadingIndicator = (
            <div className={"reloadingIndicator"}>
                <LinearProgress variant="determinate" value={100} sx={{
                    "& .MuiLinearProgress-bar": { backgroundColor: `rgb(255,0,0,.4)`} }}/>
            </div>
        );
    }

    let columnPerRowCalculation = (100/options.columnsPerRow) + "%";


    return (
      <>
      <div className={"rssCardContainer"} style={{flex: columnPerRowCalculation}}>
          <>
            {feedTitle}
            {rssResults === "Loading." && <CircularProgress/>}
            {rssResults !== "Loading." && panelsFromRSSTitles}

            {reloadingIndicator}
          </>
      </div>
      </>
    );
}

async function getXML(url, setRSSResults, setReloading, willRefresh, setWillRefresh){
    const httpClient = axios.create();
    httpClient.defaults.timeout = 3000;
    let results;
    let error = false;

    try {
        results = await httpClient.post(`${serverURL}/xml/getXML`, {feedURL: url});
    } catch (e){
        cc(e)
        error = true;
    }

    if (error === true || !results?.data){
        setReloading("error");
        return;
    }

    setRSSResults(results.data.data);
    setReloading("no");
    if (!willRefresh) setWillRefresh(true);
}

export default Home;