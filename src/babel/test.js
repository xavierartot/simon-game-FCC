(function() {
  let as = [], ao = []
  let randAddItem = (rand) => {
    let randNum = (Math.floor(Math.random() * 4) + 1), temp
    if (rand !== undefined && rand !== null) {
      ao.push( rand)
      temp = rand
    } else {
      as.push( randNum )
      temp = randNum
    }
    
    return temp  
  }

  let randNumber = randAddItem()
  console.log(randNumber);

}());
