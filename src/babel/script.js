//https://toddmotto.com/mastering-the-module-pattern/#revealing-module-pattern
String.prototype.trim = function() {
    return this.replace(/^\s*|\s*$/g, '')
}
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
    shapeParent        : document.querySelectorAll('.shape'),
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
  as = data.arraySimon,
  ao = data.arrayOppoment,
  randomTemp  = ''

  // private
  let _playSound = (sound) => {
    new Audio(sound).play()
  }

  let randAddItem = (rand) => {
    let random = Math.floor(Math.random() * 4) + 1,
    temp = (rand !== undefined) ? ao.push( rand) : as.push( random )
    return random
  }

  let addOneStep = () => {

    //showShape()
    let randNumber = randAddItem()
    console.log(randNumber);

    setTimeout(function () {
      //add sound with randomTemp 
      for (let prop in data){
        if (data.hasOwnProperty(prop)) {
          let d =data[prop] 
          if (prop === dataGame[randNumber].color) {
            //console.log(prop);
            d.classList.add('active')
            _playSound(dataGame[randNumber].sound)
            data.countBox.textContent = as.length 
            //console.log('i addOneStep ');
          }
        }
      }
    }, 2000);//1s

    setTimeout(function () {
      removeActiveClass()
      //showShape()
      emptyDataArray(ao)//delete arrayOppoment
    }, 2600);//1s
    console.log(as);
    console.log(randNumber);
    //return randNumber;
  }

  let _ai = () => {
    let anim //, d = data.arraySimon
    //console.log(as);
    if (as.length === 0) {
      //add a step if arraySimon it's === 0
      addOneStep()
    } else if(as.length > 0){
      //console.log(as);
      as.forEach(function (cle, i, origin) {
        //console.log(`cle = ${cle}, val= ${as[cle]}, index = ${i}, origin = ${i}`);
        anim = setTimeout(function(i) { // i is replace by j   
          for (let prop in data){
            if (data.hasOwnProperty(prop)) {
              if (prop === dataGame[cle].color) {
                setTimeout(function () {
                  //showShape()
                  $('.'+prop).addClass('active')
                  _playSound(dataGame[cle].sound)
                }, 2000);//1s
                setTimeout(function () {
                  //hideShape()
                  //console.log('removeActiveClass');
                  removeActiveClass()
                }, 2500);//1s
              }
            }
          } //end forin
          if (as.length-1  === i) {
            //console.log(i);
            //console.log('start addOneStep');
            setTimeout(function () {
              //console.log('ai addOneStep');
              addOneStep()
              return this
            }, 1000);//1s
          }
        }, i * 1000, i); // we're passing i in the argument of the callBack
      });
    }
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

  //random between 1 and 4
  //let Random = () => {
    //random =  Math.floor(Math.random() * 4) + 1  
    //return random 
  //}

  let emptyDataArray = (array) => {
    while (array.length)  
      array.pop()
  }

  let watchCheckbox = () => {
    data.caseCoche.addEventListener('change',function() {
      //empty arraySimon 
      emptyDataArray(as)// delete arraySimon
      if (!this.checked) {//if checked is false
        //start circle - change the circle a rouge
        data.startActive.classList.remove('active')
        //remove class error
        data.countBox.classList.remove('error')
        data.countBox.textContent = ''
        //remove class active
        removeActiveClass()
        return false
      } else{
        return true
      } 
    });
  }

  // private
  // dataGame = sound, num, color
  let _start = () => {
    //checke to false
    data.caseCoche.checked = false
    //test if the checked 
    watchCheckbox ()

    data.start.addEventListener('click', function(e) {
      if (data.caseCoche.checked === true) {
        //start the ai
        addOneStep() 
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

  let hideShape = () => {
    $('.shape__color').each(function (index, e) {
      if ( $(this).is('.shape__color-green') ) {
        $(this).after( '<div class="shape__color-green temp">i</div>' )
      } else if( $(this).is('.shape__color-red') ){
        $(this).after( '<div class="shape__color-red temp">i</div>' )
      } else if( $(this).is('.shape__color-blue') ){
        $(this).after( '<div class="shape__color-blue temp">i</div>' )
      } else if( $(this).is('.shape__color-yellow') ){
        $(this).after( '<div class="shape__color-yellow temp">i</div>' )
      } 
    });
  }

  let showShape = () => {
    return $('.temp').remove()
  }

  let clickShape = () => {
    let clickCount = 0, numClick = 0 
    $('.shape__color').on('click', function (e) {
      //hold the number clicked
      numClick = parseInt(this.textContent.trim(),10)
      //console.log(numClick);
      randAddItem(numClick)//push the click in ao (array oppoment)
      clickCount++ //count the click number
      let sound = dataGame[parseInt(this.textContent.trim(),10)].sound
      if (as.length === 1 && clickCount === 1) {
        _playSound(sound)
        this.classList.add('activeClick')
        setTimeout(function () {
          removeActiveClass()
          //console.log('ai click 1');
          _ai()
        }, 800);//1s
        return this
      } else if(as.length > 1){ 
        //console.log(numClick);
        //console.log(as);
        //console.log(ao);
        for (let i = 0, l = as.length; i < l; i++) {
          if (as[i]=== ao[i])  {
            //console.log('succes');
            _playSound(sound)
            this.classList.add('activeClick')
            //console.log('1 valeur dans ao');
            if(as.length === ao.length){
              setTimeout(function () {
                //console.log('ai click');
                removeActiveClass()
                return _ai()
              }, 800);//1s
            }
          } else if(as[i] !== ao[i]){
            //console.log('nope succes');
            //console.log(as[i]);
            //console.log(ao[i]);
          } else{
            //console.log('error');
            //return error()
            //return _ai()
          } 
        }
        e.preventDefault();
        // event handler
      }
    });
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
    clickShape()
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
