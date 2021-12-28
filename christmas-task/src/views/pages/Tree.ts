import Utils from "../../services/Utils";
import { data } from "../../data";
import { setDefaultSettings, setLocalStorage, settings } from "../../index";

let Tree = {
  render: async () => {
    let view = /*html*/ `
    <div class="main-container tree">
    <div class="main-wrapper wrapper">
      <aside class="left-column">
        <section class="trees-options">
          <h2>Выберите ёлку</h2>
          <ul class="trees-container treecards-container">

          </ul>
        </section>
        <section class="backgrounds-options">
          <h2>Выберите фон</h2>
          <ul class="backgrounds-container treecards-container">

          </ul>
        </section>
        <section class="garland-options">
          <h2>Гирлянда</h2>
          <input type="radio" class="custom-radio garland-radio garland-multicolor" name="garland" id="garland-multicolor" garland-id="multicolor" />
          <label for="garland-multicolor"></label>
          <input type="radio" class="custom-radio garland-radio garland-red" name="garland" id="garland-red" garland-id="red" />
          <label for="garland-red"></label>
          <input type="radio" class="custom-radio garland-radio garland-blue" name="garland" id="garland-blue" garland-id="blue" />
          <label for="garland-blue"></label>
          <input type="radio" class="custom-radio garland-radio garland-yellow" name="garland" id="garland-yellow" garland-id="yellow" />
          <label for="garland-yellow"></label>
          <input type="radio" class="custom-radio garland-radio garland-green" name="garland" id="garland-green" garland-id="green" />
          <label for="garland-green"></label>
          <input type="radio" class="custom-checkbox garland-radio garland-off" name="garland" id="garland-off" garland-id="off" />
          <label for="garland-off">Выкл</label>
           </section>
      </aside>  
      <main class="main-tree-container">
        <div class="snowflakes">            
        </div>
        <div class="garland"></div>
        <map name="tree-map" class="droppable">
          <area class="droppable" coords="365,699,189,706,113,683,31,608,2,555,2,539,18,437,73,351,106,224,161,134,243,-1,306,75,353,144,399,221,424,359,452,459,496,550,444,664" shape="poly">
        </map>
        <img draggable="false" usemap="#tree-map" class="christmas-tree" src="./images/trees/1.webp" alt="Christmas tree">
      </main>
      <aside class="right-column">
        <section class="toys-options">
          <h2>Игрушки</h2>
          <ul class="toys-container treecards-container">

          </ul>
          <button class="reset-settings btn" id="reset-settings">Сбросить настройки</button>
        </section>
      </aside>
      </div>
    </div>
      `;
    return view;
  },

  after_render: async () => {
    document.querySelector(".search")?.classList.add("hidden");
    const TREESCOUNT = 6;
    const BACKGROUNDSCOUNT = 10;
    const SNOWFLAKESCOUNT = 133;
    const DEFAULTARRLENGTH = 20;
    const DefaultToysArr: Array<number> = [];
    const GARLANDROPESCOUNT = 8;
    const GARLANDMAXLICOUNT = 22;

    const christmasTree = document.querySelector(".christmas-tree") as HTMLImageElement;
    const snowBtn = document.querySelector(".snow");
    snowBtn?.addEventListener("click", toggleSnowBtn);

    function createTrees() {
      const treesContainer = document.querySelector(".trees-container");
      const treesArr: HTMLElement[] = [];
      for (let i = 1; i <= TREESCOUNT; i++) {
        const treeCard = document.createElement("li");
        treeCard.style.backgroundImage = `url('./images/trees/${i}.webp')`;
        treesArr.push(treeCard);
        if (i === settings.treeOptions.tree) {
          treeCard.classList.add("active");
          christmasTree!.src = `./images/trees/${i}.webp`;
        }
        treesContainer?.append(treeCard);
        treeCard.addEventListener("click", () => {
          christmasTree!.src = `./images/trees/${i}.webp`;
          settings.treeOptions.tree = i;
          setLocalStorage();
          treesArr.forEach((element) => {
            element.classList.remove("active");
          });
          treeCard.classList.toggle("active");
        });
      }
    }

    function createGarland(color: string) {
      const garland = document.querySelector(".garland");
      garland!.innerHTML = "";
      if (color === "off") {
        return;
      }
      let currentLiCount = GARLANDMAXLICOUNT;
      for (let j = 1; j <= GARLANDROPESCOUNT; j++) {
        const lightrope = document.createElement("ul");
        lightrope.classList.add("lightrope");
        lightrope.classList.add(`lightrope${j}`);
        currentLiCount -= 2;
        for (let i = 1; i <= currentLiCount; i++) {
          const li = document.createElement("li");
          li.classList.add(color);
          lightrope.append(li);
        }
        garland?.append(lightrope);
      }
    }

    function createBackgrounds() {
      const mainTreeContainer = document.querySelector(".main-tree-container") as HTMLElement;
      const backgroundsContainer = document.querySelector(".backgrounds-container");
      const backgroundsArr: HTMLElement[] = [];
      for (let i = 1; i <= BACKGROUNDSCOUNT; i++) {
        const backgroundCard = document.createElement("li");
        backgroundCard.style.backgroundImage = `url('./images/bgs/${i}.webp')`;
        backgroundsArr.push(backgroundCard);
        if (i === settings.treeOptions.background) {
          backgroundCard.classList.add("active");
          mainTreeContainer!.style.backgroundImage = `url('./images/bgs/${i}.webp')`;
        }
        backgroundsContainer?.append(backgroundCard);
        backgroundCard.addEventListener("click", () => {
          mainTreeContainer!.style.backgroundImage = `url('./images/bgs/${i}.webp')`;
          settings.treeOptions.background = i;
          setLocalStorage();
          backgroundsArr.forEach((element) => {
            element.classList.remove("active");
          });
          backgroundCard.classList.toggle("active");
        });
      }
    }

    function createDefaultToysArr() {
      for (let i = 1; i <= DEFAULTARRLENGTH; i++) {
        DefaultToysArr.push(i);
      }
    }

    function initToys() {
      if (settings.favorites.length === 0) {
        createDefaultToysArr();
        createToys(DefaultToysArr);
      } else {
        createToys(settings.favorites);
      }
    }

    function createToys(arr) {
      const toysContainer = document.querySelector(".toys-container");
      for (let i = 0; i < arr.length; i++) {
        const toyCard = document.createElement("li");
        const toyCardCount = document.createElement("div") as HTMLElement;
        toyCardCount.innerText = data[arr[i] - 1].count;
        toyCard.append(toyCardCount);
        for (let j = 1; j <= +data[arr[i] - 1].count; j++) {
          const toyCardImage = document.createElement("img") as HTMLImageElement;
          toyCardImage.classList.add("toy-image");
          toyCardImage.src = `./images/toys/${data[arr[i] - 1].num}.webp`;
          toyCard.append(toyCardImage);

          //start moving
          let currentDroppable: Element | null = null;

          toyCardImage.onmousedown = function (event) {
            toyCardImage.style.cursor = "grabbing";
            let shiftX = event.clientX - toyCardImage.getBoundingClientRect().left;
            let shiftY = event.clientY - toyCardImage.getBoundingClientRect().top;

            toyCardImage.style.zIndex = "3";
            //document.body.append(toyCardImage);
            document.querySelector("area")?.append(toyCardImage);

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
              toyCardImage.style.left = pageX - shiftX + "px";
              toyCardImage.style.top = pageY - shiftY + "px";
            }

            function onMouseMove(event) {
              moveAt(event.pageX, event.pageY);

              toyCardImage.hidden = true;
              let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
              toyCardImage.hidden = false;

              if (!elemBelow) return;

              let droppableBelow = elemBelow.closest(".droppable");
              if (currentDroppable != droppableBelow) {
                if (currentDroppable) {
                  // null если мы были не над droppable до этого события
                  // (например, над пустым пространством)
                  leaveDroppable(toyCardImage);
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) {
                  // null если мы не над droppable сейчас, во время этого события
                  // (например, только что покинули droppable)
                  enterDroppable(toyCardImage);
                }
              }
            }

            document.addEventListener("mousemove", onMouseMove);

            toyCardImage.onmouseup = function () {
              if (currentDroppable) {
                toyCardImage.style.background = "";
              } else {
                toyCard.append(toyCardImage);
                toyCardImage.style.left = "auto";
                toyCardImage.style.top = "auto";
              }
              document.removeEventListener("mousemove", onMouseMove);
              toyCardImage.onmouseup = null;
              toyCardImage.style.cursor = "grab";
              toyCardCount.innerText = toyCard.querySelectorAll(".toy-image").length.toString();
            };
          };

          function enterDroppable(elem) {
            elem.style.cursor = "grabbing";
          }

          function leaveDroppable(elem) {
            elem.style.cursor = "no-drop";
          }

          toyCardImage.ondragstart = function () {
            toyCardCount.innerText = toyCard.querySelectorAll(".toy-image").length.toString();
            toyCardImage.style.cursor = "no-drop";
            return false;
          };
        }
        toysContainer?.append(toyCard);
      }
    }

    function createSnow() {
      const snowContainer = document.querySelector(".snowflakes");
      for (let i = 1; i <= SNOWFLAKESCOUNT; i++) {
        const flake = document.createElement("i");
        snowContainer?.append(flake);
      }
    }

    function toggleSnowBtn() {
      if (snowBtn?.classList.contains("checked")) {
        snowBtn.classList.remove("checked");
        document.querySelector(".snowflakes")?.classList.add("invisible");
        settings.treeOptions.snow = false;
      } else {
        snowBtn?.classList.add("checked");
        document.querySelector(".snowflakes")?.classList.remove("invisible");
        settings.treeOptions.snow = true;
      }
      setLocalStorage();
    }

    function checkSnowBtn() {
      if (settings.treeOptions.snow) {
        snowBtn?.classList.add("checked");
        document.querySelector(".snowflakes")?.classList.remove("invisible");
      } else {
        snowBtn?.classList.remove("checked");
        document.querySelector(".snowflakes")?.classList.add("invisible");
      }
    }

    function handleGarland() {
      const garlandRadio = document.querySelectorAll(".garland-radio");
      garlandRadio.forEach((radio) =>
        radio.addEventListener("click", () => {
          const garlandColor: string = radio.getAttribute("garland-id")!;
          settings.treeOptions.garland = garlandColor;
          if (garlandColor) {
            createGarland(garlandColor);
          }
          setLocalStorage();
        })
      );
    }

    function initGarlandRadioBtn() {
      switch (settings.treeOptions.garland) {
        case "multicolor":
          const radioMulti = document.querySelector(".garland-multicolor") as HTMLInputElement;
          radioMulti.checked = true;
          createGarland("multicolor");
          break;
        case "red":
          const radioRed = document.querySelector(".garland-red") as HTMLInputElement;
          radioRed.checked = true;
          createGarland("red");
          break;
        case "green":
          const radioGreen = document.querySelector(".garland-green") as HTMLInputElement;
          radioGreen.checked = true;
          createGarland("green");
          break;
        case "blue":
          const radioBlue = document.querySelector(".garland-blue") as HTMLInputElement;
          radioBlue.checked = true;
          createGarland("blue");
          break;
        case "yellow":
          const radioYellow = document.querySelector(".garland-yellow") as HTMLInputElement;
          radioYellow.checked = true;
          createGarland("yellow");
          break;
        default:
          const radioOff = document.querySelector(".garland-off") as HTMLInputElement;
          radioOff.checked = true;
          break;
      }
    }

    document.querySelector(".reset-settings")?.addEventListener("click", () => {
      setDefaultSettings();
      localStorage.clear();
      setLocalStorage();
      window.location.reload();
    });

    createTrees();
    createBackgrounds();
    initToys();
    createSnow();
    checkSnowBtn();
    initGarlandRadioBtn();
    handleGarland();
  },
};

export default Tree;
