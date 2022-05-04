<template>
    <div class="mt-5 text-center" >
        <div class="mb-3 mt-5 row justify-content-center">
            <select
                class="form-select w-25 col-sm-4 mx-3"
                id="monsterSelector"
                name="monsterSelector"
                v-model="currentMonsterName"
                v-on:change="getCurrentMonster($event)"
            >
                <option selected value=""> -- Choose Monster -- </option>
                <!-- <option value="Goblin">Goblin</option> -->
                <option v-for="monsterName in monsterNames" :value="monsterName" :key="monsterName">{{monsterName}}</option>
            </select>
            <select
                class="form-select w-25 col-sm-4 mx-3"
                id="functionSelector"
                name="functionSelector"
                v-model="currentFunction"
                @change="functionOutput = []"
            >
                <option selected value=""> -- Choose Function -- </option>
                <!-- <option value="Goblin">Goblin</option> -->
                <option value="fullTable">Full Table</option>
                <option value="fiftyPercent">50% Chance</option>
                <option value="singleKill">Single Kill Roll</option>
                <option value="viewInfo">View Monster Info</option>
                <option value="expCalc">Experience Calculator</option>

            </select>
            <button type="button" class="btn btn-dark col-sm-1 mx-3 w-25" v-on:click="outputCurrentFunction(currentFunction)">Execute Function</button>
        </div>
        <div class="row" v-if="currentFunction=='singleKill'">
            <div class="col">
                <label for="killCount">Amount of Kills:</label>
            </div>
            <div class="col">
                <label for="expNeeded">Amount of Experience Needed:</label>
            </div>
            <div class="col">
                <input type="text" class="col px-2" id="killCount" v-model="killCount">
            </div>
            <div class="col">
                <input type="text" class="col" id="expNeeded" v-model="expNeeded">
            </div>
        </div>
        <div class="row mt-4">
            <div v-if="currentFunction=='viewInfo'" class="col">
                <div class="row">
                    <h6 class="header col">Monster Stats</h6>
                    <h6 class="header col">Item Info</h6>
                </div>
                <div class="row">
                    <div class="d-flex justify-content-between w-50 col table-wrap">
                        <table class="table table-dark table-sm table-bordered table-striped table-info table-font">
                            <thead>
                                <tr>
                                    <th>Level</th>
                                    <th>Health</th>
                                    <th>Experience</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{monsterStats.level}}</td>
                                    <td>{{monsterStats.health}}</td>
                                    <td>{{monsterStats.experience}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex justify-content-between w-50 col table-wrap">
                        <table class="table table-dark table-sm table-bordered table-striped table-info table-font">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Rarity</th>
                                </tr>
                            </thead>
                            <tbody class="itemTable">
                                <tr v-for="item in itemList" :key="item.name">
                                    <td>{{item.name}}</td>
                                    <td>{{item.quantity}}</td>
                                    <td>{{item.rarity}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div v-if="currentFunction!=''" class="col">
                <div class="row">
                    <h6 class="header col" v:model="outputMessage">{{outputMessage}}</h6>
                </div>
                <div class="row table-wrap" aria-label="functionOutputDiv">
                    <table v-if="currentFunction!='fullTable'" class="table table-dark table-sm table-bordered table-striped table-info table-font"  >
                        <thead>
                            <tr>
                                <th class="w-50">Item Name</th>
                                <th>Quantity Received</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item of Object.keys(functionOutput)" :key="item">
                                <td>{{item}}</td>
                                <td>{{functionOutput[item]}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table v-if="currentFunction=='fullTable'" class="table table-dark table-sm table-bordered table-striped table-info table-font"  >
                        <thead>
                            <tr>
                                <th class="w-33">Item Name</th>
                                <th>Quantity Received</th>
                                <th>Rarity of Drop</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item of Object.keys(functionOutput)" :key="item">
                                <td>{{item}}</td>
                                <td>{{functionOutput[item].quantity}}</td>
                                <td>{{functionOutput[item].rarity}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProbabilityTools from '../assets/probabilityTools'
const axios = require('axios').default

export default {
    name: 'FunctionScreen',
    props: {
        msg: String
    },
    data() { 
        return {
            monsterNames: [],
            currentMonsterName: '',
            currentMonster: null,
            monsterStats: [],
            outputMessage: '',
            // monsterSelector: null,
            currentPage: 'monsters',
            url: window.location.origin,
            itemList: [],
            probabilityTools: null,
            currentFunction: '',
            functionOutput: [],
            selectedItem: {
                "name": "Gold stone spirit",
                "quantity": "1",
                "rarity": "3/128"
            },
            killCount: 1,
            expNeeded: 0
        }
    },
    methods: {
        getMonsterNames: async function () {
        // get list of monster names to populate the selector
            try {
                const response = await axios({
                    url: `http://localhost:8080/api/monsters`,
                    method: 'GET',
                    timeout: 8000,
                    headers: { 'Content-Type': 'application/json' },
                })
                // successful, pass data from request to loadedData
                // console.log(response.data)
                for (let monster of response.data) {
                    // console.log(monster)
                    this.monsterNames.push(monster.name)
                }
                // this.monsterNames = response.data
            } catch (error) {
                console.log(error)
            }

            // this.logs = this.loadedData.logs
            // // If UVU ID and course are valid, enable Add Log button
            // if (this.loadedData.id === this.uvuIdVal)
            //     document
            //         .getElementById('submitBtn')
            //         .removeAttribute('disabled')

        },
        getCurrentMonster: async function (event) {
            // handle re-selecting base case, which will clear current tables. 
            if (event.target.value === '') {
                this.monsterStats = this.itemList = [] 
                this.currentMonster = null
            }
            // otherwise, sed request to get currentMonster's information
            else {
                try {
                    const response = await axios({
                        url: `http://localhost:8080/api/monsters/${this.currentMonsterName}`,
                        method: 'GET',
                        timeout: 8000,
                        headers: { 'Content-Type': 'application/json' },
                    })
                    // successful, pass data from request to loadedData
                    // this.monsterNames = response.data
                    let monsterObject = response.data
                    if (monsterObject.name == this.currentMonsterName) {
                        this.itemList = monsterObject.loot
                        this.monsterStats = monsterObject.stats
                        this.currentMonster = monsterObject
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }, 
        outputCurrentFunction: function (functionName) {
            // handle re-selecting base case, which will clear current tables. 
            switch(functionName) {
                case 'singleKill': 
                    this.functionOutput = ProbabilityTools.rollMonsterTable(this.currentMonster, this.killCount)
                    this.outputMessage = `The estimated drops from killing a single ${this.currentMonster.name} are:`
                    break
                case 'fullTable': 
                    this.functionOutput = ProbabilityTools.singleTable(this.currentMonster)
                    this.outputMessage = `The full table of potential drops for ${this.currentMonster.name} is:`
                    break
                case 'fiftyPercent': 
                    this.functionOutput = this.selectedItem
                    this.outputMessage = ProbabilityTools.fiftyChance(this.selectedItem)
                    break
                case 'expCalc': {
                    let results = ProbabilityTools.calcExpNeeded(this.currentMonster, 92, 99)
                    this.outputMessage = `${results.experienceNeeded.toLocaleString('en-US')} experience is needed for the next level. You will need to kill ${results.monstersNeeded.toLocaleString('en-US')} ${this.currentMonster.name}s to reach this level.`
                    break
                }
                default:
                    break

            }
        },
    },
    mounted() {
        this.getMonsterNames()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
    .table-wrap {
        max-height: 500px;
        overflow-y: auto;
    }
    thead {
        position: sticky; 
        top: 0;
        border-style: solid;
        border-width: 1px ;
    } 
    table {
        margin-bottom: 0% !important;
    }
</style>