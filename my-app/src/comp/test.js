import React, { Component } from 'react';

class Test extends Component {

    url = 'https://api.themoviedb.org/3/discover/movie?' +
        'api_key=95787530723fdf659807136ee61b9df9&' +

        'language=en-US&' +
        'sort_by=popularity.desc&' +
        'include_adult=false&' +
        'include_video=true&' +
        'primary_release_year=2018&'+
        'page=1';
    mediaUrl = "http://image.tmdb.org/t/p/w185//";

    constructor(props) {
        super(props);
        this.state = {
            result: [],
              page: '',
            videos: []
        };
    }

    componentDidMount() {
        fetch(this.url)
            .then(res => res.json())
            .then(post => {this.setState({result: post.results, page:post.page})});
    }

    getVideo(id){

        var requestURL = 'https://api.themoviedb.org/3/movie/'+ id +'/videos?api_key=95787530723fdf659807136ee61b9df9&language=en-US'
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);

        request.responseType = 'json';
        request.send();

            request.onload = function () {
                var films = request.response;
               console.log(films['results'][0]['key']);
                () => {this.setState({videos: (films['results'][0]['key'])})};
                return  (films['results'][0]['key']);
                console.log(films);


            };
        //console.log(this.state.videos);
return this.state.videos;
    }
    //     console.log(id);
    //     fetch('https://api.themoviedb.org/3/movie/'+ id +'/videos?api_key=95787530723fdf659807136ee61b9df9&language=en-US')
    //     .then(
    //         res => res.json()
    //     )
    //         .then(videos => videos.results.key);
    //
    // }


    render() {
        return (
            <div>
                {this.state.page}
                {this.state.result.map(movie =>
                    <div className={'movies'} key={movie.id}>

                        <img src={this.mediaUrl + movie.backdrop_path} alt={movie.title}/>
                        <iframe width="560"
                                height="315"
                                src={'https://www.youtube.com/embed/' + this.getVideo(movie.id) }
                                frameBorder="0"
                                allow="autoplay; encrypted-media" allowFullScreen>

                        </iframe>
                        <img src={this.mediaUrl + movie.poster_path} alt={movie.title}/>
                        <p>{movie.title}</p>

                    </div>
                )}
            </div>
        );
    }
}

export default Test;