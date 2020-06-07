const expenseReducer = (state, action) => {
    switch(action.type){
        case 'SET_EXPENSE':
            return action.payload;
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.payload
            ]
        case 'EDIT_EXPENSE':
            return state.map(expense => {
                if(expense.id === action.payload.id){
                    return {
                        ...expense,
                        ...action.payload.expense
                    }
                }
                return expense
            })
        case 'REMOVE_EXPENSE':
            return state.filter(expense => 
                expense.id !== action.payload.id
            )
        default:
            return;        
    }
}

export default expenseReducer;