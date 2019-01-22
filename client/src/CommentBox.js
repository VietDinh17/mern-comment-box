import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import DATA from './data';
import './CommentBox.css';

class CommentBox extends React.Component{
    constructor(){
        super();
        this.state = {
            data : [],
            error: null,
            author: '',
            text: '',
        }
        this.pollInterval = null;
    }

    componentDidMount(){
        this.loadCommentsFromServer();
        if(!this.pollInterval){
            this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
        }
    }

    componentWillUnMount(){
        if(this.pollInterval) clearInterval(this.pollInterval);
        this.pollInterval = null;
    }

    loadCommentsFromServer = () => {
        fetch('/api/comments/')
            .then(data => data.json())
            .then((res) => {
                if(!res.success) this.setState({ error: res.error });
                else this.setState({ data: res.data});
            });
    }

    render(){
        let { data, author, text, error } = this.state
        return(
            <div className="container">
                <div className="comments">
                    <h2>Comments:</h2>
                    <CommentList data={data} />
                </div>
                    <div className="form">
                    <CommentForm author={author} text={text}/>
                </div>
                {error && <p>{error}</p>}
            </div>
        )
    }
}

export default CommentBox;