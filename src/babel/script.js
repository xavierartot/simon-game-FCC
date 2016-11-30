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
    countBox           : document.querySelector('.text__box'),//count
    arraySimon         : []
  },

  dataGame = {
    1 : {color :'green'  , num :  1, sound:  'http://artot.net/sounds/other1.mp3'             },
    2 : {color :'red'    , num :  2, sound:  'http://artot.net/sounds/other2.mp3'             },
    3 : {color :'blue'   , num :  3, sound:  'http://artot.net/sounds/play.mp3'              },
    4 : {color :'yellow' , num :  4, sound:  'http://artot.net/sounds/soft.mp3'}
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

  let error = () => {
    _playSound(errorSound )
    data.countBox.textContent = 'err'
    data.countBox.classList.add('error')
    return setTimeout(function () {
      _ai()
    }, 1000);//1s
  }

  let opponent = () => {
    data.arraySimon.push( dataGame[randomTemp] )
    for (let i = 0, l = data.arraySimon.length; i < l; i++) {
      let cur= data.arraySimon[i], prev = data.arraySimon[i-1];
      console.log(cur);
    }


  }
  //recursive
  //console.log(dataGame[Random()].color);
  //console.log(dataGame[Random()].num);
  //console.log(dataGame[Random()].sound);
  let _ai = () => {
    if (data.arraySimon.length === 0) {
      randomTemp = Random()
      setTimeout(function () {
        data.arraySimon.push( dataGame[randomTemp] )
        //add la couleur
        for (let prop in data){
          if (data.hasOwnProperty(prop)) {
            let d =data[prop] 
            if (prop === dataGame[randomTemp].color) {
              d.classList.add('active')
            }
          }
        }
        _playSound(dataGame[randomTemp].sound)
      }, 1000);//1s
      setTimeout(function () {
        error()
      }, 4000);
      return opponent()
    } else if(data.arraySimon.length >= 1){
      alert(1)
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
        data.arraySimon = []
        //start btn
        data.startActive.classList.remove('active')

        //remove classe active
        removeActiveClass()

        return true
      } 

    });
    data.start.addEventListener('click', function(e) {
      if (data.caseCoche.checked === true) {
        _ai()
        //start btn
        data.startActive.classList.add('active')
      } //end checked true
      e.preventDefault();
    }); // end click on start
    return false
  }

  //main
  let main  = () => {
    _start()
    return true
  };

  return {
    main : main
  };

})();
Simon.main()
//Simon.anotherMethod ()
