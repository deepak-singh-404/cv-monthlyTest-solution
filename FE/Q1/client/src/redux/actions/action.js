import axios from 'axios'

export const setId = (data)=>{
    return {
        type:"SET_ID",
        payload:data
    }
}

export const getPosts = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Get",
                url: "https://jsonplaceholder.typicode.com/posts",
            })
            if(data){
                dispatch({
                    type:"SET_POSTS",
                    payload:data
                })
            }
        }
        catch (err) {
            console.log("Error in getPosts Action", err.message)
        }
    }
}

export const getPost = (id) => {
    return async (dispatch) => {
        try {
        
            const { data } = await axios({
                method: "Get",
                url: `https://jsonplaceholder.typicode.com/posts/${id}`,
            })
            if(data){
                dispatch({
                    type:"SET_POST",
                    payload: data
                })
            }
        }
        catch (err) {
            console.log("Error in getPost Action", err.message)
        }

    }
}


