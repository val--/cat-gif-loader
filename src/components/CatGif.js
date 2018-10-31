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


    componentDidMount() {
        this.loadCat();
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
        this.setState({currentCatSrc:''})
        //var theCat = document.getElementById("theCat");
        var logo = document.getElementById("logo");
        var button = document.getElementById("buttonLoadCat");
        var facebookButton = document.getElementById("buttonFacebookShare");

        logo.style.webkitAnimationPlayState = "running";
        button.textContent = "Loading new cat...";
        button.classList.add("disabled");
        facebookButton.classList.add("disabled");
        
        this.fetchGiphyCat();
        //this.fetchFallbackCat();
        //logo.style.webkitAnimationPlayState = "paused";
        
    }
    
    
    fetchGiphyCat() {
        
        //const api_key = 'zoxmGNbuVuqRKg2mXJYYWcGV7JvWJElh';
        const api_key = 'dc6zaTOxFJmzC';
        let url_giphy = 'https://api.giphy.com/v1/gifs/random?api_key='+api_key+'&tag=cat&rating=G';
        
        var logo = document.getElementById("logo");
        logo.style.webkitAnimationPlayState = "running";
        console.log("fetching a cat...");
        
        fetch(url_giphy)
            .then(
                res => res.json())
            .then(
                result => {
                    console.log(result.data);
                    let image_url = result.data.image_url;
                    this.setState({
                        isLoaded: true,
                        linkBox: image_url,
                        currentCatSrc: image_url
                    });
                    
                },
                error => {
                    console.log(error);
                    //this.fetchFallbackCat();
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
          )
    }
    
    fetchFallbackCat() {
        
        let url_catapi = 'https://thecatapi.com/api/images/get.php?type=gif';
        
        fetch(url_catapi, 
            {mode: 'no-cors'})
            .then(
                res => res.json())
            .then(
                result => {
                    let image_url = result.data.url;
                    this.setState({
                        isLoaded: true,
                        linkBox: image_url,
                        currentCatSrc: image_url
                    });
                    
                },
                error => {
     
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
          )
    }
    

    handleImageLoaded(){
        
        var image_url = this.state.currentCatSrc;
        
        this.setState({ catsSeen:++this.state.catsSeen})
        this.setState({ linkBox:image_url})
        this.setState({gifLoaded:true})
        
        var button = document.getElementById("buttonLoadCat");
        var facebookButton = document.getElementById("buttonFacebookShare");
        var logo = document.getElementById("logo");
        
        logo.style.webkitAnimationPlayState = "initial";
        logo.style.webkitAnimationPlayState = "paused";
        button.classList.remove("disabled");
        facebookButton.classList.remove("disabled");
        
        //var theCat = document.getElementById("theCat");
        button.textContent = "Load a new cat ! ";
    }
    
    
    handleImageErrored(){
        //this.loadCat();
    }
    
    
    toggle_visibility(e) {
       
       if(e.style.display === 'inline-block'){
          e.style.display = 'none';
       }
       else{
          e.style.display = 'inline-block';
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
                        alt="cat gif"
                        title={this.state.currentCatSrc} 
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


