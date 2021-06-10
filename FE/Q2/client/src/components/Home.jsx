import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getPosts} from '../redux/actions/action'
import {Link} from 'react-router-dom'



function Home() {
  const {posts} = useSelector(store=>store._reduxState)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(posts.length === 0){
      dispatch(getPosts())
    }
  },[])

  return (
    <div className="container">
      <div className="row">
          <div className="col">
          {posts.length === 0 ? <h3>No post found</h3>: posts.map(o=>
          <div>
              <Link to={`/postDetail/${o.id}`}>{o.title}</Link>
              <br/>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}

export default Home;
