import React from 'react';

class CatSmiley extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        const catsSeen = this.props.catsSeen;
        
        // Can't use a function because of smiley return type ?
        if(catsSeen >= 0 && catsSeen <= 5){
            return(
                <span id="cat-smiley">🐱</span>
            );
        }else if(catsSeen > 5 && catsSeen <= 20){
            return(
                <span id="cat-smiley">😾</span>
            );
        }else{
            return(
                <span id="cat-smiley">😿</span>
            );
        }
    }
}
export default CatSmiley;


