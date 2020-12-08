import React from "react";
import { hashHistory } from 'react-router';

export default class Back extends React.Component {
    constructor(props){
        super(props);
        this.state={showBack:location.hash.split('?')[0]!=="#/"};
        this.hook = hashHistory.listenBefore(loc=>
            this.setState({showBack:loc.pathname!=="/"})
        );
    }
    componentWillUnmount(){
        this.hook(); //unlisten
    }
    render() {
        return(
            <header>
                <div id="header-wrapper">
                    <div id="nav-bar-btn" class="nav">
                        {this.state.showBack?
                         <div onClick={()=>hashHistory.goBack()}>Go BACK</div> 
                          : <Menu/>
                         }
                    </div>
                </div>
            </header>
        );
    }
}

// export default Back;
