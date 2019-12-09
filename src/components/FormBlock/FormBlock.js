import React from 'react';
import './FormBlock.css';
import Button from "../Button/Button";

const FormBlock = props => {
    return (
        <form className='formBlock' onSubmit={props.submit}>
            <div className="form-group">
                <label htmlFor={"author"}>Nickname</label>
                <input type="text" required className="form-control" id="author" placeholder="Enter your nickname"
                       autoComplete="off" onChange={props.getNickname}/>
            </div>
            <div className="form-group">
                <label htmlFor={"message"}>Message</label>
                <input type="text" required className="form-control" id="message" placeholder="Text your message"
                       autoComplete="off" onChange={props.getMessage}/>

            </div>
            <Button
                onClick={props.submit}
            />
        </form>
    );
};

export default FormBlock;