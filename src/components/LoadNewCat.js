import React from 'react';

class LoadNewCat extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return(
        <button 
            className="button myButton" 
            id="buttonLoadCat" 
            onClick={() => this.props.loadCat()}>
            Load a new cat ! 
        </button>
        );
    }
}
export default LoadNewCat;


