import React from 'react';
import Clipboard from 'react-clipboard.js';
import clippy from '../clippy.svg';

class CopyLink extends React.Component {
    
    selectLink(link){
        link.preventDefault();
    }
    
    successCopy(){
        var inputText = document.getElementById("input-link-box");
        inputText.select();
    }
    
    render() {
        return(
            <div className="link-box-container">
                    <input className="input-link-box" id="input-link-box" value={this.props.linkBox}></input>
                    <Clipboard data-clipboard-text={this.props.linkBox} button-title="I'm a tooltip" button-id="copy-to-clipboard" onSuccess={this.successCopy}>
                        <img src={clippy} alt="Copy to clipboard" className="clippy"/>
                    </Clipboard>
            </div>
        );
    }
}
export default CopyLink;


