import  React,{  Component } from 'react';
import ReactDOM from 'react-dom';


class DocView extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        var url = "https://docs.google.com/viewerng/viewer?url="+this.props.src+"&embedded=true";
        return(
            <iframe title="DocViewer" style={this.props.style} src={url} width="100%">
            ></iframe>
        );
    }
}

export default DocView;
