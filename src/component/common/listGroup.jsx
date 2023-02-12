import React from 'react';

const ListGroup = (props) => {
    const { items, textProperty, valueProperty, onItemSelecte, selectedItem } = props;
    return (
        <ul className="flex gap-x-4 basis-1/2 ">
            {items.map((item) =>(
                <li 
                    onClick={() => onItemSelecte(item)}
                    key={item[valueProperty]}
                    className={item === selectedItem ? "bg-gray-300  rounded basis-1/4 p-2 text-center active " : "bg-gray-100"}
                >   
                    {item[textProperty]}
                </li>
            ))}
        </ul>
    )
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id',
}



export default ListGroup;