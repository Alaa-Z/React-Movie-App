import React, {useEffect, useState, Link} from 'react';

import axios from 'axios';
// React icons 
import { BsSearch } from 'react-icons/bs';
// Style 
import "../App.css";
// Components 
import Film from "./Film";
import Add from "./Add"
import PopUpMsg from "./PopUpMsg";


function Home () {
    // ERRORS MSG
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const [errorLength, setErrorLength] = useState(false);
    const [errorImage, setErrorImage] = useState(false);
    
    // Popup msgs 
    const [added, setAdded] = useState(false);
    const [deleted, setDeleted] = useState(false);

    //  To get th data
    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    // To post film
    const API = 'http://localhost:5000/films/';

    useEffect(() => {
        getData();
  }, []);

  // GET ALL FILMS
  const getData =() =>{
    fetch(API)
    .then((res) => res.json())
    .then((result) =>{
      // console.log(result.films)
      setData(result.films)
    })
  }

  // SEARCH FOR FILM TITLE
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = data.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(data)
    }
  }

    // Delete FILM 
    const deleteFilm = (id)=> {
    // console.log(id);
    fetch(API+ "/" +id, {method: 'DELETE'})
      .then(response => response.text())
          .then(data => {
            getData();
            setDeleted(true);
          })
      .catch(error => {
          console.log('There was an error '+error);
      });
    }

    // POST FILM
    const createFilm = async (film)=> {

        var formData = new FormData();
        var data = {
            title: film.title,
            description: film.description,
            filmLength: film.filmLength,
            beenWatched: film.beenWatched,
            filmImage : film.filmImage
        }

        if (data.title === "" ) {
            setErrorTitle(true);
            setTimeout(() => {
                    setErrorTitle(false);
                }, 1500);
            }
        if (data.filmLength.length === 0) {
            setErrorLength(true);
            setTimeout(() => {
                setErrorLength(false);
        }, 1500);
        }
        if (data.filmImage === "") {
            setErrorImage(true);
            setTimeout(() => {
                setErrorImage(false);
        }, 1500);
        }
        if (data.description === "") {
            setErrorDescription(true);
            setTimeout(() => {
                setErrorDescription(false);
        }, 1500);
        return
        }

        var prop;
        for(prop in data){
            formData.append(prop, JSON.stringify(data[prop]));
        }

        const result = await axios.post(API, data, { headers: {'Content-Type': 'multipart/form-data'}})
        console.log(result);
        setAdded(true)
        getData();
    }
    
return (
    <div className='App'>
        <div className='searchContainer'>
            <input id="search"
            placeholder='Search for film....'
            onChange={(e) => searchItems(e.target.value)}
            />
            <span className='search-icon'> < BsSearch /></span>
        </div>
        <div className='container'>
            <div className='post-form'>
                <Add
                onCreateFilm = {createFilm}
                errorTitle= {errorTitle}
                errorLength = {errorLength}
                errorDescription = {errorDescription}
                errorImage = {errorImage}
                />
            </div>
            {added ?
            <PopUpMsg
                text=" Film Added!"
                closePopup={() => {
                    setAdded(false);
                } }
            /> 
        : null}
        {deleted ?
            <PopUpMsg
                text=" Film Deleted!"
                closePopup={() => {
                    setDeleted(false);
                } }
            /> 
        : null}
        <div className='filmsList'> 
            {searchInput.length > 1 ? (
            filteredResults.map(film => (
                <Film 
                    key={film._id}
                    title ={film.title}
                    filmLength ={film.filmLength}
                    description ={film.description}
                    beenWatched ={ film.beenWatched }
                    filmImage = {film.filmImage}
                    film ={film}
                    _id= {film._id}
                    deleteFilm = {deleteFilm}
                />
                ))
            ):
            data.map(film => (
                <Film 
                    key={film._id}
                    title ={film.title}
                    filmLength ={film.filmLength}
                    description ={film.description}
                    beenWatched ={ film.beenWatched}
                    filmImage = {film.filmImage}
                    _id= {film._id}
                    film ={film}
                    deleteFilm = {deleteFilm}
                />))}
        </div>
        </div>
    </div>
  );
}

export default Home;