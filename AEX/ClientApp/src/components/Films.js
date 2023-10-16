import { useEffect, useState } from "react"
import ModalButton from "./ModalButton"
import "./Film.css";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const URL = "/api/films"
const genresURL = "/api/films/genres"
const actorsURL = "/api/films/actors"

const Films = () => {
    const [allFilms, setFilms] = useState([])
    const [foundedFilms, setFoundedFilms] = useState([])
    const [allGenres, setGenres] = useState([])
    const [allActors, setActors] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [selectedActors, setSelectedActors] = useState([])

    //получение списка всех жанров
    const getGenres = async () => {
        const options = {
            method: "GET",
            headers: new Headers()
        }
        const result = await fetch(genresURL, options)
        if (result.ok){
            const genres = await result.json()
            setGenres(genres)
            return genres
        }
        return []
    }

    //получение списка всех актёров
    const getActors = async () => {
        const options = {
            method: "GET",
            headers: new Headers()
        }
        const result = await fetch(actorsURL, options)
        if (result.ok){
            const actors = await result.json()
            setActors(actors)
            return actors
        }
        return []
    }

    //получение всех фильмов
    const getFilms = async () => {
        const options = {
            method: "GET",
            headers: new Headers()
        }
        const result = await fetch(URL, options)
        if (result.ok){
            const films = await result.json()
            setFilms(films)
            return films
        }
        return []
    }

    //добавление фильма
    const addFilm = async () => {
        const titleFromInput = document.querySelector('#title').value
        const descriptionFromInput = document.querySelector('#description').value

        if (titleFromInput.trim().length === 0){
            alert('Введите название фильма')
            return
        }
        if (descriptionFromInput.trim().length === 0){
            alert('Введите описание фильма')
            return
        }
        if (selectedActors.length === 0){
            alert('Выберите хотя бы одного актёра')
            return
        }

        if (selectedGenres.length === 0){
            alert('Выберите хотя бы один жанр')
            return
        }

        const newFilm = {
            title: titleFromInput.trim(),
            description: descriptionFromInput.trim(),
            actors: selectedActors,
            genres: selectedGenres
        }


        const headers = new Headers()
        headers.set('Content-Type', 'application/json')

        const options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newFilm)
        }

        const result = await fetch(URL, options)
        if (result.ok){
            const film = await result.json()
            allFilms.push(film)
            setFilms(allFilms.slice())
        }
    }

    //удаление фильма
    const deleteFilm = (id) => {
        const options = {
            method: "DELETE",
            headers: new Headers()
        }
        fetch(URL + `/${id}`, options)

        setFilms(allFilms.filter(x => x.id !== id))
    }

    //обновление информации о фильме
    const updateFilm = async (oldFilm) => {
        const headers = new Headers()
        headers.set('Content-Type', 'application/json')

        const options = {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(oldFilm)
        }

        const result = await fetch(URL, options)
        if (result.ok){
            const film = await result.json()
            const updatedFilm = allFilms.find(x => x.id === oldFilm.id)
            allFilms[updatedFilm] = film
            setFilms(allFilms.slice())
        }
    }


    
    const actorClick = (target, actor) => {
        if (target.classList.contains('active')){
            target.classList.remove('active')
            setSelectedActors(selectedActors.filter(x => x.id !== actor.id))
        }
        else{
            target.classList.add('active')
            selectedActors.push(actor)
            setSelectedActors(selectedActors.slice())
        }
    }

    const genreClick = (target, genre) => {
        if (target.classList.contains('active')){
            target.classList.remove('active')
            setSelectedGenres(selectedGenres.filter(x => x.id !== genre.id))
        }
        else{
            target.classList.add('active')
            selectedGenres.push(genre)
            setSelectedGenres(selectedGenres.slice())
        }
    }
 
    useEffect(() => {
        getFilms()
        getGenres()
        getActors()
    }, [])

    return (
        <div>
            <div>
                <h4>Добавить фильм</h4>
                <div >
                    <input id="title" type="text" className="input-wrapper" placeholder="Название"></input>
                </div>
                <div >
                    <textarea id="description" className="input-wrapper" placeholder="Описание"/>
                </div>

                <div className="actors-list">
                    <h3>Выберите актёров</h3>
                    {allActors.map(x => <ActorItem 
                                                key={x.id} 
                                                actor={x} 
                                                selectAction={actorClick}
                                                />)}
                </div>
                <br></br>
                <div className="genres-list">
                    <h3>Выберите жанры</h3>
                    {allGenres.map(x => <GenreItem 
                                                key={x.id} 
                                                genre={x} 
                                                selectAction={genreClick}
                                                />)}
                </div>
                <div>
                    <button id='addFilmButton' onClick={() => addFilm()}>Добавить фильм</button>
                </div>
                
            </div>
            <hr></hr>
            <div  style={{display: 'flex'}}>
                <div style={{marginRight: '10px'}}><h3>Фильмы</h3></div>
                <SearchBar 
                getFilms={getFilms}
                setResults={setFilms}/>
            </div>
            
            
            <div>
                {allFilms.map(x => <FilmItem 
                                            key={x.id} 
                                            film={x} 
                                            deleteAction={deleteFilm}
                                            updateAction={updateFilm}
                                            />)}
            </div>
        </div>  
    )
}


