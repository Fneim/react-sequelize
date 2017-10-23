import React from 'react';
import helpers from './utils/helpers';

export class Button extends React.Component {
  state = {
    movies = []
  };

  handleClick() {
    helpers.getSaved()
    .then(movieData => this.setState({ movies: movieData.data})
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <button onClick={this.handleClick}>Movies</button>
        <div>{this.state.movies} ?
          <List>
            {this.state.movies.map(movie => (
              <ListItem>
                <strong>{movie.movieTitle} is categorized as {movie.emotion}</strong>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    )
  };
};
