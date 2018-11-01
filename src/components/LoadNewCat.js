import React from 'react';

class LoadNewCat extends React.Component {
    
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


