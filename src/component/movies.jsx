import React, { Component } from 'react';
import { getMovies } from '../service/fakeMoviesService';
import Like from './common/like';
import Pagination from './common/pagination';
import { panginate } from '../utils/paginate';
import ListGroup from './common/listGroup';

export default class Movies extends Component {
    state = { 
        movies: getMovies(),
        currentPage:1,
        pageSize:4,
        
     };

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




    render() { 
        const {length: count} = this.state.movies
        const {pageSize , currentPage , movies: allMovies} = this.state

        if (count === 0) return <p class="m-10 bg-gray-400 w-96 rounded p-3">There are no movies in the database.</p>

        const movies = panginate(allMovies , currentPage , pageSize)


       return ( 
       
        <div class="m-10 flex flex-row">
            <div class="">
                <ListGroup />
            </div>

            <div class="max-w-lg">
            <p class="  w-96 rounded p-3">Showing {count} movies in the database.</p>

        <table class=" divide-y  mt-5  divide-gray-300">

            <thead class="bg-gray-50">
                <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Title</th>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Genre</th>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Stock</th>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Rate</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 bg-white">
                {movies.map(movie =>(
                <tr key={movie._id}>
                       <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{movie.title}</td>
                       <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{movie.genre.name}</td>
                       <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{movie.numberInStock}</td>
                       <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{movie.dailyRentalRate}</td>
                       <td>
                            <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
                       </td>
                       <td> <button onClick={() => this.handleDelete(movie)} class="bg-red-400 p-2 rounded">Delete</button> </td>
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
 
