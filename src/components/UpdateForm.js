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

    // for popup msg
    const [open, setOpen] = useState(false);

    const API = 'http://localhost:5000/films';

    const onUpdateFilm =  async ({title, description, beenWatched, filmImage, filmLength, _id}) => {
        var formData1 = new FormData();
          var data1 = {
              title: title,
              description: description,
              filmLength: filmLength,
              beenWatched: beenWatched,
              filmImage: filmImage,
              _id : _id
          }
          console.log(data1)

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
                onChange={(e) => {setTitle(e.target.value) }}/>
            <br></br>
            <label><b>Image:</b></label><br></br>
            <input id="inputFile" name="filmImage" type="file" 
            onChange={(e) =>setFilmImage(e.target.files[0]) }
            />
            <br></br>

            <label><b>Duration</b></label><br></br>
            <input type="text" className="" defaultValue={filmLength}
                onChange={(e) => { setFilmLength(e.target.value) }}/>
            <br></br>
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
             <textarea id="filmDescription" value={description}
              onChange={(e) => {setDescription(e.target.value) }}>Description</textarea>
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







