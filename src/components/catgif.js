import React from 'react';
import {ShareButtons,} from 'react-share';
const {FacebookShareButton} = ShareButtons;

class CatGif extends React.Component {
    
    constructor() {
    super();
        this.state = {
          catsSeen: 0,
          currentCatSrc:''
        };
    }
    
    loadCat(){
        
        var theCat = document.getElementById("theCat");
        var logo = document.getElementById("logo");
        var button = document.getElementById("buttonLoadCat");
        var facebookButton = document.getElementById("buttonFacebookShare");
        
        logo.style.webkitAnimationPlayState = "paused";
        button.textContent = "Loading new cat...";
        button.classList.add("disabled");
        facebookButton.classList.add("disabled");
        
        var image_url = this.httpGet('http://thecatapi.com/api/images/get.php?format=xml&type=gif');
        
        theCat.src = image_url;
        this.setState({ currentCatSrc:image_url})
        
    }
    
    httpGet(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );

        var xmlDoc = xmlHttp.responseXML;
        var url = "";
        var x = xmlDoc.getElementsByTagName("url");
        for (var i = 0; i < x.length;  i++) {
            url += x[i].childNodes[0].nodeValue;
        }
        return url;
    }
    
    handleImageLoaded(){
        this.setState({ catsSeen:++this.state.catsSeen})
        var button = document.getElementById("buttonLoadCat");
        var facebookButton = document.getElementById("buttonFacebookShare");
        var logo = document.getElementById("logo");
        
        logo.style.webkitAnimationPlayState = "running";
        
        button.classList.remove("disabled");
        facebookButton.classList.remove("disabled");
        
        button.textContent = "Load a new cat ! ";
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
                src="" 
                onLoad={ () => this.handleImageLoaded()}
                onError={ () => this.handleImageErrored()}
                />
            </div>
            <div className="buttonsContainer">
            
                <button 
                    className="button myButton" 
                    id="buttonLoadCat" 
                    onClick={() => this.loadCat()}>
                    Load a new cat ! 
                </button>
                
                <FacebookShareButton
                    url={this.state.currentCatSrc}
                    title='Meow !'>
                    <button className="button facebookButton" id="buttonFacebookShare" onClick={() => this.shareOnFacebook()}>Share on Facebook </button>
                </FacebookShareButton>
                
                <p className="lead">You have seen <span className="catsSeen">{this.state.catsSeen}</span> cat gif. <br/><br/>Don't you have anything better to do ? 🐱‍👓</p>

            </div>
        </div>
        );
    
    }
}
export default CatGif;


