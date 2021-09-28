import React from 'react';
import Axios from 'axios';
class EpisodeList extends React.Component {
  state = {
    episodeList: [],
  };
  componentDidMount() {
    //마운트가 될때 호출되는 함수
    const apiUrl = 'http://api.tvmaze.com/singlesearch/shows';
    const params = {
      q: 'mr-Robot',
      embed: 'episodes',
    };
    Axios.get(apiUrl, params)
      .then((response) => {
        const {
          data: {
            _embedded: { episodes },
          },
        } = response;

        console.log(episodes);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const { episodeList } = this.state;
    return (
      <div>
        <h1>EpisodeList</h1>
        {JSON.stringify(episodeList)}
      </div>
    );
  }
}

export default EpisodeList;
