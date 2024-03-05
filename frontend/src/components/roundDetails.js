const RoundDetails = ({ round }) => {


    return (
        <div className="round-details">
            <h4>{round.course}</h4>
            <p><strong>Players:</strong>{round.player}</p>
            <p><strong>Score:</strong>{round.score}</p>
            <p>{round.date}</p>
        </div>
    );
};

export default RoundDetails;