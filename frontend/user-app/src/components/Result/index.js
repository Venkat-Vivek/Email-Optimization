const Result = (props) => {
    const {experimentData, info} = props
    // console.log(experimentData)
    return(
        <div style={{ textAlign: 'center' }}>
        {experimentData && info === 'Emails are sent successfully' && experimentData.exp1 !== null && experimentData.exp2 !== null && (
            experimentData.exp1 > experimentData.exp2 ? (
            <h3 className='heading'>Experiment 1 is tended to have higher view rates</h3>
            ) : experimentData.exp1 < experimentData.exp2 ? (
            <h3 className='heading'>Experiment 2 is tended to have higher view rates</h3>
            ) : experimentData.exp1 !== 0 && experimentData.exp2 !== 0 ? (
            <h3 className='heading'>Both experiments have equal chances of having higher view rates</h3>
            ) : (
            <h3 className='heading'>Insufficient data for analysis</h3>
            )
        )}
        </div>

    )
}

export default Result