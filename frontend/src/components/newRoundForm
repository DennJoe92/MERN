import {useState} from 'react'

//form properties
const NewRoundForm = () => {
    const [course, setCourse] = useState ('')
    const [player, setPlayer] = useState ('')
    const [score, setScore] = useState ('')
    const [date, setDate] = useState ('')
    const [error, setError] = useState (null)

    //form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault()

    const round = {course, player, score, date}
//use fetch api to send a post request to DB
    const response = await fetch('/api/rounds',{
    method: 'POST',
    body: JSON.stringify(round),
    headers: {
        'Content-Type': 'application/json'
    }
    })
    //getting a response if request was ok or not
    const json = await response.json()

    if(!response.ok) {
        setError(json.error)
    }
    if(response.ok) {
        setCourse ('')
        setPlayer ('')
        setScore ('')
        setDate ('')
        setError(null)
        console.log('new Round added', json)
    }
}

    return(
    <form className="create" onSubmit={handleSubmit}>
    <h3>Add a New Round</h3>

        <label>Course:</label>
        <input type="text"
        onChange={(e) => setCourse(e.target.value)}
        value={course}        
        />

        <label>Date:</label>
        <input type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}        
        />

        <label>Player 1:</label>
        <input type="text"
        onChange={(e) => setPlayer(e.target.value)}
        value={player}        
        />

<label>Player 1 Score:</label>
        <input type="number"
        onChange={(e) => setScore(e.target.value)}
        value={score}        
        />
        
        <button>Add New Round</button>
        {error && <div className="error">{error}</div>}
    </form>
    )
 }

export default NewRoundForm
