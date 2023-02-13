import React, {Component} from "react";
import {getMovies} from "../service/fakeMoviesService";
import {getGenres} from "../service/fakeGenreService";
import Pagination from "./common/pagination";
import {panginate} from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTables";
import _ from "lodash";

export default class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
    sortColumn: {path: "title", order: "asc"},
  };

  componentDidMount() {
    const genres = [{_id: "", name: "All Genres"}, ...getGenres()];
    this.setState({movies: getMovies(), genres});
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({movies});
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({movies});
  };

  handlePageChange = (page) => {
    this.setState({currentPage: page});
  };

  handleGenresSelect = (genre) => {
    this.setState({selectedGenres: genre, currentPage: 1});
  };

  handleSort = (sortColumn) => {
    this.setState({sortColumn});
  };

  render() {
    const {length: count} = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenres,
      movies: allMovies,
      sortColumn,
    } = this.state;

    if (count === 0)
      return (
        <p className="m-10 bg-gray-400 w-96 rounded p-3">
          There are no movies in the database.
        </p>
      );

    const filtered =
      selectedGenres && selectedGenres._id
        ? allMovies.filter((m) => m.genre._id === selectedGenres._id)
        : allMovies;

    const stored = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = panginate(stored, currentPage, pageSize);

    return (
      <div className="max-w-lg m-auto mt-10 shadow-md justify-start">
        <div className="">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenres}
            onItemSelecte={this.handleGenresSelect}
          />
        </div>

        <div className="max-w-lg">
          <p className="text-xl mt-4 bg-slate-100 rounded-sm p-2 ">
            Showing {filtered.length} movies in the database.
          </p>

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={filtered.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
