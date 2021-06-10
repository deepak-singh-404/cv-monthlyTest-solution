const initialState = {
   posts:[],
   post:{},
   id:""
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_POSTS":
            return {
                ...state,
                posts:action.payload
            }
        case "SET_POST":
            return {
                ...state,
                post: action.payload
            }
        case "SET_ID":
                return {
                    ...state,
                    id: action.payload
        }    
        default:
          return state
    }
}

export default reducer