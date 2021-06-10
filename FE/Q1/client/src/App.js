import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getPosts} from './redux/actions/action'

import Header from './components/Header'
import PostList from './components/PostList'
import PostDetails from './components/PostDetails'


function App() {
  const {posts, id} = useSelector(store=>store._reduxState)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(posts.length === 0){
      dispatch(getPosts())
    }
  },[])

  return (
    <div className="container">
      <div className="row">
        <Header />
        <div className="row">
          <div className="col-md-4">
          {posts.length === 0 ? <h3>No post found</h3>: posts.map(o=>
              <PostList key={o.id} title={o.title} id={o.id} />
            )}
          </div>
          <div className="col-md-8">
            {id && <PostDetails />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
