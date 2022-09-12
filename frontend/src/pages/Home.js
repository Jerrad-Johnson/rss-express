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
    let results = await axios.post("http://localhost:3001/xml/getXML", {test: "idk"});
    cc(results.data);

}

export default Home;