// const fs = require('fs')
// import * as fs from 'fs'
// import 'mdb-vue-ui-kit/css/mdb.min.css';
const expTable = require('./experienceTable.json')
// const monsterList = JSON.parse(fs.readFileSync(`monsters.json`, 'utf-8'))

// module.exports = class ProbabilityTools {
class ProbabilityTools {

    // function to get all potential loots from a single monster
    singleTable(monster) {
        console.log(`Potential loot drops for ${monster}:\n`)
        const transformed = monster['loot'].reduce(
            (acc, { name, ...x }) => {
                acc[name] = x
                return acc
            },
            {}
        )
        console.table(transformed)
        return transformed
    }


    // create function to determine how dry you are based off of KC and probability

    // function to list how many kills it'll take to achieve a 50% chance for whatever item is given
    // called by default when you call singleItem because it is helpful information to know when asking about a single item
    fiftyChance(item) {
        // formula for probability is take the probability of NOT getting what you want, then subtracting that from 1. e.g, if I want to roll the rare drop table with a 1/128 chance of rolling it, and I want a 50% chance of doing that, I'd do 1 - (127/128)^x = 0.5 where x is what I'm solving for to get 50%. This bubbles down to x = log(0.5)/log(127/128)

        let chance = item['rarity'].split('/') // for example, if passed a rarity of 1/128, this gives [1, 128]
        let notRollingChance = parseInt(chance[1]) - parseInt(chance[0]) // chance to NOT drop this item as loot
        let kills = Math.ceil(
            // use ceiling because if you need above a 50% chance, you need to do one more if given a decimal
            Math.log(0.5) / Math.log(notRollingChance / parseInt(chance[1]))
        )
        let msg = `To achieve at least a 50% chance to drop this item, you'd need to kill ${kills} of this monster.`
        console.log(msg)
        return msg
    }
    // function to find single loot item from a single monster and print how many monsters you'd need to kill to get a 50% chance of getting that item
    singleItem(monster, item) {
        let found = false
        console.log(`Drop rates for ${item} from ${monster}:\n`)
        // const transformed = creature['loot'].reduce((acc, {name, ...x}) => { acc[name] = x; return acc},{})
        for (let key of monster['loot']) {
            if (key['name'] == item) {
                console.table(key)
                this.fiftyChance(key)
                found = true
            }
        }
        if (found == false) {
            console.log(
                `Unable to find ${item} drop from ${monster}. Please try again.`
            )
        }
    }


    // function to roll specified number of times and gather an estimated loot haul from the given monster
    rollMonsterTable(monster, kills) {
        let totalLoot = {}
        const transformed = monster['loot'].reduce(
            (acc, { name, ...x }) => {
                acc[name] = x
                return acc
            },
            {}
        )   

            // uncomment this line if you wish to also see a table with all potential loot from the monster, as well as the full loot table from this function
            // singleTable(monster)

        let lootArray = {}
        for (let key of monster['loot']) {
            lootArray[key['name']] = key['rarity']
        }

        // loop *kills* amount of times with probabilitySolver to gather total loot amounts
        for (let kill = 0; kill < kills; kill++) {
            let loot = this.probabilitySolver(lootArray)

            for (let item of loot) {
                let itemAmount = 1
                if (transformed[item]['quantity'].indexOf('-') > -1) {
                    let range = transformed[item]['quantity'].split('-')
                    itemAmount = Math.floor(
                        Math.random() *
                            (parseInt(range[1]) - parseInt(range[0])) +
                            parseInt(range[0])
                    )
                } else itemAmount = parseInt(transformed[item]['quantity'])

                if (totalLoot[item]) totalLoot[item] += itemAmount
                else totalLoot[item] = itemAmount
            }
        }

        // console.log(
        //     `Your total estimated loot haul from killing ${kills} ${monster} is:`
        // )
        // console.table(totalLoot)
        console.log(totalLoot.quantity, totalLoot.name)
        return totalLoot
    }



    // function to take in a count and rolls that amount of times for the loot array that is passed in, gathering random items from each loop, then cumulatively adding the loot together to return the total loot, called droppedLoot
    probabilitySolver(lootArray) {
        let current = 0
        let droppedLoot = []
        let probabilityOrder = {}
        for (let item of Object.keys(lootArray)) {
            if (lootArray[item] === 'Always') {
                droppedLoot.push(item)
            } else {
                let probability = lootArray[item].split('/')
                probabilityOrder[item] = [
                    current,
                    (current += parseInt(probability[0]) - 1),
                ]
                current++
                // console.log(`${item} = ${probabilityOrder[item][0]} - ${probabilityOrder[item][1]}`)
                // console.log(`${item} rolling numbers = [${probabilityOrder[item][0]} - ${probabilityOrder[item][1]}]`)
            }
        }
        let roll = Math.floor(Math.random() * 128)
        for (let item of Object.keys(probabilityOrder)) {
            if (
                roll < probabilityOrder[item][1] &&
                roll >= probabilityOrder[item][0]
            ) {
                droppedLoot.push(item)
            }
        }
        // console.log(roll)

        // console.log(droppedLoot)
        return droppedLoot
        // console.log(probabilityOrder['Right skull half'][1] - probabilityOrder['Right skull half'][0])
    }

    // function to calculate experience necessary to reach a goal level from your current level depending on monster's experience value. 
    calcExpNeeded(monster, currentLevel, goalLevel) {
        let experienceNeeded = expTable.experienceTable[goalLevel-1].experience - expTable.experienceTable[currentLevel-1].experience
        // console.log(expTable.experienceTable[goalLevel-1].experience)
        // console.log(`${experienceNeeded / monster.stats.experience} exp is needed for the next level`)
        // console.log(`${experienceNeeded} experience is needed for the next level. You will need to kill ${Math.ceil(experienceNeeded / monster.stats.experience)} ${monster.name}s to reach this level.`)
        return {
            "experienceNeeded":experienceNeeded,
            "monstersNeeded":Math.ceil(experienceNeeded / monster.stats.experience)
        }
    }
}

export default new ProbabilityTools()