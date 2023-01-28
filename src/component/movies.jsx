import React, { Component } from 'react';
import { getMovies } from '../service/fakeMoviesService';
import { getGenres } from '../service/fakeGenreService';
import Like from './common/like';
import Pagination from './common/pagination';
import { panginate } from '../utils/paginate';
import ListGroup from './common/listGroup';

export default class Movies extends Component {
    state = { 
        movies: [],
        currentPage:1,
        pageSize:4,
        genres: []
     };

     componentDidMount(){
        this.setState({movies: getMovies() , genres: getGenres()})
     }

     handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies})
     }

     handleLike = (movie) => {
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie)
        movies[index] = {...movies[index]}
        movies[index].liked   = !movies[index].liked
        this.setState({movies})

     }

     handlePageChange = page => {
        this.setState({currentPage: page})
     }

     handleGenresSelect = genre => {
        console.log(genre)
     }

    render() { 
        const {length: count} = this.state.movies
        const {pageSize , currentPage , movies: allMovies} = this.state

        if (count === 0) return <p className="m-10 bg-gray-400 w-96 rounded p-3">There are no movies in the database.</p>

        const movies = panginate(allMovies , currentPage , pageSize)


       return ( 
       
        <div className="max-w-lg m-auto mt-10 shadow-md justify-start">

            <div className="">
                <ListGroup 
                items={this.state.genres}
                onItemSelecte={this.handleGenresSelect}
                 />
            </div>

            <div className="max-w-lg">
            <p className="text-xl mt-4 bg-slate-100 rounded-sm p-2 ">Showing {count} movies in the database.</p>

        <table className=" divide-y  divide-gray-300">

            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Title</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Genre</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Stock</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Rate</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
                {movies.map(movie =>(
                <tr key={movie._id}>
                       <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{movie.title}</td>
                       <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{movie.genre.name}</td>
                       <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{movie.numberInStock}</td>
                       <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{movie.dailyRentalRate}</td>
                       <td>
                            <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
                       </td>
                       <td> <button onClick={() => this.handleDelete(movie)} className="bg-red-400 p-2 rounded">Delete</button> </td>
                </tr>
                ))}
            </tbody>
        </table>
                <Pagination 
                itemsCount={count}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={this.handlePageChange} 
                />
            </div>
        </div>
       
       )

    }
}
 
