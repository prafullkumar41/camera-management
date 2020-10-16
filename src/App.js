import React,{useState,useEffect} from 'react';
import Header from "./component/Header.component";
import Middle from "./component/Middle.component";
import Bottom from "./component/Bottom.component";

import './App.css';

function App() {
  const [apiData, setapiData] = useState([])


  useEffect(() => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url ='https://s3.us-east-2.amazonaws.com/ftilab.com/api/traffic-counter-cameras.json'
    fetch(proxyurl + url)
    .then((resp) => resp.json())
    .then((data) => {
      setapiData([data.data])  
    })
    .catch(err => console.log(err))
  },[])
  return (
    <div className="App">
      <Header/>
      <Middle data={apiData}/>
      <Bottom data={apiData}/>
      
    </div>
  );
}

export default App;
