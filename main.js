// what are the ways to increase or decrease confidence that an action changed some state

// we need to know the possible  ...
// states of the system,
// actions that can be taken,
// outcomes of those actions.

const zValue = require('ztable')

/**
 * Find a confidence interval for the impact of an action on a state
 * @param {*} action 
 * @param {*} stateBefore 
 * @param {*} stateAfter 
 * @param {*} levelOfConfidence 
 * @source https://www.investopedia.com/terms/c/confidenceinterval.asp
 */
function impact_confidence(action, stateBefore, stateAfter, levelOfConfidence = 0.95) {
  const diff = stateBefore - stateAfter
  const mean = diff
  const variance = Math.pow(diff, 2)
  const stdDev = Math.sqrt(variance)

  // Calculate the confidence interval
  const z = zValue(levelOfConfidence)
  
  // find margins of error based on normal distibution
  const marginOfError = z * stdDev / Math.sqrt(1)
  const lowerBound = mean - marginOfError
  const upperBound = mean + marginOfError

  // Output the results
  console.log(`Action: ${action}`)
  console.log(`State before: ${stateBefore}`)
  console.log(`State after: ${stateAfter}`)
  console.log(`Mean difference: ${mean}`)
  console.log(`Standard deviation: ${stdDev}`)
  console.log(`Confidence interval (${levelOfConfidence * 100}%): ${lowerBound} to ${upperBound}`)
  console.log("We are " + levelOfConfidence * 100 + "% confident that the impact of " + action + " on the state is between " + lowerBound + " and " + upperBound + ".")
}

module.exports = { impact_confidence }