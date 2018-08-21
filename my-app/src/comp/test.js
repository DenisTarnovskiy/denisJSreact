import React, { Component } from 'react';
import * as Rx from 'rxjs';
import { from } from 'rxjs';


const axios = require('axios');class Test extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // state массив фильмов
            movies: [],
            showPopup: false,
            currentVideo: '',
            page: 1,
            value: '',
            genres: [],

        };
        this.updateInput = this.updateInput.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    getMovies() {
        // обьявляем массив, в котором будет окончательный результат со всеми фильмами
        let moviesArray = [];
        const apiKey = '95787530723fdf659807136ee61b9df9';


        // получаем все фильмы


    //     let response = fetch("https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&primary_release_year=2018&page=' + this.state.page")
    //         .then(response => {
    //             return response.json();
    //         });
    //
    //     let stream = Rx.Observable.fromPromise(response)
    //         .map(data => data.videos
    //         .map(video =>
    //             ({
    //                 'id': video.id,
    //                 'title': video.title,
    //                // 'rating': rating,
    //                 'picture': video.poster_path,
    //               //  'videos': movieVideos
    //             })
    //         )
    //         );
    // }


        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&primary_release_year=2018&page=' + this.state.page)
            .then(movies => {
                // перебираем все получаенные фильмы
                console.log(movies);
                movies.data.results.forEach((movie, movieIndex) => {
                    // обьявляем массив, в который будет записываться все видео фильма
                    let movieVideos = [];
                    // получаем все видео по одному фильму
                    axios.get('https://api.themoviedb.org/3/movie/'+ movie.id +'/videos?api_key=' + apiKey + '&language=en-US')
                        .then(videos => {
                            // перебираем все видео
                            videos.data.results.forEach((video, videoIndex) => {
                                // добавляем видео в массив



                                movieVideos.push(video.key);
                                // проверяем, если количество полученных видео равна индексу последнего видео в массиве, тогда добавлем фильм в массив окончательных фильмов
                                if (videoIndex+1 === videos.data.results.length){
                                    // неведомая залупа, сейвим рейтинг в переменную
                                    const rating = movie.vote_average;

                                    moviesArray.push({
                                        'id':movie.id,
                                        'title' : movie.title,
                                        'rating': rating,
                                        'picture': movie.poster_path,
                                        'videos': movieVideos,
                                        'genres': movie.genre_ids,
                                        'genres_names': [],
                                        'isChecked': false
                                    });

                                }
                            });
                            this.state.movies.forEach((movie) => {

                                movie.genres.forEach((genre, index_genre) => {

                                    this.state.genres.forEach((element, index) => {


                                        if (genre === element.id) {


                                            moviesArray.push({

                                                'genres_names': element.name
                                            });



                                            console.log(genre + " URA, wa have genre - " + element.name);
                                            console.log(this.state.movies.genres_names + " имя жанра по id");
                                        }
                                        else element++


                                    });


                                });

                                console.log('_________________________')

                            });
                            // проверяем, если количество полученных фильмов равна индексу последнего фильма в массиве, тогда сохраняем результат в state
                            if (movieIndex+1 === movies.data.results.length){
                                //
                                this.setState({movies: moviesArray});

                                let array_geners = [];
                                    this.state.movies.forEach((movie) => {
                                       // console.log(movie.genres);
                                       // for (var i in movie.genres) {
                                            movie.genres.forEach((genre, index_genre) => {
                                            //console.log(movie.genres[i]+" genre current")
                                            // for (var element in this.state.genres) {
                                                    this.state.genres.forEach((element, index) => {
                                                        //   console.log(element.id+" element")

                                                            if (genre === element.id) {

                                                                movie.genres_names[index_genre] = element.name;




                                                                console.log(genre + " URA, wa have genre - " + element.name);
                                                                console.log(this.state.movies.genres_names + " имя жанра по id");
                                                            }
                                                            else element++


                                                    });


                                        });

                                        console.log('_________________________')

                                    });
                                console.log(this.state.movies)


                            }

                            //console.log(this.state.movies)
                        });
                });
            });

    }

    getGenres() {

        let genre_array = [];

        const apiKey = '95787530723fdf659807136ee61b9df9';


        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=en-US')
            .then(genres_id => {
                console.log(genres_id);
                genres_id.data.genres.forEach((genre, genre_index) => {
                        genre_array.push({
                            'id': genre.id,
                            'name': genre.name
                        });

                     }
                );
                this.setState({genres: genre_array});
                console.log(this.state.genres);

                // this.state.genres.forEach((genre) => {
                //
                //     console.log(genre.id+' ===>'+genre.name);
                //
                //
                // });
            });
        }

    componentDidMount() {

        this.getGenres();

        this.getMovies();

    }


    checkedToggle  = (movie_id) => {
        this.state.movies.forEach((movie, index) => {
            if (movie.id === movie_id ){

                if (movie.isChecked) {
                    movie.isChecked = false;

                } else {
                    movie.isChecked = true;
                }
                console.log(movie);

            }
        });
        // this.state.movies[0].isChecked = false;
        // console.log(movie_id+"op op");


    };

    popupToggle (video) {
        if(video) {
            this.setState({currentVideo: video , showPopup: true});
        } else {
            this.setState({currentVideo: '', showPopup: false});
        }
    }

    handleChange(counter) {
        console.log(this.state.page);
        if(this.state.page + counter !== 0){
            console.log('change');
            this.setState({page: this.state.page + counter});
            this.getMovies();
        }
        console.log(this.state.page);
    }

    videoSearch(stringName){

        let foundFilms = [];

        const apiKey = '95787530723fdf659807136ee61b9df9';
        // получаем все фильмы

        axios.get("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + stringName + " &page=1&include_adult=false")
            .then(movies => {
                // перебираем все получаенные фильмы
                console.log(movies);
                movies.data.results.forEach((movie, movieIndex) => {
                    // обьявляем массив, в который будет записываться все видео фильма
                    let movieVideos = [];
                    // получаем все видео по одному фильму
                    axios.get('https://api.themoviedb.org/3/movie/'+ movie.id +'/videos?api_key=' + apiKey + '&language=en-US')
                        .then(videos => {
                            // перебираем все видео
                            videos.data.results.forEach((video, videoIndex) => {
                                // добавляем видео в массив
                                movieVideos.push(video.key);
                                // проверяем, если количество полученных видео равна индексу последнего видео в массиве, тогда добавлем фильм в массив окончательных фильмов
                                if (videoIndex+1 === videos.data.results.length){
                                    // неведомая залупа, сейвим рейтинг в переменную, свойством чет нихуя не работает
                                    const rating = movie.vote_average;
                                    foundFilms.push({
                                        'id'     : movie.id,
                                        'title'  : movie.title,
                                        'rating' : rating,
                                        'picture': movie.poster_path,
                                        'videos' : movieVideos,
                                        'genres' : movie.genre_ids

                                    });

                                }
                            });
                            // проверяем, если количество полученных фильмов равна индексу последнего фильма в массиве, тогда сохраняем результат в state
                            if (movieIndex+1 === movies.data.results.length){
                                //
                                this.setState({movies: foundFilms});
                                console.log(foundFilms);
                            }
                        });
                });
               // console.log(this.state.movies)
            });
    }


    updateInput(evt){

        console.log(evt);

        // this.state={value: evt.target.value};
        this.setState({
            value: evt.target.value
        });
        this.videoSearch(this.state.value);
        console.log(this.state.value);
    }
    timeFunction(text) {
        setTimeout(function(){ alert(text); }, 2000);
        ;
    }

    render() {

        return (

            <div className={'page-wrapper'}>
                <aside>
                    <header>Movie Store</header>
                    <div className={'content'}>
                        <p>
                            <button onClick={() => ( this.timeFunction("LATEST CLICK"),

                                console.log('LATEST CLICK'))} >LATEST</button>
                        </p>
                        <p>
                            <button onClick={() => ( this.timeFunction("POPULAR CLICK"),

                                                    console.log('POPULAR CLICK'))} >POPULAR</button>
                        </p>
                        <p>
                            <button onClick={() => ( this.timeFunction("WATCHLIST CLICK"),

                                console.log('WATCHLIST CLICK'))} >WATCHLIST</button>
                        </p>

                    </div>
                </aside>
                <main>
                    <div className={'search-wrapper'} onChange={this.updateInput} >
                        <input type={'text'} placeholder={'Search...'} />
                    </div>

                    <div className={'movies-wrapper'}>
                        <h1 className={'page-title'}>List Name</h1>
                        {this.state.movies.map(movie =>
                            <div className={'movies'} key={movie.id}>
                                {console.log({movie})}

                                <label>
                                    <input type = "checkbox"
                                           onChange={() => this.checkedToggle(movie.id)}
                                    />
                                </label>
                                <div className={'movie-img-wrapper'}>
                                    <div className={'movie-img-hover'}>
                                        <div className={'popup-toggle'} onClick={() => this.popupToggle(movie.videos[0])}/>
                                    </div>
                                    <img src={'http://image.tmdb.org/t/p/w185/' + movie.picture} alt={movie.title}/>
                                </div>
                                    <div className={'movie-content'}>
                                        <h3>{movie.title}</h3>

                                        <b>{movie.rating}</b>
                                        <h3> {movie.genres_names.map((genre, index)=>
                                            <div className="badge badge-dark mr-2" key={index}>{index+1+")"} {genre}</div>
                                        )}</h3>


                                </div>

                            </div>
                        )}
                        {this.state.showPopup && this.state.currentVideo ?
                            <div className={'movie-video-wrapper'}  onClick={() => this.popupToggle(false)}>
                                <iframe width="560"
                                        height="315"
                                        src={'https://www.youtube.com/embed/' + this.state.currentVideo }
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media" allowFullScreen>

                                </iframe>
                            </div>
                            : null}
                            <div className={'paginator'}>
                                <div className={'prev'} onClick={() => this.handleChange(-1)}>Prev</div>
                                <div className={'next'} onClick={() => this.handleChange(1)}>Next</div>
                            </div>
                    </div>
                </main>
            </div>
        );
    }
}


export default Test;