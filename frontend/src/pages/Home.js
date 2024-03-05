import { useEffect, useState } from "react"
import {useRoundsContext} from "../hooks/useRoundsContext"
//import components
import RoundDetails from "../components/roundDetails.js"
import NewRoundForm from "../components/NewRoundForm.js"

const Home = () => {
    const {rounds, dispatch} = useRoundsContext()
    
    useEffect(() => {
        const fetchRounds = async () => {
            const response = await fetch('/api/rounds')
            const json = await response.json()

            if (response.ok) {
               dispatch({type: 'SET_ROUNDS', payload: json})
           
            }
        }

        fetchRounds()
    }, []);

    return (
        <div className="home">
            <div className="Rounds">
                {rounds && rounds.map((round) => (
                     <RoundDetails round={round} key={round._id} />
                    
                ))}
        </div>
        <NewRoundForm />
    </div>
    )
                }
export default Home