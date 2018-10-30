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
        this.fetchCat();
          
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
        
        this.fetchCat();
        
    }
    
    fetchCat() {
        
        const api_key = 'zoxmGNbuVuqRKg2mXJYYWcGV7JvWJElh';
        let url = 'https://api.giphy.com/v1/gifs/random?api_key='+api_key+'&tag=cat&rating=G';
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
                let image_url = result.data.image_original_url;
                this.setState({
                    isLoaded: true,
                    linkBox: image_url,
                    currentCatSrc: image_url
                });
                
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
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


