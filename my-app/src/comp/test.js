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
            value: ''

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
                                        'videos': movieVideos
                                    });
                                }
                            });
                            // проверяем, если количество полученных фильмов равна индексу последнего фильма в массиве, тогда сохраняем результат в state
                            if (movieIndex+1 === movies.data.results.length){
                                //
                                this.setState({movies: moviesArray});
                                console.log(moviesArray);
                            }
                        });
                });
                console.log(this.state.movies)
            });
    }

    componentDidMount() {

        this.getMovies();

    }

    popupToggle (video) {
        if(video) {
            this.setState({currentVideo: video , showPopup: true});
        } else {
            this.setState({currentVideo: '', showPopup: false});
        }
    }

    handleChange(counter) {
        console.log(this.state.page);
        if(this.state.page + counter != 0){
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
                                    // неведомая залупа, сейвим рейтинг в переменную
                                    const rating = movie.vote_average;
                                    foundFilms.push({
                                        'id':movie.id,
                                        'title' : movie.title,
                                        'rating': rating,
                                        'picture': movie.poster_path,
                                        'videos': movieVideos
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

        this.state={value: evt.target.value};
        this.videoSearch(this.state.value);
        console.log(this.state.value);
    }

    render() {

        return (

            <div className={'page-wrapper'}>
                <aside>
                    <header>Movie Store</header>
                    <div className={'content'}>
                        <p>bla-bla</p>
                        <p>bla-bla</p>
                        <p>bla-bla</p>
                        <p>bla-bla</p>
                        <p>bla-bla</p>
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
                                <div className={'movie-img-wrapper'}>
                                    <div className={'movie-img-hover'}>
                                        <div className={'popup-toggle'} onClick={() => this.popupToggle(movie.videos[0])}/>
                                    </div>
                                    <img src={'http://image.tmdb.org/t/p/w185/' + movie.picture} alt={movie.title}/>
                                </div>
                                <div className={'movie-content'}>
                                    <h3>{movie.title}</h3>
                                    <b>{movie.rating}</b>
                                </div>
                                {/*Я убрал iframe, потому что их слишком много, и у меня начинает браузер глючить*/}

                                {/*{movie.videos.map((video, index) =>*/}
                                    {/*<p key={index}> video src = {'https://www.youtube.com/embed/'+video}</p>*/}
                                    {/*// <iframe width="560"*/}
                                    {/*//         height="315"*/}
                                    {/*//         src={'https://www.youtube.com/embed/' + video }*/}
                                    {/*//         frameBorder="0"*/}
                                    {/*//         allow="autoplay; encrypted-media" allowFullScreen>*/}
                                    {/*//*/}
                                    {/*// </iframe>*/}
                                {/*)}*/}
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