export default Films; 

const FilmItem = ({film, deleteAction, updateAction}) => {
    return (
        <div style={{margin: "5px", backgroundColor:"whitesmoke", padding: "10px", borderRadius: "10px"}}>
            <h3>{film.title}</h3>
            <p>{film.description}</p>
            <div className="actors-list">
                <h5>Актёры</h5>
                {film.actors?.map(x => <ActorItem 
                                            key={x.id} 
                                            actor={x} 
                                            selectAction={() => {}}
                                            />)}
            </div>
            <br></br>
            <div className="genres-list">
                <h5>Жанры</h5>
                {film.genres?.map(x => <GenreItem 
                                            key={x.id} 
                                            genre={x} 
                                            selectAction={() => {}}
                                            />)}
            </div>
            <div style={{display: 'flex'}}>
                <button className='film-button' onClick={() => deleteAction(film.id)} >Удалить</button>
                <ModalButton 
                    btnName={'Обновить'} 
                    title='Обновить фильм'
                    modalContent={
                        <div>
                            <div style={{margin: "10px"}}>
                                <input 
                                    className="input-wrapper"
                                    id="title" 
                                    type="text" 
                                    defaultValue={film.title}
                                    onChange={e => film.title = e.target.value.trim()}
                                />
                            </div>
                            <div style={{margin: "10px"}}>
                                <textarea 
                                    className="input-wrapper"
                                    id="description" 
                                    defaultValue={film.description}
                                    onChange={e => film.description = e.target.value.trim()}
                                />
                            </div>
                            <button 
                                id="update-button"
                                onClick={() => updateAction(film)} 
                                style={{marginLeft: "10px", border: "none", padding: "7.5px", borderRadius: "5px"}}
                            >Обновить</button>
                        </div>
                    }
                    />
            </div>
        </div>
    )
}


const ActorItem = ({actor, selectAction}) => {
    return(
        <div className="actor-item" onClick={e => selectAction(e.target, actor)}>
            {actor.name + ' ' + actor.surname}
        </div>
    )
}

const GenreItem = ({genre, selectAction}) => {
    return(
        <div className="genre-item" onClick={e => selectAction(e.target, genre)}>
            {genre.name}
        </div>
    )
}

//строка поиска и отправка запроса на поиск
const SearchBar = ({ getFilms, setResults }) => {
    const [input, setInput] = useState("");
    const fetchData = async (value) => {
        if (value.trim() === ""){
            getFilms()
            return
        }
        const URL = "/api/films/search=" + value
        setResults([])
        const result = await fetch(URL)
        if (result.ok){
            const films = await result.json()
            setResults(films)
        }
    };
  
    const handleChange = (value) => {
      setInput(value);
    };
  
    return (
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="Введите название фильма, жанр или актёра"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button id="search-button" onClick={() => fetchData(input)}>Найти</button>
      </div>
    );
  };