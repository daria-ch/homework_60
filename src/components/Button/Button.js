import React, {Component} from 'react';
import './Button.css';

class Button extends Component {

    shouldComponentUpdate(nextProps) {
        return this.props.onClick !== nextProps.onClick
    }

    render() {
        return (
            <button type="submit" className="btn btn-primary" onClick={this.props.onClick}>Submit</button>
        );
    }
}

export default Button;
