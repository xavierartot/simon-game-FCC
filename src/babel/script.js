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
    //arraySimon         : [3,1,2,3,4,1,4,2],
    arraySimon         : [],
    arrayOppoment      : [],
    countBox           : document.querySelector('.text__box'),//count
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
  d = data.arraySimon,
  randomTemp  = ''

  console.log(d);

  // private
  let _playSound = (sound) => {
    new Audio(sound).play()
  }

  // the ai start
  let turn = (t) => {
    if (data.caseCoche.checked !== false) {
      alert('turn on the game')
      return false
    }
    return t % 2 === 0 ? console.log(1) : console.log(0)
  }

  let error = (time) => {
    return setTimeout(function () {
      _playSound(errorSound )
      //data.countbox === text box
      data.countBox.textContent = 'err'
      data.countBox.classList.add('error')
      //send to different ai() ex: _aiError()
      _ai()
    }, time);//1s
  }

  let opponent = (pawn) => {
    let randomTemp = (pawn !== undefined) ? pawn : randomTemp
    //d.push( dataGame[randomTemp] )
  }

  let addOneStep = () => {

    //console.log('add one step');
    randomTemp = Random()

    setTimeout(function () {
      d.push( dataGame[randomTemp] )

      data.countBox.textContent = d.length 

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

      setTimeout(function () {
        removeActiveClass()
      }, 1500);//1s

    }, 2500);//1s
  }

  let _ai = () => {
    let j=0, anim, d = data.arraySimon
    console.log(j);
    console.log('arraySimon : '+d);
    console.log('arraySimon length: '+d.length);
    if (d.length === 0) {
      //add a step if arraySimon it's === 0
      return addOneStep()
    } else{
      //if the array is not empty loop through every seconds
      //then, add a step
      if (d.length > 0 && j <= d.length) {
        anim = setInterval(function () {

          //remove all class active
          removeActiveClass()

          if (j > d.length ) {
            console.log('j >= d.length');
            clearInterval(anim)
            j++
            //add one step
            return addOneStep() 
          } else{
            //d.push( dataGame[randomTemp] )
            for (let i = 0, l = d.length; i < l; i++) {
              let current = d[i] //current object
              //console.log(current);
              //console.log(current.num);
              //console.log(current.color);
              //console.log(data[current.color]);
              //console.log(data[current.color].classList.add('active'));
              data[current.color].classList.add('active')
              //add sound with randomTemp 
              _playSound(current.sound)
            }
            clearInterval(anim)
            setTimeout(function () {
              removeActiveClass()
            }, 700);//1s
            j++
            addOneStep() 
          }
        }, 1000);//1s
      }
    }
    console.log(j);
    console.log('arraySimon : '+d);
    console.log('arraySimon length: '+d.length);
  }

  //random between 1 and 4
  let Random = () => {
    random =  Math.floor(Math.random() * 4) + 1  
    return random 
  }

  let emptyDataArraySimon = () => {
    while (d.length) { d.pop(); }
  }

  let changeCheckbox = () => {
    data.caseCoche.addEventListener('change',function() {
      if (this.checked) {//if this.checked is true
        //empty arraySimon 
        emptyDataArraySimon()
      } else{
        //empty arraySimon 
        emptyDataArraySimon()

        //start circle
        data.startActive.classList.remove('active')

        //remove class error
        data.countBox.classList.remove('error')
        data.countBox.textContent = ''
        //remove class active
        removeActiveClass()

      }
      return true
    });

  }
  // private
  // dataGame = sound, num, color
  let _start = () => {
    //checke to false
    data.caseCoche.checked = false
    //test the checked
    changeCheckbox()

    data.start.addEventListener('click', function(e) {
      if (data.caseCoche.checked === true) {
        //start the ai
        _ai()
        //start btn
        data.startActive.classList.add('active')
        //remove .error
        data.countBox.classList.remove('error')
      } 
      //end checked true
      e.preventDefault();
    }); // end click on start
    return false
  }

  let shapeClick = () => {
    for (let i = 0, l = data.shape.length; i < l; i++) {
      data.shape[i].addEventListener('click', function(e) {
        console.log('click oppoment');
        // a chaque fois que je clique sur au item, 
        // je stock l'objet dans un tableaux
        data.arrayOppoment.push(dataGame[this.textContent.trim()])      
        //console.log(data.arrayOppoment);
        //console.log(data.arraySimon);
        for (let i = 0, l = data.arraySimon.length; i < l; i++) {
          let currentDataSimon = data.arraySimon[i]
          console.log(data.arrayOppoment);
          console.log(data.arraySimon);
          console.log(data.arrayOppoment[i]);
          console.log(data.arraySimon[i]);
          if (data.arraySimon[i].num === data.arrayOppoment[i].num )  {
            console.log(data.arrayOppoment[i]);
            console.log(data.arraySimon[i]);
            this.classList.add('activeClick')
            _playSound(currentDataSimon.sound)
            setTimeout(function () {
              removeActiveClass()
            }, 500);//1s
            //opponent(parseInt(currentShape,10))
          } else{
            //return _ai() with error()
            console.log('error');
            return error()
            //return _ai()
          } 
        }

        e.preventDefault();
        return _ai()
      });
    }

  }

  let removeActiveClass = () => {
    for (let i = 0, l = data.shape.length; i < l; i++) {
      let current = data.shape[i]
      if (current.classList.contains('active') === true) {
        current.classList.remove('active')
      } else if(current.classList.contains('activeClick') === true){
        current.classList.remove('activeClick')

      } 
    }
  }

  //main
  let main  = () => {
    shapeClick()
    _start()
    removeActiveClass()
    return true
  };

  return {
    main : main
  };

})();
Simon.main()
//Simon.anotherMethod ()
