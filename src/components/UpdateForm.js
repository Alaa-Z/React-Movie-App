import React, {useState}  from "react";
import {Link}  from "react-router-dom";

import axios from "axios";
import PopUpMsg from "./PopUpMsg";
import { BsFillBackspaceFill } from "react-icons/bs";

const UpdateForm = () => {

  
    const [title, setTitle] = useState(localStorage.getItem('title'));
    const [description, setDescription] = useState(localStorage.getItem('description'));
    const [filmLength, setFilmLength] = useState(localStorage.getItem('filmLength '));
    const [beenWatched, setBeenWatched] = useState((localStorage.getItem('beenWatched')));
    const [filmImage, setFilmImage] = useState(localStorage.getItem('filmImage'));
    const [_id, set_Id] = useState(localStorage.getItem('ID'));

     // ERRORS MSG
     const [errorTitle, setErrorTitle] = useState(false);
     const [errorDescription, setErrorDescription] = useState(false);
     const [errorLength, setErrorLength] = useState(false);
     const [errorImage, setErrorImage] = useState(false);
     
    // for popup msg
    const [open, setOpen] = useState(false);

    const API = 'http://localhost:5000/films';

    const onUpdateFilm =  async ({title, description, beenWatched, filmImage, filmLength, _id}) => {
        var formData1 = new FormData();
          // console.log(data1)
          if(title.length === 0 ) {
            setErrorTitle(true);
            setTimeout(() => {
                    setErrorTitle(false);
            }, 1500);
            return
          }
          if(filmLength.length === 0) {
              setErrorLength(true);
              setTimeout(() => {
                  setErrorLength(false);
          }, 1500);
          return
          }
          if (filmImage.length === 0) {
              setErrorImage(true);
              setTimeout(() => {
                  setErrorImage(false);
          }, 1500);
          }
          if (description.length === 0) {
              setErrorDescription(true);
              setTimeout(() => {
                  setErrorDescription(false);
          }, 1500);
          return;
        }
        var data1 = {
              title: title,
              description: description,
              filmLength: filmLength,
              beenWatched: beenWatched,
              filmImage: filmImage,
              _id : _id
          }
        var prop;
        for(prop in data1){
            formData1.append(prop, JSON.stringify(data1[prop]));
        }

        console.log(data1)
        const result = await axios.put(API+'/'+_id, data1, { headers: {'Content-Type': 'multipart/form-data'}})
        setOpen(true)
        localStorage.setItem('title', data1.title);
        localStorage.setItem('filmImage', data1.filmImage)
        localStorage.setItem('filmLength ', data1.filmLength);
        localStorage.setItem('description', data1.description);
        localStorage.setItem('beenWatched', data1.beenWatched);
        localStorage.setItem('ID', _id)
        }

    return(
      <div>
        <button className="back">
        <Link to="/">
          <BsFillBackspaceFill />
        </Link> 
        </button>
        <form className="updateForm"> 
            <h1>Update Film</h1>
            <label><b>Title:</b></label><br></br>
            <input type="text" className="" defaultValue={title}
                onChange={(e) => {setTitle(e.target.value)  }}/>
            <br></br>
            <div>
                {" "}
                {errorTitle && (
                  <span style={{ color: "red" }}> Please provide a title</span>
                )}{" "}
              </div>
            <label><b>Image:</b></label><br></br>
            <input id="inputFile" name="filmImage" type="file"
            onChange={(e) =>setFilmImage(e.target.files[0]) }
            />
            <span id="filename">filename</span> 
            <br></br>
            <div>
                {" "}
                {errorImage && (
                  <span style={{ color: "red" }}> Please provide a image</span>
                )}{" "}
            </div>
            <label><b>Duration</b></label><br></br>
            <input type="text" className="" defaultValue={filmLength}
                onChange={(e) => { setFilmLength(e.target.value) }}/>
            <br></br>
            <div>
                {" "}
                {errorLength && (
                  <span style={{ color: "red" }}> Please provide a duration </span>
                )}{" "}
              </div>
            <label> <b>Did you watch the movie:</b></label><br></br>
            <div>
                <input type="checkbox"
                defaultChecked={beenWatched}
                onClick={(e) => {
                  setBeenWatched((prevState) => !prevState)
                }}
                 /> 
            </div>
            <br></br>
            <label><b>Description:</b></label><br></br>
             <textarea id="filmDescription" value={description} required
              onChange={(e) => {setDescription(e.target.value) }}>Description</textarea>
             <div>
                {" "}
                {errorDescription && (
                  <span style={{ color: "red" }}> Please provide a Description</span>
                )}{" "}
              </div>
              <button
                type="submit"
                onClick={(event) =>{
                    event.preventDefault();
                    onUpdateFilm({
                        title,
                        filmLength,
                        beenWatched,
                        description,
                        filmImage, 
                        _id
                    });
            }}
            >UPDATE</button>
          {open ?
          <PopUpMsg
              text=" Film Updated!"
              closePopup={() => {
                  setOpen(false);  
                  setTitle(localStorage.getItem('title')) 
                  setDescription(localStorage.getItem('description'))   
                  setFilmLength(localStorage.getItem('filmLength')) 
                  setBeenWatched(localStorage.getItem('beenWatched'))          
                  setFilmImage(localStorage.getItem('filmImage'))          
              }}
          /> 
          : null}
        </form>
        
      </div>
      
    );
}

export default UpdateForm;







