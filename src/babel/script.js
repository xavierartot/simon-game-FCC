//https://toddmotto.com/mastering-the-module-pattern/#revealing-module-pattern
let Simon = ( () => {
  let data = { 
    caseCoche          : document.querySelector('.caseCoche'),
    start              : document.querySelector('.text__start'),
    startActive        : document.querySelector('.text__btn'), //start btn
    green              : document.querySelector('.shape__color-green'),
    red                : document.querySelector('.shape__color-red'),
    blue               : document.querySelector('.shape__color-blue'),
    yellow             : document.querySelector('.shape__color-yellow'),
    shape              : document.querySelectorAll('.shape__color'),
    countBox           : document.querySelector('.text__box'),//count
    arraySimon         : [3,2,3,1,4,1,4]
  },
  dataGame = {
    1 : {color :'green'  , num :  1, sound:  'http://artot.net/sounds/other1.mp3'    },
    2 : {color :'red'    , num :  2, sound:  'http://artot.net/sounds/other2.mp3'    },
    3 : {color :'blue'   , num :  3, sound:  'http://artot.net/sounds/play.mp3'      },
    4 : {color :'yellow' , num :  4, sound:  'http://artot.net/sounds/soft.mp3'      }
  },
  errorSound = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', //from https://www.freecodecamp.com/challenges/build-a-simon-game
  color       = '',
  random      = '',
  randomTemp  = ''

  // private
  let _playSound = (sound) => {
    new Audio(sound).play()
  }

  // the ai start
  let _turn = (t) => {
    if (data.caseCoche.checked !== false) {
      alert('turn on the game')
      return false
    }
    return t % 2 === 0 ? console.log(1) : console.log(0)
  }

  let error = (time) => {
    return setTimeout(function () {
      _playSound(errorSound )
      data.countBox.textContent = 'err'
      data.countBox.classList.add('error')
      _ai()
    }, time);//1s
  }

  let opponent = () => {
    data.arraySimon.push( dataGame[randomTemp] )
    for (let i = 0, l = data.arraySimon.length; i < l; i++) {
      let cur= data.arraySimon[i], prev = data.arraySimon[i-1];
      //console.log(cur);
    }
  }

  let addOneStep = () => {
    let d = data.arraySimon 

    randomTemp = Random()
    d.push( dataGame[randomTemp] )

    data.countBox.textContent = d.length 

    setTimeout(function () {

      //add color with randomTemp 
      for (let prop in data){
        if (data.hasOwnProperty(prop)) {
          let d =data[prop] 
          if (prop === dataGame[randomTemp].color) {
            d.classList.add('active')
          }
        }
      }
      //add sound with randomTemp 
      _playSound(dataGame[randomTemp].sound)
      console.log(dataGame[randomTemp].sound);

    }, 1000);//1s
  }
  
  let _ai = () => {
    let d = data.arraySimon, j=0, anim
    if (d.length === 0) {
      //add a step
      setTimeout(function () {
        addOneStep() 
      }, 1e3);//1s
    } else{
      //if the array is not empty loop through every seconds
      //then, add a step
      if (d.length > 0 && j <= d.length) {
        console.log(d);
        anim = setInterval(function () {
          if (j >= d.length ) {
            clearInterval(anim)
            //add one step
            setTimeout(function () {
              //return addOneStep() 
            }, 1e3);//1s
          } else{
            removeActive()
            console.log(d[j]);
            console.log(dataGame[d[j]].color);
            console.log(dataGame[d[j]].sound);
            
            for (let prop in data){
              if (data.hasOwnProperty(prop)) {
                let da =data[prop] 
                if (prop === dataGame[d[j]].color) {
                  da.classList.add('active')
                }
              }
            }
            //add sound with randomTemp 
            _playSound(dataGame[d[j]].sound)
            console.log(dataGame[d[j]].sound);
            //for (let i = 0, l = d.length; i < l; i++) {
              //let current = d[i]
              //console.log(current);
              //for (let prop in dataGame){
                //if (dataGame.hasOwnProperty(prop)) {
                  //if (dataGame[prop].num === current) {
                    //console.log(dataGame[prop].color);
                    //console.log(dataGame[prop].sound);
                  //}
                  
                //}
              //}
            //}
          } 
          j++
        }, 1e3);//1s
      }
    } 
  }

  //random between 1 and 4
  let Random = () => {
    random =  Math.floor(Math.random() * 4) + 1  
    return random 
  }

  let removeActiveClass = () => {
    let col = document.querySelectorAll('.shape__color')
    for (let i = 0; i < col.length; i++) {
      col[i].classList.remove('active')
    }
  }

  // private
  // dataGame = sound, num, color
  let _start = () => {
    data.caseCoche.checked = false
    //checked
    data.caseCoche.addEventListener('change',function() {
      //console.log(this.checked);
      if (this.checked) {//if this.checked is true
        return true
      } else{
        //empty arraySimon 
        //data.arraySimon = []

        data.startActive.classList.remove('active')

        //remove class error
        data.countBox.classList.remove('error')
        data.countBox.textContent = ''
        //remove class active
        removeActiveClass()

        return true
      } 

    });
    data.start.addEventListener('click', function(e) {
      if (data.caseCoche.checked === true) {
        //start the ai
        _ai()
        //start btn
        data.startActive.classList.add('active')
        //remove .error
        data.countBox.classList.remove('error')
      } //end checked true
      e.preventDefault();
    }); // end click on start
    return false
  }

  let shapeClick = () => {
    for (let i = 0, l = data.shape.length; i < l; i++) {
      let current = data.shape[i], prev = data.shape[i-1];
      current.addEventListener('click', function(e) {
        let $this = this.textContent
        this.classList.add('active')
        _playSound(dataGame[$this].sound)
        e.preventDefault();
      });
    }


  }

  let removeActive = () => {
    for (let i = 0, l = data.shape.length; i < l; i++) {
      let current = data.shape[i], prev = data.shape[i-1];
      if (current.classList.contains('active') === true) {
        current.classList.remove('active')
      }
    }
  }

  //main
  let main  = () => {

    shapeClick()
    _start()
    removeActive()
    return true
  };

  return {
    main : main
  };

})();
Simon.main()
//Simon.anotherMethod ()
