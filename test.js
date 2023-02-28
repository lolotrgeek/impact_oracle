const { impact_confidence } = require("./main")

const action = 'clean' 
const stateBefore = 100 
const stateAfter = 80 
const levelOfConfidence = 0.95

impact_confidence(action, stateBefore, stateAfter, levelOfConfidence)