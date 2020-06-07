const templateReducer = (state, action) => {
    switch(action.type){
        case 'SET_TEMPLATE':
            return action.payload;
        case 'ADD_ITEM':
            return [
                ...state,
                action.payload.item
            ]
        case 'EDIT_ITEM':
            return state.map(item => {
                if(item.id === action.payload.id){
                    return {
                        ...item,
                        ...action.payload.item
                    }
                }
                return item
            })
        case 'REMOVE_ITEM':
            return state.filter(item => 
                item.id !== action.payload.id
            )
        default:
            return;        
    }
}

export default templateReducer;