import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getPost } from '../redux/actions/action'


const PostDetails = (props) => {
    const {post} = useSelector(store=>store._reduxState)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(props.match.params.id){
            dispatch(getPost(props.match.params.id))
        }
    },[props.match.params.id])
    return (
        <div>
            <h6>POST DETAILS</h6>
            {
                Object.keys(post).length !== 0 ? <div>
                    <h5>
                        id: {post.title}
                    </h5>
                    <h5>
                        Title: {post.title}
                    </h5>
                    <p>
                        Body: {post.body}
                    </p>
                </div> : null
            }
        </div>
    )
}

export default PostDetails
