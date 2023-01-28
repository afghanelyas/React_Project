import React, { Component } from 'react';


const Like = (props) => {
 
        let classes = "fa fa-heart cursor-pointer mr-10 "
        if (!props.liked) classes += "_o"
        return (

            <i onClick={props.onClick} className={classes}  aria-hidden="true"></i>
            
        );
     
}
 
export default Like;


   