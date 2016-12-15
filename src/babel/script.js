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
  clickCount, 
  randomTemp  = ''

  // private
  let _playSound = (sound) => {
    new Audio(sound).play()
  }

  let randAddItem = (rand) => {
    let randNum = (Math.floor(Math.random() * 4) + 1), temp
    if (rand !== undefined && rand !== '') {
      ao.push( rand)
      temp = rand
    } else {
      as.push( randNum )
      temp = randNum
    }
    
    return temp 
  }

  let addOneStep = () => {
    let ide = 0, randNumber 
    if (ide === 0) {
      ide++
      randNumber = randAddItem()

      //console.log('one step ' + as, ao);
      setTimeout(function () {
        //add sound with randomTemp 
        showShape()
        for (let prop in data){
          if (data.hasOwnProperty(prop)) {
            let d =data[prop] 
            //console.log(ide);
            if (prop === dataGame[randNumber].color && ide === 1) {
              ide++
              //console.log(prop);
              d.classList.add('active')
              _playSound(dataGame[randNumber].sound)
              data.countBox.textContent = as.length 
              //console.log('i addOneStep ');
            }
          }
        }
      }, 1500);//1s

      setTimeout(function () {
        removeActiveClass()
        showShape()
        emptyDataArray(ao)//delete arrayOppoment
        //console.log(ide);
      }, 2000);//1s
      //return randNumber;
    }
  }

  let _ai = () => {
    let anim, total=0, flag //, d = data.arraySimon
    //console.log(as);
    if (as.length === 0) {
      //add a step if arraySimon it's === 0
      addOneStep()
    } else if(as.length > 0 && as.length < 20){
      for (let i = 0, l = as.length; i < l; i++) {
        let current = as[i], prev = as[i-1];
        if (as.length === ao.length) {
          if (as[i] === ao[i]) {
            //console.log('succes game');
            flag = true
          } else{
            //console.log('les tab sont diff');
            errorGame(2000)
            flag = false
          } 
        } else {
          //console.log('les tab longueur diff');
          errorGame(2000)
          flag = false
        }
      }
      if (flag === true) {
        hideShape()
        //console.log(as);
        as.forEach(function (cle, i, origin) {
          anim = setTimeout(function(i) { // i is replace by j   
            for (let prop in data){
              if (data.hasOwnProperty(prop)) {
                if (prop === dataGame[cle].color) {
                  setTimeout(function () {
                    $('.'+prop+', .shape__color-'+prop).addClass('active')
                    _playSound(dataGame[cle].sound)
                  }, 2000);//1s
                  setTimeout(function () {
                    //hideShape()
                    removeActiveClass()
                    //showShape()
                  }, 2500);//1s
                }
              }
            } //end forin
          }, i * 1000, i); // we're passing i in the argument of the callBack
          total = i * 1000
        });// end foreach

        for (let i = 0, l = as.length; i < l; i++) {
          //console.log(i);
          if ( (as.length-1) === i) {
            return setTimeout(function () {
              addOneStep()
            }, total + 2000);//1s
            break;
          }
        }

      }
    } else if(as.length >= 20){
       alert("you're win")
      emptyDataArray(as)// delete arraySimon
        //start circle - change the circle a rouge
        data.startActive.classList.remove('active')
        //remove class error
        data.countBox.classList.remove('error')
        data.countBox.textContent = ''
        //remove class active
        removeActiveClass()
        clickCount = 0//used in click
        return false
    } 
    // end else if(as.length > 0)
  }// end _ai()

  let errorGame = (time) => {
    let anim, total=0//, d = data.arraySimon
    clickCount = 0//used in click
    _playSound(errorSound )
    
    data.countBox.textContent = 'err'//data.countbox === text box
    data.countBox.classList.add('error')
    emptyDataArray(ao)//delete arrayOppoment

    return setTimeout(function () {
      hideShape()
      as.forEach(function (cle, i, origin) {
        //console.log(`cle = ${cle}, val= ${as[cle]}, index = ${i}, origin = ${i}`);
        anim = setTimeout(function(i) { // i is replace by j   
          for (let prop in data){
            if (data.hasOwnProperty(prop)) {
              if (prop === dataGame[cle].color) {
                setTimeout(function () {
                  //$('.'+prop).addClass('active')
                  $('.'+prop+', .shape__color-'+prop).addClass('active')
                  //$(this).after( '<div class="shape__color-blue temp">i</div>' )
                  _playSound(dataGame[cle].sound)
                }, 2000);//1s
                setTimeout(function () {
                  //hideShape()
                  removeActiveClass()
                  //showShape()
                }, 2500);//1s
              }
            }
          } //end forin
        }, i * 1000, i); // we're passing i in the argument of the callBack
        total = i * 1000
      });// end foreach
      showShape()
      removeActiveClass()
      data.countBox.textContent = as.length
      data.countBox.classList.remove('error')
      
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
        clickCount = 0//used in click
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
    let numClick = 0 , num, sound
    clickCount = 0
    $('.shape__color').on('click', function (e) {
      console.log( as);
      console.log( ao);
      numClick = parseInt(this.textContent.trim(),10)//hold the number clicked
      num = randAddItem(numClick)//push the click in ao (array oppoment)
      clickCount++ //count the click number
      sound = dataGame[parseInt(this.textContent.trim(),10)].sound//sound
      console.log(as.length);
      console.log(clickCount);
      if (as.length === 1 && clickCount === 1) {
        _playSound(sound)
        this.classList.add('activeClick')
        setTimeout(function () {
          removeActiveClass()
          //console.log('ai click 1');
          return _ai()
        }, 800);//1s
      } else if(as.length > 1){ 
        //console.log('click ' + as, ao);
        loop: for (let i = 0, l = as.length; i < l; i++) {
          //console.log(as, ao);
          //console.log(as[i], ao[i]);
          if (as[i]=== ao[i])  {
            //console.log('equal');
            _playSound(sound)
            this.classList.add('activeClick')
            setTimeout(function () {
              removeActiveClass()
            }, 800);//1s
            //console.log('1 valeur dans ao');
            if(as.length === ao.length){//same size the result is complete
              setTimeout(function () {
                //console.log('click same size' + as, ao);
                removeActiveClass()
                return _ai()
              }, 800);//1s
              break loop;
            }
            //continue loop
            break loop
          } else if(as[i] !== ao[i]){
            console.log('nope equal');
            break;
          } else{
            console.log('error');
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
    $('.temp, .shape__color').removeClass('active activeClick')
    //$('.temp').removeClass('activeClick')
    //for (let i = 0, l = data.shape.length; i < l; i++) {
    //let current = data.shape[i]
    //if (current.classList.contains('active') === true ) {
    //current.classList.remove('active')
    //} else if(current.classList.contains('activeClick') === true){
    //current.classList.remove('activeClick')

    //} 
    //}
  }

  //main
  let main  = () => {
    //let arr1 = [2,5,7,19]
    //let arr2 = [2,5,9,19]
    //for (let i = 0, l = arr1.length; i < l; i++) {
    //let current = arr1[i], prev = arr1[i-1];
    //if (arr1[i] === arr2[i]) {
    //console.log('a, ' +arr1[i]);     
    //} else{
    //console.log('b, ' +arr2[i]);
    //} 
    //}
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
