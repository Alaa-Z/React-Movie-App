import React, {useState} from "react";
import {Link}  from "react-router-dom";
import MoreLessBtn from "./MoreLessBtn";

import { BsFillTrashFill } from "react-icons/bs";
import { BsPencilFill} from "react-icons/bs";
import { BsFillCaretDownFill} from "react-icons/bs";

import { BsFillCaretUpFill} from "react-icons/bs";

const Film = ({title, filmLength, description, beenWatched, filmImage, _id, deleteFilm, onUpdateClick, oldFilm, action, text}) => {
    const API = 'http://localhost:5000/films';

    const [ openDetails, setOpenDetails] = useState(false); // to show more details with Initially false 


    
    const getDataById = () => {
        fetch(API+'/'+_id)
            .then((res) => res.json())
            .then((result) => {
            localStorage.setItem('title', result.film.title);
            localStorage.setItem('filmImage', filmImage)
            localStorage.setItem('filmLength ', filmLength);
            localStorage.setItem('description', description);
            localStorage.setItem('beenWatched', beenWatched);
            localStorage.setItem('ID', _id)
        })
        setTimeout(() => {
            window.location.reload(false);
        }, 500)
    }
    
    return  (
        <div className="filmCard">
            <ul>
                <li>
                    <div className="img-wrapper"> <img src={`http://localhost:5000/${filmImage}`} alt="" width="200" height=""/></div>
                </li>
                <li className="card-title"> {title}</li>
            </ul>
            
            <div className="details">
                 <MoreLessBtn 
                 action={() => {
                 setOpenDetails(!openDetails)
                 } }
                 text = {openDetails === false  ? (<BsFillCaretDownFill/>) :  (<BsFillCaretUpFill/>)}
             />
            </div>
            { openDetails 
                ? // If true
            <ul className="second-ul">
            <li> <i>{filmLength}</i> </li>
            <li className="card-description"> {description}</li>
            <li> <b>Status: </b> {beenWatched === true ? 'I Already watched' : 'I did Not watched it'} </li>
            {/* <li> {_id}</li> */}
            <li> <button className="delete-btn"
                    onClick={(e) =>{
                    e.preventDefault();
                    deleteFilm(_id);
                    }}> <BsFillTrashFill /> </button>
            </li>
            <li> <Link to={`${_id}`}> 
                <button className="update-btn"
                    onClick={() => getDataById()}>
                    <BsPencilFill />
                </button> 
                </Link>
            </li>
            </ul>
            : // If false nothing to show
             null  
            }  
        </div>

    );
}

export default Film;