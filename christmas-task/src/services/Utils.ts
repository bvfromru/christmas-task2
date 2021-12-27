const Utils = { 
    // --------------------------------
    //  Parse a url and break it into resource, id and verb
    // --------------------------------
    parseRequestURL : () => {

        let url: string = location.hash.slice(1).toLowerCase() || '/';
        let r: string[] = url.split("/")
        
        interface Request {
          resource: string | null;
          id: string | null;
          verb: string | null;
        }
        
        let request: Request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request
    },

    
    // --------------------------------
    //  Simple sleep implementation
    // --------------------------------
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    playAudio(sound) {
      //sound.currentTime = 0.0;
      //sound.play();
      if (sound.paused) {
        sound.play();
      }
    },

// Initialize Audio
  audios: {
    music: new Audio('./assets/sounds/christmas-song.mp3'),
  },

}

export default Utils;