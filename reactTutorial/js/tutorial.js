var React = require('react');
//You need this npm package to do createReactClass
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');

var Component = createReactClass({
    render: function () {
        return (
            <div>
                <h1> the list </h1>
            </div>
        );
    }
});

ReactDOM.render(
    <Component/>,
    document.getElementById('app')
);