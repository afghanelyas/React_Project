import {React , Component} from 'react';
import TableHeader from './common/tableHeader';
import Like from './common/like';

class MoviesTable extends Component {

    columns = [
        {path : "title" , label: "Title"},
        {path : "genre.name" , label: "Genre"},
        {path : "numberInStock" , label: "Stock"},
        {path : "dailyRentalRate" , label: "Rate"},
        {key: "like"},
        {key: "delete"},
    ]
   
    render() { 
       
    const {movies , onDelete , onLike  , onSort , sortColumn} = this.props;

    return (
        <table className=" divide-y  divide-gray-300">

            <TableHeader columns={this.columns}  sortColumn={sortColumn} onSort={onSort} />
                
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