import {useEffect, useReducer, useState} from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MuiAppBar from '@mui/material/AppBar';
import {IconButton} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


let serverURL = 'http://localhost:3001';

let cc = console.log;

function Home(){
   const [feeds, setFeeds] = useState([{
       url: "https://slickdeals.net/newsearch.php?mode=frontpage&searcharea=deals&searchin=first&rss=1",
       position: 0,
   }, {
       url: "https://slickdeals.net/newsearch.php?mode=popdeals&searcharea=deals&searchin=first&rss=1",
       position: 1,
   }, {
       url: "http://feeds.feedburner.com/SlickdealsnetUP",
       position: 2
   }]);

   const [drawerState, setDrawerState] = useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerState({ ...drawerState, [anchor]: open });
    };

    const optionsInitialState = {
        rssEntriesLimit: 7,
    }

    const [options, optionsDispatch] = useReducer(optionsReducer, optionsInitialState);

    function optionsReducer(state, action){
        switch(action.type){
            case "setRSSEntriesLimit":
                return {...state, rssEntriesLimit: action.payload};
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

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>

                <ListItem >
                    <div className={"menuItem"}>
                        <span>Max Results</span>
                        <TextField id="standard-basic" type={"number"} value={options.rssEntriesLimit} variant="standard"
                                   sx={{width: "100%"}} onChange={(e) => {
                                       cc(e.target.value)
                                optionsDispatch({type: "setRSSEntriesLimit", payload: +e.target.value})
                            }}/>
                    </div>
                </ListItem>

                {/*                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={"test"} />
                    </ListItemButton>
                </ListItem>*/}

            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );














    const drawerWidth = 200;

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: `-${drawerWidth}px`,
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            }),
        }),
    );

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

        const [open, setOpen] = useState(false);

        const handleDrawerOpen = () => {
            setOpen(true);
        };

        const handleDrawerClose = () => {
            setOpen(false);
        };


    const drawer = ['left'].map((anchor) => (
        <>
            {/*<div key={anchor} className={"menuButtonContainer"}>
                <Box textAlign={"center"}>
                    <Button onClick={toggleDrawer(anchor, true)}>Options</Button>
                </Box>
            </div>*/}

            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2 }}
            >Options</IconButton>

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
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>







{/*            <Drawer
                variant={"persistent"}
                anchor={anchor}
                open={drawerState[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                {list(anchor)}
            </Drawer>*/}
        </>
    ));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={"mainContainer"}>
                <div className={"rssContainer"}>
                    {feedDOMCards}
                </div>
            {drawer}

            </div>

        </ThemeProvider>
    )
}



function RSSCard({url, position, options, optionsDispatch}){
    const [rssResults, setRSSResults] = useState("Loading.");
    const [getEntriesNow, setGetEntriesNow] = useState(true);
    const [expanded, setExpanded] = useState(false);

    if (Array.isArray(rssResults.entries) && rssResults.entries.length > options.rssEntriesLimit) rssResults.entries.splice(options.rssEntriesLimit);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
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
        getXML(url, setRSSResults);
        setGetEntriesNow(false);
        setTimeout(() => {
            setGetEntriesNow(true)
        }, 90000);
    }

    let panelsFromRSSTitles = (<></>)

    if (Array.isArray(rssResults.entries) && rssResults.entries.length > 0){
        panelsFromRSSTitles = rssResults.entries.map((e, k) => {
            return (
                <>
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
                </>
            );
        });
    }

    let feedTitle = (
        <Typography variant="subtitle" component="h2" className={"feedTitle"}>
            {rssResults.feedTitle}
        </Typography>
    )

    return (
      <>
      <div className={"rssCardContainer"}>
          <>
            {feedTitle}
            {rssResults === "Loading." && "LOADING"}
            {rssResults !== "Loading." && panelsFromRSSTitles}
          </>


      </div>
      </>
    );
}

async function getXML(url, setRSSResults){
    let results = await axios.post("http://localhost:3001/xml/getXML", {feedURL: url});
    setRSSResults(results.data);
    cc(results.data);
}

export default Home;