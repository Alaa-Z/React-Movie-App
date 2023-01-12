import React, {useState}  from "react";


const Add = ({errorTitle, errorDescription,errorLength, errorImage, onCreateFilm}) => {
   
    
    // for check box
    const[isCkecked, setIsCkecked] = useState(false);
  

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [filmLength, setFilmLength] = useState("");
    const [beenWatched, setBeenWatched] = useState(false);
    const [filmImage, setFilmImage] = useState(''); 
    
    return(
        <form className="addForm"> 
        <h1> Add Film:  </h1>
            <label>Title:</label><br></br>
            <input type="text" className="filmTitle" value={title}
                onChange={(e) => { setTitle(e.target.value) }}/>
            <br></br>
            <div>
                {" "}
                {errorTitle && (
                  <span style={{ color: "red" }}> Please provide a title</span>
                )}{" "}
              </div>
            <label>Image:</label><br></br>
            <input id="inputFile" name="filmImage" className="filmImage" type="file" onChange={(e) =>setFilmImage(e.target.files[0])} />
            <br></br>
            <div>
                {" "}
                {errorImage && (
                  <span style={{ color: "red" }}> Please provide a image</span>
                )}{" "}
              </div>
            <label>Duration:</label><br></br>
            <input type="text" className="filmLength" value={filmLength}
                onChange={(e) => {setFilmLength(e.target.value)}}
            />
            <div>
                {" "}
                {errorLength && (
                  <span style={{ color: "red" }}> Please provide a Length</span>
                )}{" "}
              </div>
            <br></br>
            <label>Did you watch the movie:</label><br></br>
            <div>
                <input type="checkbox"
                    className="filmBennWatched"
                    checked= {beenWatched}
                    onChange={(e) => {
                        setBeenWatched((prevState) => !prevState)
                        setIsCkecked((prevState) => !prevState)   
                    }
                }
                />
                {isCkecked === true ? 'Yes' : 'No'}    
            </div>
        
            <br></br>
            <label>Description:</label><br></br>
            <textarea id="filmDescription" value={description}
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
                    onCreateFilm({
                        title,
                        filmLength,
                        beenWatched,
                        description,
                        filmImage
                    });
            }}
            >Add Film</button>
        </form>
    );
}

export default Add;






