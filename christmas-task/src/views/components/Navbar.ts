import Utils from "../../services/Utils";
import { setLocalStorage, settings } from "../../index";

let favoritesCounter;

export function handleFavoritesCounter() {
  if (settings.favorites.length === 20) {
    favoritesCounter?.classList.add("red");
  } else {
    favoritesCounter?.classList.remove("red");
  }
  favoritesCounter!.innerHTML = settings.favorites.length.toString();
}


let Navbar = {
  render: async () => {
    let view = `
      <div class="header-wrapper wrapper">
        <nav class="navbar">
          <ul>
            <li><a class="mainpage" href="#/home">Главная</a></li>
            <li><a href="#/toys">Игрушки</a></li>
            <li><a href="#/tree">Ёлка</a></li>
            <li><button class="sound header-btn "></button></li>
            <li><button class="snow header-btn"></button></li>
          </ul>
        </nav>
        <div class="header-controls">
          <div class="search">
            <input
              type="search"
              class="search-field"
              name="search"
              id="search"
              placeholder="Поиск"
              autofocus
              autocomplete="off"
            />
            </div>
          <div class="favorites-counter-container">
            <span class="favorites-counter">0</span>
          </div>
        </div>
      </div>
  `;
    return view;
  },
  after_render: async () => {
    favoritesCounter = document.querySelector(".favorites-counter");
    handleFavoritesCounter();

    const soundBtn = document.querySelector(".sound");
    soundBtn?.addEventListener("click", toggleSoundBtn);
    //Utils.playAudio(Utils.audios.music);
    checkSoundBtn();

    function toggleSoundBtn() {
      if (soundBtn?.classList.contains("checked")) {
        soundBtn.classList.remove("checked");
        Utils.audios.music.pause();
        settings.music = false;
      } else {
        soundBtn?.classList.add("checked");
        Utils.audios.music.play();
        settings.music = true;
      }
      setLocalStorage();
    }

    function checkSoundBtn() {
      if (settings.music) {
        soundBtn?.classList.add("checked");
        Utils.audios.music.play();
      } else {
        soundBtn?.classList.remove("checked");
        Utils.audios.music.pause();
      }
    }
  },
};

export default Navbar;
