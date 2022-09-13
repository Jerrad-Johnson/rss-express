import axios from "axios";
let serverURL = 'http://localhost:3001';

let cc = console.log;

function Home(){

    getXML("https://slickdeals.net/newsearch.php?mode=frontpage&searcharea=deals&searchin=first&rss=1");
    return (
        <>
            Test
        </>
    )
}

async function getXML(url){
    let results = await axios.post("http://localhost:3001/xml/getXML", {feedURL: url});
    cc(results.data);

}

export default Home;