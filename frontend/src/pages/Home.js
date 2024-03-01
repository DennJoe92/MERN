import { useEffect, useState } from "react"

//import components
import RoundDetails from "../components/roundDetails"

const Home = () => {
    const [rounds, setRounds] = useState(null)
    
    useEffect(() => {
        const fetchRounds = async () => {
            const response = await fetch('/api/rounds')
            const json = await response.json()

            if (response.ok) {
                setRounds(json)
            }
        }

        fetchRounds()
    }, [])

    return (
        <div className="home">
            <div className="Rounds">
                {rounds && rounds.map((round) => (
                     <RoundDetails round={round} key={round._id} />
                    
                ))}
        </div>
    </div>
    )
                }
export default Home