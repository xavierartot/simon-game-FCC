//https://toddmotto.com/mastering-the-module-pattern/#revealing-module-pattern
let Simon = ( () => {
  let ele = { 
    caseCoche : document.querySelector('.caseCoche')
  },

  dataGame = {
    '1' : {color :'green'  , num :  1, sound:  'http://artot.net/sounds/soft.mp3'             },
    '2' : {color :'red'    , num :  2, sound:  'http://artot.net/sounds/tied.mp3'             },
    '3' : {color :'blue'   , num :  3, sound:  'http://artot.net/sounds/win.mp3'              },
    '4' : {color :'yellow' , num :  4, sound:  'http://artot.net/sounds/Storm_exclamation.mp3'}
  }

  // private
  let _playSound = (sound) => {
    new Audio(sound).play()
  }

  //recursive
  let ai = () => {
    
  }

  let _turn = (t) => {
    let r = (t === '') ? t : t
  }
  // private
  let _someMethod = () => {
    console.log('ddddd')
  };

  //main
  let main  = () => {
    caseCoche.addEventListener('change',function() {
      console.log(this.checked);
    });
    someMethod()
    return true
  };

  //return an object
  return {
    main : main
  };

})();
Simon.main()
//Simon.anotherMethod ()
