import { images } from '../index'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Utils = { 
    // --------------------------------
    //  Parse a url and break it into resource, id and verb
    // --------------------------------
    parseRequestURL : () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request
    },

    getRandomAuthors: (str) => {
      let arr = [];
      arr.push(str);
      const databaseNumber = images.length;
      while (arr.length < 4) {
        let randomInt = getRandomInt(databaseNumber);
        if (!arr.includes(images[randomInt].author) && (arr.includes(images[randomInt].author) !== str)) {
          arr.push(images[randomInt].author)
        }
      }
      arr = shuffle(arr);
      return arr;
    },

    getRandomPictures: (str) => {
      let arr = [];
      arr.push(str);
      const databaseNumber = images.length;
      while (arr.length < 4) {
        let randomInt = getRandomInt(databaseNumber);
        if (!arr.includes(images[randomInt].imageNum) && (arr.includes(images[randomInt].imageNum) !== str)) {
          arr.push(images[randomInt].imageNum)
        }
      }
      arr = shuffle(arr);
      return arr;
    },

    calculateAnswers(arr) {
      return arr.filter((value) => {return value}).length;
     },

    // --------------------------------
    //  Simple sleep implementation
    // --------------------------------
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    playAudio(sound) {
      sound.currentTime = 0.0;
      sound.play();
    },

// Initialize Audio
  audios: {
    wrong: new Audio('./assets/sounds/wrong.mp3'),
    correct: new Audio('./assets/sounds/correct.mp3'),
    finishRound: new Audio('./assets/sounds/finishround.mp3'),
  },

}

export default Utils;