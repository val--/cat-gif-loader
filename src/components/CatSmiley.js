import React from 'react';

class CatSmiley extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        const catsSeen = this.props.catsSeen;
        
        // Can't use a function because of smiley return type ?
        if(catsSeen >= 0 && catsSeen <= 10){
            return(
                <span id="cat-smiley">🐱</span>
            );
        }else if(catsSeen > 10 && catsSeen <= 25){
            return(
                <span id="cat-smiley">😾</span>
            );
        }else if(catsSeen > 25 && catsSeen <= 50){
            return(
                <span id="cat-smiley">😿</span>
            );
        }else{
            return(
                <span id="cat-smiley">! ! ! 🙀</span>
            );
        }
    }
}
export default CatSmiley;


