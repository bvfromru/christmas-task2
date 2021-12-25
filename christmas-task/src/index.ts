// import { data } from "./data";
// import noUiSlider from "nouislider";
// import "nouislider/dist/nouislider.css";

// type Settings = {
//   favorites: string[];
//   filters: {
//     arrShape: string[];
//     number: number[];
//     year: number[];
//     arrColor: string[];
//     arrSize: string[];
//     onlyFavorites: boolean;
//   };
//   sort: string;
// };

// let settings: Settings = {
//   favorites: [],
//   filters: {
//     arrShape: [],
//     number: [],
//     year: [],
//     arrColor: [],
//     arrSize: [],
//     onlyFavorites: false,
//   },
//   sort: "",
// };

// //let favorites: string[] = [];
// const overlay = document.querySelector(".overlay");
// const favoritesCounter = document.querySelector(".favorites-counter");
// const cardsContainer = document.querySelector(".cards-container");
// const filterFavorite = document.getElementById("favorite") as HTMLInputElement;
// filterFavorite?.addEventListener("change", filterData);
// const filterSizeSmall = document.getElementById("size-small") as HTMLInputElement;
// filterSizeSmall?.addEventListener("change", filterData);
// const filterSizeMedium = document.getElementById("size-medium") as HTMLInputElement;
// filterSizeMedium?.addEventListener("change", filterData);
// const filterSizeBig = document.getElementById("size-big") as HTMLInputElement;
// filterSizeBig?.addEventListener("change", filterData);
// const filterColorWhite = document.getElementById("color-white") as HTMLInputElement;
// filterColorWhite?.addEventListener("change", filterData);
// const filterColorYellow = document.getElementById("color-yellow") as HTMLInputElement;
// filterColorYellow?.addEventListener("change", filterData);
// const filterColorRed = document.getElementById("color-red") as HTMLInputElement;
// filterColorRed?.addEventListener("change", filterData);
// const filterColorBlue = document.getElementById("color-blue") as HTMLInputElement;
// filterColorBlue?.addEventListener("change", filterData);
// const filterColorGreen = document.getElementById("color-green") as HTMLInputElement;
// filterColorGreen?.addEventListener("change", filterData);
// const filterShapeBall = document.getElementById("shape-ball") as HTMLInputElement;
// filterShapeBall?.addEventListener("change", filterData);
// const filterShapeFigure = document.getElementById("shape-figure") as HTMLInputElement;
// filterShapeFigure?.addEventListener("change", filterData);
// const filterShapeBell = document.getElementById("shape-bell") as HTMLInputElement;
// filterShapeBell?.addEventListener("change", filterData);
// const filterShapeCone = document.getElementById("shape-cone") as HTMLInputElement;
// filterShapeCone?.addEventListener("change", filterData);
// const filterShapeFlake = document.getElementById("shape-flake") as HTMLInputElement;
// filterShapeFlake?.addEventListener("change", filterData);
// const search = document.getElementById("search") as HTMLInputElement;
// search?.addEventListener("search", filterData);
// const sort = document.getElementById("sort") as HTMLInputElement;
// sort?.addEventListener("change", filterData);
// const resetFiltersBtn = document.getElementById("reset-filters") as HTMLInputElement;
// resetFiltersBtn?.addEventListener("click", resetFilters);
// const resetSettingsBtn = document.getElementById("reset-settings") as HTMLInputElement;
// resetSettingsBtn?.addEventListener("click", resetSettings);
// const sliderNumber: any = document.getElementById("sliderNumber")!;
// const sliderYear: any = document.getElementById("sliderYear")!;
// const sliderNumberMin = 1;
// const sliderNumberMax = 12;
// const sliderYearMin = 1940;
// const sliderYearMax = 2020;
// const sliderNumberOutputs = [
//   document.getElementById("slider-number-output-lower")!,
//   document.getElementById("slider-number-output-upper")!,
// ];
// const sliderYearOutputs = [
//   document.getElementById("slider-year-output-lower")!,
//   document.getElementById("slider-year-output-upper")!,
// ];

// function renderCards(data) {
//   const fragment = document.createDocumentFragment();
//   const sourceCard = document.querySelector("#sourceCard") as HTMLTemplateElement;
//   cardsContainer!.innerHTML = "";

