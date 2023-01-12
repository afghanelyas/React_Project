import React from 'react';
import _ from 'lodash'
import Proptypes from 'prop-types'
const Pagination = props => {

    const {itemsCount, pageSize, currentPage, onPageChange} = props
    const pagesCount = Math.ceil( itemsCount / pageSize)
    if(pagesCount === 1) return null
    const pages = _.range(1 , pagesCount + 1)


    
    return <nav>
        
        <ul className="pagination flex">
            {pages.map(page => (
                <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                    <a
                        onClick={() => onPageChange(page)}
                        aria-current="page"
                        className="rounded relative z-10 inline-flex items-center border border-gray-500 bg-blue-300 px-4 py-2 text-sm font-medium  focus:z-20 ">{page}
                    </a> 
             </li>
            ))}
        </ul>
    </nav>

   
}

Pagination.prototypes={
    itemsCount: Proptypes.number.isRequired,
    pageSize: Proptypes.number.isRequired,
    currentPage: Proptypes.number.isRequired,
    onPageChange: Proptypes.func.isRequired
}

export default Pagination