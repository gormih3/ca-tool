const INPUT_FILE = "f9-challenges"
const challengesJson = require(`./${INPUT_FILE}.json`);
const fs = require('fs');

const allChallengeIds = []
const categories = new Set()
var extractedEssentialChallengeData = challengesJson.map(challenge => {
    categories.add(challenge.category)
    const necessaryFields = {
        id: challenge.id,
        count: challenge.ideaCount,
        title: challenge.name
    }
    allChallengeIds.push(challenge.id)
    return necessaryFields
})


const proposalsCountObject = extractedEssentialChallengeData.reduce((prev, current) => {
    return {
        id: 0,
        title: "All",
        count: (prev.count + current.count)
    }
})
extractedEssentialChallengeData.unshift(proposalsCountObject)

fs.writeFileSync(`./${INPUT_FILE}.challengeIds.extracted.json`, JSON.stringify(allChallengeIds))
fs.writeFileSync(`./${INPUT_FILE}.extracted.json`, JSON.stringify(extractedEssentialChallengeData))
fs.writeFileSync(`./${INPUT_FILE}.categories.json`, JSON.stringify([...categories]))