//   data.forEach((item) => {
//     const sourceClone = sourceCard.content.cloneNode(true) as DocumentFragment;
//     sourceClone.querySelector(".card")!.setAttribute("toy-id", item.num);
//     sourceClone.querySelector(".card-name")!.textContent = item.name;
//     const img = sourceClone.querySelector(".card-image") as HTMLImageElement;
//     img.src = `./images/toys/${item.num}.webp`;
//     if (settings.favorites.includes(item.num)) {
//       sourceClone.querySelector(".card")!.classList.add("favorite");
//     }
//     sourceClone.querySelector(".card-count")!.textContent = item.count;
//     sourceClone.querySelector(".card-year")!.textContent = item.year;
//     sourceClone.querySelector(".card-shape")!.textContent = item.shape;
//     sourceClone.querySelector(".card-color")!.textContent = item.color;
//     sourceClone.querySelector(".card-size")!.textContent = item.size;
//     const favorite = item.favorite ? "да" : "нет";
//     sourceClone.querySelector(".card-favorite")!.textContent = favorite;
//     fragment.append(sourceClone);
//   });

//   cardsContainer!.append(fragment);
//   handleFavorites();
// }

// function handleFavorites() {
//   const cards = document.querySelectorAll(".card");
//   cards.forEach((card) =>
//     card.addEventListener("click", () => {
//       const toyId: string = card.getAttribute("toy-id")!;
//       if (settings.favorites.includes(toyId)) {
//         if (settings.favorites.length === 20) {
//           favoritesCounter?.classList.remove("red");
//         }
//         settings.favorites.splice(settings.favorites.indexOf(toyId), 1);
//         card.classList.remove("favorite");
//       } else {
//         if (settings.favorites.length >= 20) {
//           overlay?.classList.remove("hidden");
//         } else {
//           if (settings.favorites.length === 19) {
//             favoritesCounter?.classList.add("red");
//           }
//           settings.favorites.push(toyId);
//           card.classList.add("favorite");
//         }
//       }
//       favoritesCounter!.innerHTML = settings.favorites.length.toString();
//     })
//   );
// }

// function filterData() {
//   let filteredData = data;
//   if (filterFavorite.checked) {
//     filteredData = filteredData.filter((el) => el.favorite);
//     settings.filters.onlyFavorites = true;
//   } else {
//     settings.filters.onlyFavorites = false;
//   }

//   let arrSize: string[] = [];
//   if (filterSizeSmall.checked) {
//     arrSize.push("малый");
//     settings.filters.arrSize = arrSize;
//   }
//   if (filterSizeMedium.checked) {
//     arrSize.push("средний");
//     settings.filters.arrSize = arrSize;
//   }
//   if (filterSizeBig.checked) {
//     arrSize.push("большой");
//     settings.filters.arrSize = arrSize;
//   }
//   if (!filterSizeSmall.checked && !filterSizeMedium.checked && !filterSizeBig.checked) {
//     arrSize = ["малый", "средний", "большой"];
//     settings.filters.arrSize = [];
//   }
//   filteredData = filteredData.filter((el) => arrSize.includes(el.size));

//   let arrColor: string[] = [];
//   if (filterColorWhite.checked) {
//     arrColor.push("белый");
//     settings.filters.arrColor = arrColor;
//   }
//   if (filterColorYellow.checked) {
//     arrColor.push("желтый");
//     settings.filters.arrColor = arrColor;
//   }
//   if (filterColorRed.checked) {
//     arrColor.push("красный");
//     settings.filters.arrColor = arrColor;
//   }
//   if (filterColorBlue.checked) {
//     arrColor.push("синий");
//     settings.filters.arrColor = arrColor;
//   }
//   if (filterColorGreen.checked) {
//     arrColor.push("зелёный");
//     settings.filters.arrColor = arrColor;
//   }
//   if (
//     !filterColorWhite.checked &&
//     !filterColorYellow.checked &&
//     !filterColorRed.checked &&
//     !filterColorBlue.checked &&
//     !filterColorGreen.checked
//   ) {
//     arrColor = ["белый", "желтый", "красный", "синий", "зелёный"];
//     settings.filters.arrColor = [];
//   }
//   filteredData = filteredData.filter((el) => arrColor.includes(el.color));

//   let arrShape: string[] = [];
//   if (filterShapeBall.checked) {
//     arrShape.push("шар");
//     settings.filters.arrShape = arrShape;
//   }
//   if (filterShapeFigure.checked) {
//     arrShape.push("фигурка");
//     settings.filters.arrShape = arrShape;
//   }
//   if (filterShapeBell.checked) {
//     arrShape.push("колокольчик");
//     settings.filters.arrShape = arrShape;
//   }
//   if (filterShapeCone.checked) {
//     arrShape.push("шишка");
//     settings.filters.arrShape = arrShape;
//   }
//   if (filterShapeFlake.checked) {
//     arrShape.push("снежинка");
//     settings.filters.arrShape = arrShape;
//   }
//   if (
//     !filterShapeBall.checked &&
//     !filterShapeFigure.checked &&
//     !filterShapeBell.checked &&
//     !filterShapeCone.checked &&
//     !filterShapeFlake.checked
//   ) {
//     arrShape = ["шар", "фигурка", "колокольчик", "шишка", "снежинка"];
//     settings.filters.arrShape = [];
//   }
//   filteredData = filteredData.filter((el) => arrShape.includes(el.shape));

