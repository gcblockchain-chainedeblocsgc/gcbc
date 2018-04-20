import React, { Component } from 'react';

class SetStatus extends Component {

    componentDidMount() {
        this.props.fetchStatus();
    }
  
    render() {
        return (
            <div></div>
        );
    }

}

export default SetStatus;
