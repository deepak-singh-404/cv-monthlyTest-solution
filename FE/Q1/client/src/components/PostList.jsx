import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setId } from '../redux/actions/action'

const PostList = ({ title, id }) => {
    const dispatch = useDispatch()
    const clickHandler = () => {
        if (id) {
            dispatch(setId(id))
        }
    }
return (
    <div >
        <button onClick={clickHandler}>{title}</button>
    </div>
)
}

export default PostList
