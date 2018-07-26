import React, { Component } from 'react';

class Test extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // state массив фильмов
            movies: [],
            showPopup: false,
            currentVideo: '',
            page: 1
        };
        this.handleChange = this.handleChange.bind(this);
    }

    getMovies() {
        // обьявляем массив, в котором будет окончательный результат со всеми фильмами
        let moviesArray = [];
        const apiKey = '95787530723fdf659807136ee61b9df9';
        // получаем все фильмы
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&primary_release_year=2018&page=' + this.state.page)
            .then(res => res.json())
            .then(movies => {
                // перебираем все получаенные фильмы
                movies.results.forEach((movie, movieIndex) => {
                    // обьявляем массив, в который будет записываться все видео фильма
                    let movieVideos = [];
                    // получаем все видео по одному фильму
                    fetch('https://api.themoviedb.org/3/movie/'+ movie.id +'/videos?api_key=' + apiKey + '&language=en-US')
                        .then(res => res.json())
                        .then(videos => {
                            // перебираем все видео
                            videos.results.forEach((video, videoIndex) => {
                                // добавляем видео в массив
                                movieVideos.push(video.key);
                                // проверяем, если количество полученных видео равна индексу последнего видео в массиве, тогда добавлем фильм в массив окончательных фильмов
                                if (videoIndex+1 === videos.results.length){
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
                            if (movieIndex+1 === movies.results.length){
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
                    <div className={'search-wrapper'}>
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