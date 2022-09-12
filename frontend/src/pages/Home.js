import axios from "axios";

let cc = console.log;

function Home(){

    getXML();
    return (
        <>
            Test
        </>
    )
}

async function getXML(url = `https://slickdeals.net/newsearch.php?mode=frontpage&searcharea=deals&searchin=first&rss=1`){
    await axios({
            method: 'GET',
            "url": url,
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