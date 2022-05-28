const router = require("express").Router();
const https = require('https');       
const {checkAuthenticated} = require('../routes/auth')

router.get('/:id', checkAuthenticated, function (req, res) {   
  const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`;
  let data = "";
  https.get(url, function(https_res) {
      https_res.on("data", function(chunk) {  
          data += chunk;
      })
      https_res.on("end", function() {
          data = JSON.parse(data);

          let hpArray = data.stats.filter((obj) => {
              return obj.stat.name == "hp"
          }).map((obj_) => {
              return obj_.base_stat     // 这个返回的是一个array
          })

          let attackArray = data.stats.filter((obj) => {
              return obj.stat.name == "attack"
          }).map((obj_) => {
              return obj_.base_stat     // 这个返回的是一个array
          })

          let defenseArray = data.stats.filter((obj) => {
              return obj.stat.name == "defense"
          }).map((obj_) => {
              return obj_.base_stat     // 这个返回的是一个array
          })

          let specialAttackArray = data.stats.filter((obj) => {
              return obj.stat.name == "special-attack"
          }).map((obj_) => {
              return obj_.base_stat     // 这个返回的是一个array
          })

          let specialDefenseArray = data.stats.filter((obj) => {
              return obj.stat.name == "special-defense"
          }).map((obj_) => {
              return obj_.base_stat     // 这个返回的是一个array
          })

          let speedArray = data.stats.filter((obj) => {
              return obj.stat.name == "speed"
          }).map((obj_) => {
              return obj_.base_stat     // 这个返回的是一个array
          })

          res.render("pages/profile", {  
              "id": req.params.id,
              "name": data.name,
              "hp": hpArray[0],
              "attack": attackArray[0],        
              "defense": defenseArray[0],        
              "spAttack": specialAttackArray[0],        
              "spDefense": specialDefenseArray[0],        
              "speed": speedArray[0]       
          })
      })
  })              
})

module.exports = router;