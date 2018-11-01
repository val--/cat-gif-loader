import React from 'react';
import CatSmiley from './CatSmiley';

class ViewsStatistics extends React.Component {

    render() {
        const catsSeen = this.props.catsSeen;
            return(
                <p className="lead">
                    <span className="you-have-seen">You have seen <span className="catsSeen">{catsSeen}</span> cat gif 
                        <CatSmiley catsSeen={catsSeen} />
                    </span>
                </p>
            );
    }
}
export default ViewsStatistics;