//   filteredData = filteredData.filter(
//     (el) => +sliderNumberOutputs[0].innerHTML <= +el.count && +el.count <= +sliderNumberOutputs[1].innerHTML
//   );
//   settings.filters.number = [+sliderNumberOutputs[0].innerHTML, +sliderNumberOutputs[1].innerHTML];

//   filteredData = filteredData.filter(
//     (el) => +sliderYearOutputs[0].innerHTML <= +el.year && +el.year <= +sliderYearOutputs[1].innerHTML
//   );
//   settings.filters.year = [+sliderYearOutputs[0].innerHTML, +sliderYearOutputs[1].innerHTML];

//   if (search.value) {
//     filteredData = filteredData.filter((el) => el.name.toLowerCase().includes(search.value.toLowerCase()));
//   }

//   if (sort.value === "name") {
//     filteredData.sort((a, b) => {
//       if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
//       if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
//       return 0;
//     });
//   }
//   if (sort.value === "name-backward") {
//     filteredData.sort((a, b) => {
//       if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
//       if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
//       return 0;
//     });
//   }
//   if (sort.value === "year-backward") {
//     filteredData.sort((a, b) => {
//       if (+a.year < +b.year) return -1;
//       if (+a.year > +b.year) return 1;
//       return 0;
//     });
//   }
//   if (sort.value === "year") {
//     filteredData.sort((a, b) => {
//       if (+a.year > +b.year) return -1;
//       if (+a.year < +b.year) return 1;
//       return 0;
//     });
//   }
//   settings.sort = sort.value;
//   setLocalStorage();

//   if (filteredData.length) {
//     renderCards(filteredData);
//   } else {
//     showEmptyMessage();
//   }
// }

// function resetFilters() {
//   filterFavorite.checked = false;
//   filterSizeSmall.checked = false;
//   filterSizeMedium.checked = false;
//   filterSizeBig.checked = false;
//   filterColorWhite.checked = false;
//   filterColorYellow.checked = false;
//   filterColorRed.checked = false;
//   filterColorBlue.checked = false;
//   filterColorGreen.checked = false;
//   filterShapeBall.checked = false;
//   filterShapeFigure.checked = false;
//   filterShapeBell.checked = false;
//   filterShapeCone.checked = false;
//   filterShapeFlake.checked = false;
//   search.value = "";
//   sliderNumber.noUiSlider.set([sliderNumberMin, sliderNumberMax]);
//   sliderYear.noUiSlider.set([sliderYearMin, sliderYearMax]);
//   filterData();
// }

// function resetSettings() {
//   settings.favorites = [];
//   sort.value = "name";
//   favoritesCounter!.innerHTML = settings.favorites.length.toString();
//   resetFilters();
//   initSettings();
// }

// function showEmptyMessage() {
//   cardsContainer!.innerHTML = "";
//   const emptyMessage = document.createElement("p");
//   emptyMessage.classList.add("empty-message");
//   emptyMessage.innerText = "Извините, совпадений не обнаружено.";
//   cardsContainer!.append(emptyMessage);
// }

// function setLocalStorage() {
//   localStorage.setItem("bvfromru-christmas-settings", JSON.stringify(settings));
// }

// function getLocalStorage() {
//   if (localStorage.getItem("bvfromru-christmas-settings")) {
//     settings = JSON.parse(localStorage.getItem("bvfromru-christmas-settings")!);
//   } else {
//     initSettings();
//   }
//   actualizeFilters();
//   favoritesCounter!.innerHTML = settings.favorites.length.toString();
// }

// function actualizeFilters() {
//   if (settings.filters.arrSize.includes("малый")) {
//     filterSizeSmall.checked = true;
//   }
//   if (settings.filters.arrSize.includes("средний")) {
//     filterSizeMedium.checked = true;
//   }
//   if (settings.filters.arrSize.includes("большой")) {
//     filterSizeBig.checked = true;
//   }

//   if (settings.filters.arrShape.includes("шар")) {
//     filterShapeBall.checked = true;
//   }
//   if (settings.filters.arrShape.includes("фигурка")) {
//     filterShapeFigure.checked = true;
//   }
//   if (settings.filters.arrShape.includes("колокольчик")) {
//     filterShapeBell.checked = true;
//   }
//   if (settings.filters.arrShape.includes("шишка")) {
//     filterShapeCone.checked = true;
//   }
//   if (settings.filters.arrShape.includes("снежинка")) {
//     filterShapeFlake.checked = true;
//   }

