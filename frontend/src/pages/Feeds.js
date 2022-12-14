import {useReducer, useState} from "react";
import useInterval from "../hooks/useInterval";
import {styled} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import {CircularProgress, LinearProgress, TextField, useTheme} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import {IconButton} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {serverURL, durationToTimeout, responseStrings, defaultToastPromiseMessages} from "../common/variables";
import RefreshIcon from "@mui/icons-material/Refresh";
import httpClient from "../common/httpClient";
import {ArrowLeft, ArrowRight, DeleteForever, RemoveCircle, RemoveCircleOutline} from "@mui/icons-material";
import {Toaster} from "react-hot-toast";
import {toastDecorated, toastDecoratedPromise} from "../common/fns";

let cc = console.log;

function Feeds(){
    const theme = useTheme();
    const [feedToAdd, setFeedToAdd] = useState("");

    let feedsFromDatabase = [];
    let optionsForUI = {
        max_results_per_column: 7,
        columns_displayed: 2,
    };

    if (
        (localStorage.getItem("feeds") !== null)
        &&
        (JSON.parse(localStorage.getItem("feeds")).length !== 0)
    ){
        feedsFromDatabase = JSON.parse(localStorage.getItem("feeds"))
    }

    if (
        (localStorage.getItem("options") !== null)
        &&
        (JSON.parse(localStorage.getItem("options")).length !== 0)
    ){
        optionsForUI = JSON.parse(localStorage.getItem("options"))
        optionsForUI = optionsForUI[0]
    }

   const cardDirections = {
       left: "left",
       right: "right",
   }

   const [feeds, setFeeds] = useState(feedsFromDatabase);

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
        rssEntriesLimit: optionsForUI.max_results_per_column,
        columnsPerRow: optionsForUI.columns_displayed,
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

    let feedDOMCards = feeds.map((e, k) => {
        return (
            <RSSCard key={e.feed_url}
                     feed_url={e.feed_url}
                     position={k}
                     options = {options}
                     optionsDispatch = {optionsDispatch}
                     feeds = {feeds}
                     setFeeds={setFeeds}
                     cardDirections={cardDirections}
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
                                <Button variant={"contained"} onClick={(e) => {
                                    saveOptions(options);
                                }}>Save Options</Button>
                            </div>
                        </ListItem>
                    <TextField variant={"standard"} sx={{width: "90%", paddingLeft: "18px"}} placeholder={"Feed URL"}
                               value={feedToAdd} onChange={(e) => {
                                   setFeedToAdd(e.target.value);
                    }}/>
                    <ListItem>
                        <div className={"menuItemButtons"}>
                            <Button variant={"contained"} onClick={(e) => {
                                handleAddFeed(feedToAdd, feeds, setFeeds);
                            }}>Add Feed</Button>
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className={"menuItemButtons"}>
                            <Button variant={"contained"} onClick={(e) => {
                                saveFeeds(feeds);
                            }}>Save Feeds</Button>
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className={"menuItemButtons"}>
                            <Button variant={"contained"} onClick={(e) => {
                                handleLogout();
                            }}>Logout</Button>
                        </div>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    ));

    return (
        <>
            <Toaster
                position={"bottom-center"
            }/>
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
        </>
    )
}

function RSSCard({feed_url, position, options, optionsDispatch, feeds, setFeeds, cardDirections}){
    const [rssResults, setRSSResults] = useState(undefined);
    const [getEntriesNow, setGetEntriesNow] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const loadingStateOptions = { notLoading: "not-loading", loading: "loading", error: "error-loading" }
    const [reloading, setReloading] = useState(loadingStateOptions.notLoading);
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

    const AccordionOptions = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .03)'
                : 'rgba(0, 0, 0, .1)',
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
        if (rssResults !== undefined) setReloading(loadingStateOptions.loading);
        setGetEntriesNow(false);
        getXML(feed_url, setRSSResults, setReloading, willRefresh, setWillRefresh, loadingStateOptions);
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
        <div className={"basicFlex"}>
            <ArrowLeft onClick={(e) => {
                handleMoveCard(position, cardDirections.left, cardDirections, feeds, setFeeds);
            }}/>
            <RemoveCircleOutline fontSize={"small"} onClick={(_e) => {
                setFeeds((prev) => {
                    let newArray = [...prev];
                    newArray.splice(position, 1);
                    return newArray;
                });
            }}/>
            &nbsp;
            <Typography variant="subtitle" component="h2" className={"feedTitle basicMargin"}>
                {rssResults?.feedTitle}
            </Typography>
            &nbsp;
            <RefreshIcon fontSize={"small"} onClick={(_e) => {
                setGetEntriesNow(true)
            }}/>
            <ArrowRight onClick={(e) => {
                handleMoveCard(position, cardDirections.right, cardDirections, feeds, setFeeds);
            }}/>
        </div>
    )

    let reloadingIndicator = (<></>);


    //TODO Add logic to show red if load errored.
    if (reloading === loadingStateOptions.loading){
        reloadingIndicator = (
            <div className={"reloadingIndicator"}>
                <LinearProgress/>
            </div>
        );
    } else if (reloading === loadingStateOptions.notLoading){
        reloadingIndicator = (
            <div className={"reloadingIndicator"}>
                <LinearProgress variant="determinate" value={100} />
            </div>
        );
    } else if (reloading === loadingStateOptions.error){
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
            {rssResults === undefined && <CircularProgress/>}
            {rssResults !== undefined && panelsFromRSSTitles}
            {reloadingIndicator}
          </>
      </div>
      </>
    );
}

