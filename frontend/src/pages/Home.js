import {useEffect, useState} from "react";
import axios from "axios";
let serverURL = 'http://localhost:3001';

let cc = console.log;

function Home(){
   const [feeds, setFeeds] = useState([{
       url: "https://slickdeals.net/newsearch.php?mode=frontpage&searcharea=deals&searchin=first&rss=1",
       position: 0,
   }, {
       url: "https://slickdeals.net/newsearch.php?mode=popdeals&searcharea=deals&searchin=first&rss=1",
       position: 1,
   }]);

    let feedDOMCards = feeds.map((e) => {
        return (
            <RSSCard key={e.position} url={e.url} position={e.position}/>
        )
    });

    return (
        <>
            {feedDOMCards}
        </>
    )
}

function RSSCard({url, position}){
    const [rssResults, setRSSResults] = useState("Loading.");
    const [getEntriesNow, setGetEntriesNow] = useState(true);

    if (getEntriesNow === true) {
        getXML(url, setRSSResults);
        setGetEntriesNow(false);
    }

    return (
      <>
          {rssResults !== "Loading." && rssResults.entries[0].title}
      </>
    );
}

async function getXML(url, setRSSEntries){
    let results = await axios.post("http://localhost:3001/xml/getXML", {feedURL: url});
    setRSSEntries(results.data);
    cc(results.data);
}

export default Home;