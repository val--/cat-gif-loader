import React from 'react';

class CatGif extends React.Component {
    
    constructor() {
    super();
        this.state = {
          catsSeen: 0,
          gifLoaded: true
        };
    }
    
    loadCat(){
        
        var theCat = document.getElementById("theCat");
        var logo = document.getElementById("logo");
        logo.style.webkitAnimationPlayState = "paused";
        
        theCat.src = "http://thecatapi.com/api/images/get?format=src&type=gif" + "&" + "rand=" + Math.random(0,99999);
    }
    
    handleImageLoaded(){
        this.setState({ catsSeen:++this.state.catsSeen})
        var logo = document.getElementById("logo");
        logo.style.webkitAnimationPlayState = "running";
    }
    
    handleImageErrored(){
        this.loadCat();
    }
    
    render() {
    return(
        <div className="container-fluid" id="gifContainer">
            <div className="imageContainer">
                <img 
                id="theCat" 
                src="http://thecatapi.com/api/images/get?format=src&type=gif" 
                onLoad={ () => this.handleImageLoaded()}
                onError={ () => this.handleImageErrored()}
                />
            </div>
            <div className="buttonsContainer">
                <button className="myButton" onClick={() => this.loadCat()}>Load a new cat</button>
                <p className="lead">You have seen <span className="catsSeen">{this.state.catsSeen}</span> cat gif. <br/><br/>Don't you have anything better to do ? 🐱‍👓</p>
            </div>
        </div>
        );
    
    }
}
export default CatGif;


