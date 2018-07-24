import React, { Component } from 'react';
import $ from "jquery";

class Test extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // state массив фильмов
            movies: []
        }
    }

    componentDidMount() {
        // обьявляем массив, в котором будет окончательный результат со всеми фильмами
        let moviesArray = [];
        // получаем все фильмы
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=95787530723fdf659807136ee61b9df9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&primary_release_year=2018&page=1')
            .then(res => res.json())
            .then(movies => {
                // перебираем все получаенные фильмы
                movies.results.forEach((movie, movieIndex) => {
                    // обьявляем массив, в который будет записываться все видео фильма
                    let movieVideos = [];
                    // получаем все видео по одному фильму
                    fetch('https://api.themoviedb.org/3/movie/'+ movie.id +'/videos?api_key=95787530723fdf659807136ee61b9df9&language=en-US')
                        .then(res => res.json())
                        .then(videos => {
                            // перебираем все видео
                            videos.results.forEach((video, videoIndex) => {
                                // добавляем видео в массив
                                movieVideos.push(video.key)
                                // проверяем, если количество полученных видео равна индексу последнего видео в массиве, тогда добавлем фильм в массив окончательных фильмов
                                if (videoIndex+1 === videos.results.length){
                                    moviesArray.push({
                                        'id':movie.id,
                                        'title' : movie.title,
                                        'rating': movie.vote_avarage,
                                        'picture': movie.poster_path,
                                        'videos': movieVideos
                                    });
                                }
                            });
                            // проверяем, если количество полученных фильмов равна индексу последнего фильма в массиве, тогда сохраняем результат в state
                            if (movieIndex+1 === movies.results.length){
                                //
                                this.setState({movies: moviesArray});
                                console.log(moviesArray);
                            }
                        });
                });
            });
    }

    render() {

        $(document).ready(function(){
            $("p").hover(function(){
                $(this).css("image", "yellow");
            }, function(){
                $(this).css("color", "pink");
            });
        });

        return (

            <div>
                {this.state.movies.map(movie =>
                    <div className={'movies'} key={movie.id}>
                        <ul>
                            <li><button src="Play.png" alt="playy" /></li>
                        </ul>
                        <img
                                src={'http://image.tmdb.org/t/p/w185/' + movie.picture} alt={movie.title}/>
                        <p>{movie.title}</p>
                        {/*Я убрал iframe, потому что их слишком много, и у меня начинает браузер глючить*/}

                        {movie.videos.map((video, index) =>
                            <p key={index}> video src = {'https://www.youtube.com/embed/'+video}</p>
                            // <iframe width="560"
                            //         height="315"
                            //         src={'https://www.youtube.com/embed/' + video }
                            //         frameBorder="0"
                            //         allow="autoplay; encrypted-media" allowFullScreen>
                            //
                            // </iframe>
                        )}
                        <hr/>
                        <br/>
                    </div>
                )}
            </div>
        );
    }
}


export default Test;