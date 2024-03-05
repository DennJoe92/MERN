import {RoundsContext} from '../context/RoundsContext'
import {useContext} from 'react'

export const useRoundsContext = () => {
    const context = useContext(RoundsContext)

    if (!context) {
        throw Error('useRoundsContext must be used inside an RoundsContextProvider')
    }

    return context
}