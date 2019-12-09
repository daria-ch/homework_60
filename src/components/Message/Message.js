import React from 'react';
import './Message.css';

const Message = props => {
    return (
        <div className="alert alert-primary">
            <span className='datetime'>{props.datetime}</span>
            <span className='nickname'>{props.nickname}</span>
            <span>{props.text}</span>
        </div>

    );
};

export default Message;