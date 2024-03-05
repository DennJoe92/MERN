//MERN 11 - Watch video to understand
import {createContext, useReducer} from 'react'

export const RoundsContext = createContext()

export const RoundsReducer = (state, action) => {
    switch (action.type){
        case 'SET_ROUNDS':
            return{
                rounds: action.payload
            }
        case 'CREATE_ROUNDS':
            return{
                rounds: [action.payload, ...state.rounds]
            }
        default:
            return state
    }
}

export const RoundsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(RoundsReducer, {
        rounds: null
    }) 

return (
    <RoundsContext.Provider value= {{...state, dispatch}}>
        {children}
    </RoundsContext.Provider>
)
}