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
    let request = new XMLHttpRequest();
    await request.open("GET", url, true);
    cc(4)
    request.onreadystatechange = () => {
        cc(5)
    }
}

export default Home;