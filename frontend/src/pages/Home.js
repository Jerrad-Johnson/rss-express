import axios from "axios";
let serverURL = 'http://localhost:3001';

let cc = console.log;

function Home(){

    getXML();
    return (
        <>
            Test
        </>
    )
}

async function getXML(url){
    await axios({
            method: 'POST',
            url: `${serverURL}/xml/getXML`,
            data: {
                rssURL: JSON.stringify("https://slickdeals.net/newsearch.php?mode=frontpage&searcharea=deals&searchin=first&rss=1")
            },
            headers: {
                'Content-Type': 'text/xml'
            }
        },
    )
        .then((response) => {
            cc(response);
        });
}

export default Home;