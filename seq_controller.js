var ALL_FACTS = ['foo','bar','zoe','boley','boo','bug']

function random_array_eater(){
  var FACT
  const LEN = ALL_FACTS.length
  FACT = ALL_FACTS.splice(ALL_FACTS[Math.floor(Math.random() * LEN)],1)[0]

  //if (items.length>0){
  //  const factIndex = Math.floor(Math.random() * items.length);
  //   FACT = items.splice(factIndex,1)[0]
     //console.log(new_set)
  //}
  //else{
  //  item = -1
  //}
  return FACT

}

console.log(random_array_eater(ALL_FACTS))
console.log(random_array_eater(ALL_FACTS))
console.log(random_array_eater(ALL_FACTS))
console.log(random_array_eater(ALL_FACTS))
console.log(random_array_eater(ALL_FACTS))
console.log(random_array_eater(ALL_FACTS))
console.log(random_array_eater(ALL_FACTS))
console.log(random_array_eater(ALL_FACTS))
console.log(random_array_eater(ALL_FACTS))
