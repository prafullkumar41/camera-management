import React,{useState} from 'react';
// import axios from 'axios'; axios can be used to upload choosechooseFiles to a server
import { useDropzone } from "react-dropzone"



export default function Bottom(props) {
  const data = props.data[0]
  const [chooseFiles, setchooseFiles] = useState(null)
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ))


  function renderTableData() {
    if (data) {
      return data.map((dta) => {
        var { DeviceID, LastActivityTime, CameraType, Tags } = dta 
        const tags = Tags.join(', ')
        let currDate = new Date( )
        let deviceDate = new Date(LastActivityTime)
        let differinDays = Math.floor((currDate - deviceDate)/(1000*60*60*24))
        if (differinDays > 1 && differinDays < 30) {
          LastActivityTime = differinDays + ' days ago...'
        } 
        else if (differinDays > 30 && differinDays <= 365) {
            var months = Math.floor(differinDays / 30)
            LastActivityTime = months + ' months ago...'
        }
        else if (differinDays > 365){
          var years = Math.floor(differinDays / 365)
          LastActivityTime = years + ' years ago...'
        }
        else {
          var hours = Math.abs((currDate - deviceDate)/(1000*60*60))
          if (hours > 1 && hours < 24) {
            LastActivityTime = Math.floor(hours) + ' hours ago...'
          } else {
            var minutes = hours * 60
            if (minutes === 0) {
              LastActivityTime = 'Just Now...'
            }else{
              LastActivityTime = Math.floor(minutes) + ' minutes ago...'
            }
            
          }
        }
        
        return (
           <tr key={DeviceID}>
              <td>{DeviceID}</td>
              <td>{LastActivityTime}</td>
              <td>{CameraType.toUpperCase()}</td>
              <td>{tags}</td>
           </tr>
        )
     })     
    }
 }

 const fileSelecthandler = event => {
   setchooseFiles(event.target.files[0])
 }
 
const fileUploadHandler = () => {
  console.log('Uploaded To the Server')
  // axios.post('')// We can post to the Url we want
}


  
  return (
    <div className="bottom">
      <table className="table">
        <thead>
          <tr>
            <th>Device Id</th>
            <th>Last Activity</th>
            <th className="tomato">Camera Type</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
            {renderTableData()}
        </tbody>
      </table>
      <div className="drag" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drop files here</p>
      </div>
      <div className="drag" onClick={fileUploadHandler}>{images}</div>
      <br/>
      <input className='upload' type="file" onChange={fileSelecthandler}/>
      <button className='upload blue' onClick={fileUploadHandler}>Upload</button>
    </div>
  )
}
