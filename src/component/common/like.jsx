import React, { Component } from 'react';


const Like = (props) => {
 
        let classes = "fa fa-heart cursor-pointer "
        if (!props.liked) classes += "_o"
        return (

            <i onClick={props.onClick} class={classes}  aria-hidden="true"></i>
            
        );
     
}
 
export default Like;


   