//   if (settings.filters.arrColor.includes("белый")) {
//     filterColorWhite.checked = true;
//   }
//   if (settings.filters.arrColor.includes("желтый")) {
//     filterColorYellow.checked = true;
//   }
//   if (settings.filters.arrColor.includes("красный")) {
//     filterColorRed.checked = true;
//   }
//   if (settings.filters.arrColor.includes("синий")) {
//     filterColorBlue.checked = true;
//   }
//   if (settings.filters.arrColor.includes("зелёный")) {
//     filterColorGreen.checked = true;
//   }

//   sort.value = settings.sort;

//   if (settings.filters.onlyFavorites === true) {
//     filterFavorite.checked = true;
//   }
// }

// function initSettings() {
//   settings.favorites = [];
//   settings.filters.arrShape = [];
//   settings.filters.number = [sliderNumberMin, sliderNumberMax];
//   settings.filters.year = [sliderYearMin, sliderYearMax];
//   settings.filters.arrColor = [];
//   settings.filters.arrSize = [];
//   settings.filters.onlyFavorites = false;
//   settings.sort = "name";
//   if (settings.favorites.length < 20) {
//     favoritesCounter?.classList.remove("red");
//   }

//   setLocalStorage();
// }

// function init() {
//   getLocalStorage();

//   overlay?.addEventListener("click", () => {
//     overlay.classList.add("hidden");
//   });

//   noUiSlider.create(sliderNumber, {
//     start: [settings.filters.number[0], settings.filters.number[1]],
//     step: 1,
//     connect: true,
//     range: {
//       min: sliderNumberMin,
//       max: sliderNumberMax,
//     },
//   });

//   noUiSlider.create(sliderYear, {
//     start: [settings.filters.year[0], settings.filters.year[1]],
//     step: 1,
//     connect: true,
//     range: {
//       min: sliderYearMin,
//       max: sliderYearMax,
//     },
//   });

//   sliderNumber.noUiSlider.on("update", function (values, handle) {
//     sliderNumberOutputs[handle].innerHTML = parseInt(values[handle]).toString();
//     filterData();
//   });

//   sliderYear.noUiSlider.on("update", function (values, handle) {
//     sliderYearOutputs[handle].innerHTML = parseInt(values[handle]).toString();
//     filterData();
//   });

//   if (settings.favorites.length === 20) {
//     favoritesCounter?.classList.add("red");
//   }

//   filterData();
// }
// console.log(
//   "Приветствую проверяющего! Спасибо, что подождали. Все что хотел, доделал.\nСамооценка задания: 200/200, все пункты выполнил.\nВ качестве небольших дополнительных бонусов заморочился с плавным поочередным появлением карточек и подсветкой количества игрушек в избранном при достижении лимита.\nДискорд для связи: Vitaliy (bvfromru)#4741"
// );

// window.addEventListener("beforeunload", setLocalStorage);
// window.addEventListener("load", getLocalStorage);
// init();

//tree-page

const TREESCOUNT = 6;
const BACKGROUNDSCOUNT = 10;
const SNOWFLAKESCOUNT = 133;

function createTrees() {
  const christmasTree = document.querySelector(".christmas-tree") as HTMLImageElement;
  const treesContainer = document.querySelector(".trees-container");
  const treesArr: HTMLElement[] = [];
  for (let i = 1; i <= TREESCOUNT; i++) {
    const treeCard = document.createElement("li");
    treeCard.style.backgroundImage = `url('./images/trees/${i}.webp')`;
    treesArr.push(treeCard);
    if (i === 1) {
      treeCard.classList.add("active");
    }
    treesContainer?.append(treeCard);
    treeCard.addEventListener("click", () => {
      christmasTree!.src = `./images/trees/${i}.webp`;
      treesArr.forEach((element) => {
        element.classList.remove("active");
      });
      treeCard.classList.toggle("active");
    });
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
    if (i === 1) {
      backgroundCard.classList.add("active");
    }
    backgroundsContainer?.append(backgroundCard);
    backgroundCard.addEventListener("click", () => {
      mainTreeContainer!.style.backgroundImage = `url('./images/bgs/${i}.webp')`;
      backgroundsArr.forEach((element) => {
        element.classList.remove("active");
      });
      backgroundCard.classList.toggle("active");
    });
  }
}

function createToys() {
  const toysContainer = document.querySelector(".toys-container");
  for (let i = 1; i <= 20; i++) {
    const toyCard = document.createElement("li");
    const toyCardImage = document.createElement('img') as HTMLImageElement;
    const toyCardCount = document.createElement('div') as HTMLElement;
    toyCardImage.src = `./images/toys/${i}.webp`;
    toyCardCount.innerText = i.toString();
    toyCard.append(toyCardImage);
    toyCard.append(toyCardCount);
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

createTrees();
createBackgrounds();
createToys();
createSnow()
