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
                v-on:change="rollMonsterTable(Minotaur)"
            >
                <option selected value=""> -- Choose Function -- </option>
                <!-- <option value="Goblin">Goblin</option> -->
                <option value="fullTable">Full Table</option>
                <option value="fiftyPercent">50% Chance</option>
                <option value="singleKill">Single Kill Roll</option>
            </select>
        </div>
        <div class="row">
            <div v-if="currentMonster!=''" class="col">
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
                    <h6 class="header col">{{currentFunction}} Output:</h6>
                </div>
                <div class="row" aria-label="functionOutputDiv">
                    <table class="table table-dark table-sm table-bordered table-striped table-info table-font">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity Received</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item of functionOutput.loot" :key="item.loot.name">
                                <td>{{item.loot.name}}</td>
                                <td>{{item.loot.quantity}}</td>
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
export default {
    name: 'MonsterList',
    props: {
        msg: String
    },
    data() {
        return {
            output: ProbabilityTools.rollMonsterTable({
                "name": "Goblin",
                "id": "Goblin",
                "loot": [
                    {
                        "name": "Bones",
                        "quantity": "1",
                        "rarity": "Always"
                    },
                    {
                        "name": "Coins",
                        "quantity": "1-20",
                        "rarity": "43/128"
                    }
                ],
                "stats": {
                        "level":5,
                        "health":500,
                        "experience":30
                    }
            }, 10)
        }
    }   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