async function getXML(feed_url, setRSSResults, setReloading, willRefresh, setWillRefresh, loadingStateOptions){
    let results;
    let error = false;

    try {
        results = await httpClient.post(`${serverURL}/xml/getXML`, {feedURL: feed_url});
    } catch (e){
        cc(e)
        error = true;
    }

    if (error === true || !results?.data){
        setReloading(loadingStateOptions.error);
        return;
    }

    setRSSResults(results.data.data);
    setReloading(loadingStateOptions.notLoading);
    if (!willRefresh) setWillRefresh(true);
}

function handleMoveCard(itemPosition, directionToMove, cardDirections, feeds, setFeeds){
    let newFeedsArray = [...feeds];

    const changeValueBasedOnDirection = {
        left: -1,
        right: +1,
    }

    if (
        ((directionToMove === cardDirections.left) && (itemPosition > 0))
        ||
        ((directionToMove === cardDirections.right) && (itemPosition < feeds.length-1))
    ){

        let originallyRightEntry = newFeedsArray[itemPosition];
        let originallyLeftEntry = newFeedsArray[itemPosition + changeValueBasedOnDirection[directionToMove]];

        newFeedsArray[itemPosition + changeValueBasedOnDirection[directionToMove]] = originallyRightEntry;
        newFeedsArray[itemPosition] = originallyLeftEntry;
    }

    setFeeds(newFeedsArray);
}

function handleAddFeed(feedToAdd, feeds, setFeeds){
    let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    let regex = new RegExp(expression);
    if (!feedToAdd.match(regex)) {
        toastDecorated(responseStrings.invalidURL);
        return;
    }

    let duplicate = false;

    for (let i = 0; i < feeds.length; i++){
        if (feedToAdd === feeds[i].feed_url){
            toastDecorated(responseStrings.duplicateURL);
            duplicate = true;
            break;
        }
    }

    if (duplicate === true) return;

    let newEntryReformatted = {feed_url: feedToAdd}

    setFeeds((prev) => {
        return [...prev, newEntryReformatted];
    });
}

async function handleLogout(){
    let response = await toastDecoratedPromise(httpClient.post(serverURL + "/login/logout"), defaultToastPromiseMessages);
    if (response.status === 200){
        localStorage.clear();
        window.location.href = "/";
    }
}

async function saveOptions(options){
    let response = await toastDecoratedPromise(httpClient.post(serverURL + "/usrsettings/options", options), defaultToastPromiseMessages);
}

async function saveFeeds(feeds){
    let feedsReformatted = [];

    for (let entry of feeds){
        feedsReformatted.push(entry.feed_url);
    }

    let response = await toastDecoratedPromise(httpClient.post(serverURL + "/usrsettings/savefeeds", feedsReformatted), defaultToastPromiseMessages);
}

export default Feeds;