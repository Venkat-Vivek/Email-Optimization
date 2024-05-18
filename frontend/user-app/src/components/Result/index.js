const Result = (props) => {
    const {experimentData} = props
    return(
        <div style={{ textAlign: 'center' }}>
        {experimentData && experimentData.exp1 !== null && experimentData.exp2 !== null && (
          experimentData.exp1 > experimentData.exp2 ? (
            <h3>Experiment 1 is tended to have higher view rates</h3>
          ) : experimentData.exp1 < experimentData.exp2 ? (
            <h3>Experiment 2 is tended to have higher view rates</h3>
          ) : experimentData.exp1 !== 0 && experimentData.exp2 !== 0 ? (
            <h3>Both experiments have equal chances of having higher view rates</h3>
          ) : null
        )}
      </div>
    )
}

export default Result