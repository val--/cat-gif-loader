import React from 'react';
import {ShareButtons,} from 'react-share';

const {FacebookShareButton} = ShareButtons;

import LoadNewCat from './LoadNewCat';
import ViewsStatistics from './ViewsStatistics';
import CopyLink from './CopyLink';

class CatGif extends React.Component {
    
    constructor() {
        super();
        
        this.loadCat = this.loadCat.bind(this);
        
        this.state = {
          catsSeen: 0,
          currentCatSrc:'',
          linkBox:'',
          gifLoaded:false
        };
    }
    
    componentWillMount() {
        
        const localStorageRef = localStorage.getItem(`catsseen`);
    
        if(localStorageRef) {
          this.setState({
            catsSeen: localStorageRef
          });
        }
    }
    
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`catsseen`, this.state.catsSeen);
    }
    
    loadCat(){
        this.setState({gifLoaded:false})
        this.setState({linkBox:''})
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
    
    httpGet(theUrl){
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
        
        var image_url = this.state.currentCatSrc;
        
        this.setState({ catsSeen:++this.state.catsSeen})
        this.setState({ linkBox:image_url})
        this.setState({gifLoaded:true})
        
        var button = document.getElementById("buttonLoadCat");
        var facebookButton = document.getElementById("buttonFacebookShare");
        var logo = document.getElementById("logo");
        
        logo.style.webkitAnimationPlayState = "running";
        button.classList.remove("disabled");
        facebookButton.classList.remove("disabled");
        
        var theCat = document.getElementById("theCat");
        button.textContent = "Load a new cat ! ";
    }
    
    handleImageErrored(){
        this.loadCat();
    }
    
    toggle_visibility(e) {
       
       if(e.style.display == 'inline-block'){
          e.style.display = 'none';
          console.log("invisible");
       }
       else{
          e.style.display = 'inline-block';
          console.log("visible");
       }
    }

    render() {
    
    const classImg = this.state.gifLoaded ? 'loaded' : 'not-loaded';
    
    return(
        <div className="container-fluid" id="gifContainer">
        
            <div className="imageContainer">
                <img 
                    id="theCat" 
                    src={this.state.currentCatSrc} 
                    onLoad={ () => this.handleImageLoaded()}
                    onError={ () => this.handleImageErrored()}
                    className={classImg}
                />
            </div>
            
            <CopyLink linkBox={this.state.linkBox}/>
            
            <div className="buttonsContainer">
            
                <LoadNewCat loadCat={this.loadCat}/>
                
                <FacebookShareButton url={this.state.currentCatSrc}title='Meow !'>
                    <button className="button facebookButton" id="buttonFacebookShare" onClick={() => this.shareOnFacebook()}>Share this gif </button>
                </FacebookShareButton>
                
                <ViewsStatistics catsSeen={this.state.catsSeen}/>
                
            </div>
            
        </div>
        );
    
    }
}
export default CatGif;


