import React,{useState,useEffect} from 'react'

export default function Middle(props) {
  const [time,setTime] =useState(0)

  const unique = []
  if (props.data[0]) {
      props.data[0].map( (tag) => {
        tag.Tags.map(ta => unique.push(ta))
    })
  }
  const uniqueTags = unique.filter((item,index) => 
    unique.indexOf(item) === index
  )
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time => time + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
   
  return (
    <div className="middle-main">

      <div className="middle">
        <h4>Search</h4>
        <input type='text' className='input-text'placeholder="search element by Id"></input>
                  <select  className='select tomato' >
                      { 
                        uniqueTags?
                        uniqueTags.map((dta,index) => (                            
                          <option key={index} value={dta}>{dta}</option>
                        ))
                          :
                          null
                      }
                  </select>
          
        </div>  
        <div className="middle-right"> 
            {props.data[0] ? 
              time < Object.keys(props.data[0]).length ? <img src={props.data[0][time]['SnapshotSignedUrl']} alt=""/>: setTime(0)
            : null}
        </div>       
    </div>
  )
}
