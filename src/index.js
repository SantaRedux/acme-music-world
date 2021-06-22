import React from 'react';
import { render } from 'react-dom';

const { models: { Song, Track, Artist, Album } } = require('./db');

class Tab extends React.Component {
    render() {
        return ( <button className="tab"
                    onClick={() => { this.props.onClick() } }
                 >
                    {this.props.thisTab}
                 </button> )
    }
}

class ArtistsList extends React.Component {
    render = async () => {
        const artists = await Artist.findAll();
        return (
            <div>
                artists.map(artist => <div className="artist">{artist}</div> );
            </div>
        );
    }
}

class AlbumsList extends React.Component {
    render() {
        const albums = await Album.findAll({ include: { Artist } });
        return (
            <div>
                albums.map(album => <div className="album">{album}</div> );
            </div>
        );
    }
}


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedOn: this.props.thisTab
        };
    }

    renderTab(str) {
        return <Tab
            thisTab={str}
            onClick={() => this.handleClick(thisTab)}
        />;
    }

    handleClick = async (ele) => {
        this.setState({ clickedOn: ele })
        if (this.clickedOn === 'artists') return <ArtistsList />;
        else if (this.clickedOn === 'albums') return <AlbumsList />;
    }

    render() {
        return (
            <div>
                <div className="tab">
                    {this.renderTab(Home)}
                </div>
                <div className="tab">
                    {this.renderTab(Artists)}
                </div>
                <div className="tab">
                    {this.renderTab(Albums)}
                </div>
            </div>
        )
    }
}   


ReactDOM.render(
    <NavBar />,
    document.getElementById('root')
);