import React, { Component } from 'react';
import { getMovies } from '../service/fakeMoviesService';

export default class Movies extends Component {
    state = { 
        movies: getMovies()
     } 
    render() { 

       return <table class="w-5/6 divide-y m-auto mt-10 divide-gray-300">

        <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Title</th>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Genre</th>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Stock</th>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Rate</th>
            </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 bg-white">
            {this.state.movies.map(movie =>(
            <tr>
               <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{movie.title}</td>
               <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{movie.genre.name}</td>
               <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{movie.numberInStock}</td>
               <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{movie.dailyRentalRate}</td>
            </tr>

            ))}
        </tbody>

    </table>

    }
}
 
