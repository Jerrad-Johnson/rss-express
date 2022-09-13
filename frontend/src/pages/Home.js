import {useEffect, useReducer, useState} from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Container} from "@mui/material";
import {Typography} from "@mui/material";

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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={"mainContainer"}>
                {feedDOMCards}
            </div>
        </ThemeProvider>
    )
}



function RSSCard({url, position, options, optionsDispatch}){
    const [rssResults, setRSSResults] = useState("Loading.");
    const [getEntriesNow, setGetEntriesNow] = useState(true);
    const [expanded, setExpanded] = useState(false);
/*    const [rssEntriesLimit, setRSSEntriesLimit] = useState(7); //TODO Allow users to change this*/

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
        setRSSResults("Loading.");
        getXML(url, setRSSResults);
        setGetEntriesNow(false);
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
      <Container className={"rssCardContainer"}>
          <>
            {feedTitle}
            {rssResults === "Loading." && "LOADING"}
            {rssResults !== "Loading." && panelsFromRSSTitles}
          </>


      </Container>
      </>
    );
}

async function getXML(url, setRSSResults){
    let results = await axios.post("http://localhost:3001/xml/getXML", {feedURL: url});
    setRSSResults(results.data);
    cc(results.data);
}

export default Home;