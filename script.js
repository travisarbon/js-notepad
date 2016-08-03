/**
 * Created by Travis on 8/2/2016.
 * Script adapted from a React.js tutorial by thenewboston on YouTube https://www.youtube.com/channel/UCJbPGzawDH1njbqV-D5HqKw.
 * Adaptation for personal learning only. Please credit thenewboston if you adapt this script.
 */
$(document).ready(function(){
    console.log("READY");

    (function(){
        var Comment = React.createClass({

            getInitialState : function(){
              return{
                  editing : false
              }
            },

            edit : function(){
                this.setState({editing : true});
            },

            remove : function(){
                console.log("Removing comment");
                this.props.deleteFromBoard(this.props.index);
            },

            save : function(){
                this.props.updateTheText(this.refs.newText.value, this.props.index);
                this.setState({editing : false});
            },

            renderNormal : function(){
                return(
                    <div className = "comment-container">
                        <div><p>{this.props.children}</p></div>
                        <div className = "row">
                        <button onClick = {this.edit} className = "btn btn-main col-md-3">Edit</button>
                        <button onClick = {this.remove} className = "btn btn-danger col-md-3">Remove</button>
                        </div>
                    </div>
                );
            },

            renderForm : function(){
                return(
                    <div className = "comment-container">
                        <textarea ref = "newText" defaultValue = {this.props.children}></textarea>
                        <button onClick = {this.save} className = "btn btn-success">Save</button>
                    </div>
                );
            },

            render : function(){
                if(this.state.editing){
                   return this.renderForm();
                } else {
                    return this.renderNormal();
                }
            }
        });

        var Board = React.createClass({
            getInitialState : function(){
                return {
                    comments : []
                }
            },

            add : function(text){
                var arr = this.state.comments;
                arr.push(text);
                this.setState({comments : arr});
            },

            removeComment : function(i){
                var arr = this.state.comments;
                arr.splice(i, 1);
                this.setState({comments : arr});
            },

            updateComment : function(newText, i){
                var arr = this.state.comments;
                arr[i] = newText;
                this.setState({comments : arr});
            },

            eachComment : function(text, i){
                return (
                    <Comment deleteFromBoard = {this.removeComment} updateTheText = {this.updateComment} key = {i} index = {i}>
                        {text}
                    </Comment>
                );
            },

            render : function(){
                return(
                    <div>
                        <div className = "board">
                            <button onClick = {this.add.bind(null, "New Note")} className = "btn btn-new create">Add note</button>
                            {this.state.comments.map(this.eachComment)}
                        </div>
                    </div>
                );
            }
        });

        ReactDOM.render(<Board />
            , document.getElementById("content"));
    })();

});