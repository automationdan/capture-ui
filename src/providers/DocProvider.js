import React, {Component} from 'react'
import DocContext from './DocContext';

export default class DocProvider extends Component {
    state = {
        document: "url"
    };

    render() {
        return (
            <DocContext.Provider
                value={{
                    document: this.state.document,
                    setDoc: selectedID => {
                    this.setState({
                            selectedID
                        });
                    }
                }}
            >
                {this.props.children}
            </DocContext.Provider>
        );
    }
}
