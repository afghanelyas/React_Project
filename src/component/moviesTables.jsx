import {React , Component} from 'react';
import Like from './common/like';


class MoviesTable extends Component {

    raiseSort = path => {
        const sortColumn = {...this.props.sortColumn};
        if (sortColumn.path === path) {
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        }else{
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    }
    render() { 
       
    const {movies , onDelete , onLike } = this.props;

    return (
        <table className=" divide-y  divide-gray-300">

                <thead className="bg-gray-50">
                    <tr>
                        <th onClick={() => this.raiseSort("title")} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Title</th>
                        <th onClick={() => this.raiseSort("genre.name")} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Genre</th>
                        <th onClick={() => this.raiseSort("numberInStock")} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Stock</th>
                        <th onClick={() => this.raiseSort("dailyRentalRate")} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Rate</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {movies.map(movie => (
                        <tr key={movie._id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{movie.title}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{movie.genre.name}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{movie.numberInStock}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{movie.dailyRentalRate}</td>
                            <td>
                                <Like liked={movie.liked} onClick={() => onLike(movie)} />
                            </td>
                            <td> <button onClick={() => onDelete(movie)}
                             className="bg-red-400 p-2 rounded">Delete</button> </td>
                        </tr>
                    ))}
                </tbody>
        </table>
    )
    }
} 
export default MoviesTable