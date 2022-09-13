import {useEffect, useState} from "react";
import axios from "axios";
import {Panel, PanelGroup, Placeholder} from "rsuite";

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
        setRSSResults("Loading.");
        getXML(url, setRSSResults);
        setGetEntriesNow(false);
    }

    let panelsFromRSSTitles = (<></>)

    if (Array.isArray(rssResults.entries) && rssResults.entries.length > 0){
        panelsFromRSSTitles = rssResults.entries.map((e, k) => {
            cc(e)
            return (
                <Panel header={e.title} eventKey={k} className={"panel"} id={`panel${k}`}>
                    <Placeholder.Paragraph> test</Placeholder.Paragraph>
                </Panel>
            );
        });
    }

    return (
      <>
        {rssResults === "Loading." && "LOADING"}
        {/*{rssResults !== "Loading." && rssResults.entries[0].title}*/}

          <PanelGroup accordion defaultActiveKey={2} bordered>
              <Panel header="Panel 1" eventKey={1} id="panel1">
                  <Placeholder.Paragraph />
              </Panel>
              <Panel header="Panel 2" eventKey={2} id="panel2">
                  <Placeholder.Paragraph />
              </Panel>
              <Panel header="Panel 3" eventKey={3} id="panel3">
                  <Placeholder.Paragraph />
              </Panel>
          </PanelGroup>

          <PanelGroup accordion defaultActiveKey={1} bordered className={"panelContainer"}>
              {panelsFromRSSTitles}
          </PanelGroup>




        <button onClick={() => {
            setGetEntriesNow(true);
        }}>Reload</button>
      </>
    );
}

async function getXML(url, setRSSResults){
    let results = await axios.post("http://localhost:3001/xml/getXML", {feedURL: url});
    setRSSResults(results.data);
    cc(results.data);
}

export default Home;