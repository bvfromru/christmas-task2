import Utils from "../../services/Utils";
import { data } from "../../data";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import {
  assignSettings,
  setDefaultSettings,
  setLocalStorage,
  settings,
  sliderNumberMin,
  sliderNumberMax,
  sliderYearMin,
  sliderYearMax,
} from "../../index";
import { handleFavoritesCounter } from "../components/Navbar";

let Toys = {
  render: async () => {
    let view = /*html*/ `
    <div class="main-container toys-page">
    <div class="main-wrapper wrapper">
        <aside>
          <fieldset class="filters-container">
            
            <div class="filters-values filters">
              <h2>Фильтры по значению</h2>
                <div class="shape filter-line">
                  <span>Форма:</span>
                  <input type="checkbox" class="custom-checkbox shape shape-ball" name="shape-ball" id="shape-ball" />
                  <label for="shape-ball"></label>
                  <input type="checkbox" class="custom-checkbox shape shape-figure" name="shape-figure" id="shape-figure" />
                  <label for="shape-figure"></label>
                  <input type="checkbox" class="custom-checkbox shape shape-bell" name="shape-bell" id="shape-bell" />
                  <label for="shape-bell"></label>
                  <input type="checkbox" class="custom-checkbox shape shape-cone" name="shape-cone" id="shape-cone" />
                  <label for="shape-cone"></label>
                  <input type="checkbox" class="custom-checkbox shape shape-flake" name="shape-flake" id="shape-flake" />
                  <label for="shape-flake"></label>
                </div>
              <div class="color filter-line">
                <span>Цвет:</span>
                <input type="checkbox" class="custom-checkbox color color-white" name="color-white" id="color-white" />
                <label for="color-white">Белый</label>
                <input type="checkbox" class="custom-checkbox color color-yellow" name="color-yellow" id="color-yellow" />
                <label for="color-yellow">Желтый</label>
                <input type="checkbox" class="custom-checkbox color color-red" name="color-red" id="color-red" />
                <label for="color-red">Красный</label>
                <input type="checkbox" class="custom-checkbox color color-blue" name="color-blue" id="color-blue" />
                <label for="color-blue">Синий</label>
                <input type="checkbox" class="custom-checkbox color color-green" name="color-green" id="color-green" />
                <label for="color-green">Зелёный</label>
              </div>
              <div class="size filter-line">
                <span>Размер:</span>
                <input type="checkbox" class="custom-checkbox size size-small" name="size-small" id="size-small" />
                <label for="size-small"></label>
                <input type="checkbox" class="custom-checkbox size size-medium" name="size-medium" id="size-medium" />
                <label for="size-medium"></label>
                <input type="checkbox" class="custom-checkbox size size-big" name="size-big" id="size-big" />
                <label for="size-big"></label>
              </div>
              <div class="favorite-container filter-line">
                <span>Только любимые:</span>
                <input type="checkbox" class="custom-checkbox favorite" name="favorite" id="favorite" />
                <label for="favorite"></label>
              </div>
            </div>

            <div class="filters-range filters">
              <h2>Фильтры по диапазону</h2>
              <div class="number">
                <div class="slider-description">Количество экземпляров:</div>
                <div class="slider-container">
                  <div class="slider-round" id="sliderNumber"></div>
                  <div class="slider-outputs-container">
                    <output class="slider-output" id="slider-number-output-lower">1</output>
                    <output class="slider-output" id="slider-number-output-upper">12</output>
                  </div>
                </div>
              </div>
              <div class="year">
                <div class="slider-description">Год покупки:</div>
                <div class="slider-container">
                  <div class="slider-round" id="sliderYear"></div>
                  <div class="slider-outputs-container">
                    <output class="slider-output"  id="slider-year-output-lower">1940</output>
                    <output class="slider-output"  id="slider-year-output-upper">2020</output>
                  </div>
                </div>
              </div>
            </div>

            <div class="filters-sort filters">
              <div class="sort-container">
                <h2>Сортировка</h2>
                <select class="sort" id="sort">
                  <option value="name">По алфавиту</option>
                  <option value="name-backward">Обратно алфавиту</option>
                  <option value="year">Сначала новые</option>
                  <option value="year-backward">Сначала старые</option>
                </select>
              </div>
              
              <div class="buttons">
                <button class="reset-filters btn" id="reset-filters">Сбросить фильтры</button>
                <button class="reset-settings btn" id="reset-settings">Сбросить настройки</button>
              </div>
            </div>
            
          </fieldset>
        </aside>
        <main>
          <ul class="cards-container"></ul>
        </main>
      </div>
    </div>
    <div class="overlay hidden">
      <div class="modal-window">
        <p>Извините, все слоты заполнены</p>
        <button class="btn">Отлично!</button>
      </div>
    </div>

    <template id="sourceCard">
      <li class="card">
        <h2 class="card-name">Большой шар с рисунком цветок</h2>
        <div class="card-description">
          <div class="card-image-container">
            <img class="card-image" src="./images/toys/1.webp" alt="" />
          </div>
          <div class="card-properties">
            <p>Количество: <span class="card-count"></span></p>
            <p>Год покупки: <span class="card-year"></span></p>
            <p>Форма: <span class="card-shape"></span></p>
            <p>Цвет: <span class="card-color"></span></p>
            <p>Размер: <span class="card-size"></span></p>
            <p>Любимая: <span class="card-favorite"></span></p>
          </div>
        </div>
        <div class="ribbon"></div>
      </div>
    </template>
      `;
    return view;
  },

  after_render: async () => {
    //Hide snow button in navbar
    document.querySelector(".snow")?.classList.add("hidden");

    //let favorites: string[] = [];
    const overlay = document.querySelector(".overlay");
    const cardsContainer = document.querySelector(".cards-container");
    const filterFavorite = document.getElementById("favorite") as HTMLInputElement;
    filterFavorite?.addEventListener("change", filterData);
    const filterSizeSmall = document.getElementById("size-small") as HTMLInputElement;
    filterSizeSmall?.addEventListener("change", filterData);
    const filterSizeMedium = document.getElementById("size-medium") as HTMLInputElement;
    filterSizeMedium?.addEventListener("change", filterData);
    const filterSizeBig = document.getElementById("size-big") as HTMLInputElement;
    filterSizeBig?.addEventListener("change", filterData);
    const filterColorWhite = document.getElementById("color-white") as HTMLInputElement;
    filterColorWhite?.addEventListener("change", filterData);
    const filterColorYellow = document.getElementById("color-yellow") as HTMLInputElement;
    filterColorYellow?.addEventListener("change", filterData);
    const filterColorRed = document.getElementById("color-red") as HTMLInputElement;
    filterColorRed?.addEventListener("change", filterData);
    const filterColorBlue = document.getElementById("color-blue") as HTMLInputElement;
    filterColorBlue?.addEventListener("change", filterData);
    const filterColorGreen = document.getElementById("color-green") as HTMLInputElement;
    filterColorGreen?.addEventListener("change", filterData);
    const filterShapeBall = document.getElementById("shape-ball") as HTMLInputElement;
    filterShapeBall?.addEventListener("change", filterData);
    const filterShapeFigure = document.getElementById("shape-figure") as HTMLInputElement;
    filterShapeFigure?.addEventListener("change", filterData);
    const filterShapeBell = document.getElementById("shape-bell") as HTMLInputElement;
    filterShapeBell?.addEventListener("change", filterData);
    const filterShapeCone = document.getElementById("shape-cone") as HTMLInputElement;
    filterShapeCone?.addEventListener("change", filterData);
    const filterShapeFlake = document.getElementById("shape-flake") as HTMLInputElement;
    filterShapeFlake?.addEventListener("change", filterData);
    const search = document.getElementById("search") as HTMLInputElement;
    search?.addEventListener("search", filterData);
    const sort = document.getElementById("sort") as HTMLInputElement;
    sort?.addEventListener("change", filterData);
    const resetFiltersBtn = document.getElementById("reset-filters") as HTMLInputElement;
    resetFiltersBtn?.addEventListener("click", resetFilters);
    const resetSettingsBtn = document.getElementById("reset-settings") as HTMLInputElement;
    resetSettingsBtn?.addEventListener("click", resetSettings);
    const sliderNumber: any = document.getElementById("sliderNumber")!;
    const sliderYear: any = document.getElementById("sliderYear")!;
    const sliderNumberOutputs = [
      document.getElementById("slider-number-output-lower")!,
      document.getElementById("slider-number-output-upper")!,
    ];
    const sliderYearOutputs = [
      document.getElementById("slider-year-output-lower")!,
      document.getElementById("slider-year-output-upper")!,
    ];

    function renderCards(data) {
      const fragment = document.createDocumentFragment();
      const sourceCard = document.querySelector("#sourceCard") as HTMLTemplateElement;
      cardsContainer!.innerHTML = "";

      data.forEach((item) => {
        const sourceClone = sourceCard.content.cloneNode(true) as DocumentFragment;
        sourceClone.querySelector(".card")!.setAttribute("toy-id", item.num);
        sourceClone.querySelector(".card-name")!.textContent = item.name;
        const img = sourceClone.querySelector(".card-image") as HTMLImageElement;
        img.src = `./images/toys/${item.num}.webp`;
        if (settings.favorites.includes(item.num)) {
          sourceClone.querySelector(".card")!.classList.add("favorite");
        }
        sourceClone.querySelector(".card-count")!.textContent = item.count;
        sourceClone.querySelector(".card-year")!.textContent = item.year;
        sourceClone.querySelector(".card-shape")!.textContent = item.shape;
        sourceClone.querySelector(".card-color")!.textContent = item.color;
        sourceClone.querySelector(".card-size")!.textContent = item.size;
        const favorite = item.favorite ? "да" : "нет";
        sourceClone.querySelector(".card-favorite")!.textContent = favorite;
        fragment.append(sourceClone);
      });

      cardsContainer!.append(fragment);
      handleFavorites();
    }

    function handleFavorites() {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) =>
        card.addEventListener("click", () => {
          const toyId: string = card.getAttribute("toy-id")!;
          if (settings.favorites.includes(toyId)) {
            settings.favorites.splice(settings.favorites.indexOf(toyId), 1);
            card.classList.remove("favorite");
          } else {
            if (settings.favorites.length >= 20) {
              overlay?.classList.remove("hidden");
            } else {
              settings.favorites.push(toyId);
              card.classList.add("favorite");
            }
          }
            handleFavoritesCounter();
            setLocalStorage();
        })
      );
    }

    function filterData() {
      let filteredData = data;
      if (filterFavorite.checked) {
        filteredData = filteredData.filter((el) => el.favorite);
        settings.filters.onlyFavorites = true;
      } else {
        settings.filters.onlyFavorites = false;
      }

      let arrSize: string[] = [];
      if (filterSizeSmall.checked) {
        arrSize.push("малый");
        settings.filters.arrSize = arrSize;
      }
      if (filterSizeMedium.checked) {
        arrSize.push("средний");
        settings.filters.arrSize = arrSize;
      }
      if (filterSizeBig.checked) {
        arrSize.push("большой");
        settings.filters.arrSize = arrSize;
      }
      if (!filterSizeSmall.checked && !filterSizeMedium.checked && !filterSizeBig.checked) {
        arrSize = ["малый", "средний", "большой"];
        settings.filters.arrSize = [];
      }
      filteredData = filteredData.filter((el) => arrSize.includes(el.size));

      let arrColor: string[] = [];
      if (filterColorWhite.checked) {
        arrColor.push("белый");
        settings.filters.arrColor = arrColor;
      }
      if (filterColorYellow.checked) {
        arrColor.push("желтый");
        settings.filters.arrColor = arrColor;
      }
      if (filterColorRed.checked) {
        arrColor.push("красный");
        settings.filters.arrColor = arrColor;
      }
      if (filterColorBlue.checked) {
        arrColor.push("синий");
        settings.filters.arrColor = arrColor;
      }
      if (filterColorGreen.checked) {
        arrColor.push("зелёный");
        settings.filters.arrColor = arrColor;
      }
      if (
        !filterColorWhite.checked &&
        !filterColorYellow.checked &&
        !filterColorRed.checked &&
        !filterColorBlue.checked &&
        !filterColorGreen.checked
      ) {
        arrColor = ["белый", "желтый", "красный", "синий", "зелёный"];
        settings.filters.arrColor = [];
      }
      filteredData = filteredData.filter((el) => arrColor.includes(el.color));

      let arrShape: string[] = [];
      if (filterShapeBall.checked) {
        arrShape.push("шар");
        settings.filters.arrShape = arrShape;
      }
      if (filterShapeFigure.checked) {
        arrShape.push("фигурка");
        settings.filters.arrShape = arrShape;
      }
      if (filterShapeBell.checked) {
        arrShape.push("колокольчик");
        settings.filters.arrShape = arrShape;
      }
      if (filterShapeCone.checked) {
        arrShape.push("шишка");
        settings.filters.arrShape = arrShape;
      }
      if (filterShapeFlake.checked) {
        arrShape.push("снежинка");
        settings.filters.arrShape = arrShape;
      }
      if (
        !filterShapeBall.checked &&
        !filterShapeFigure.checked &&
        !filterShapeBell.checked &&
        !filterShapeCone.checked &&
        !filterShapeFlake.checked
      ) {
        arrShape = ["шар", "фигурка", "колокольчик", "шишка", "снежинка"];
        settings.filters.arrShape = [];
      }
      filteredData = filteredData.filter((el) => arrShape.includes(el.shape));

      filteredData = filteredData.filter(
        (el) => +sliderNumberOutputs[0].innerHTML <= +el.count && +el.count <= +sliderNumberOutputs[1].innerHTML
      );
      settings.filters.number = [+sliderNumberOutputs[0].innerHTML, +sliderNumberOutputs[1].innerHTML];

      filteredData = filteredData.filter(
        (el) => +sliderYearOutputs[0].innerHTML <= +el.year && +el.year <= +sliderYearOutputs[1].innerHTML
      );
      settings.filters.year = [+sliderYearOutputs[0].innerHTML, +sliderYearOutputs[1].innerHTML];

      if (search.value) {
        filteredData = filteredData.filter((el) => el.name.toLowerCase().includes(search.value.toLowerCase()));
      }

      if (sort.value === "name") {
        filteredData.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        });
      }
      if (sort.value === "name-backward") {
        filteredData.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          return 0;
        });
      }
      if (sort.value === "year-backward") {
        filteredData.sort((a, b) => {
          if (+a.year < +b.year) return -1;
          if (+a.year > +b.year) return 1;
          return 0;
        });
      }
      if (sort.value === "year") {
        filteredData.sort((a, b) => {
          if (+a.year > +b.year) return -1;
          if (+a.year < +b.year) return 1;
          return 0;
        });
      }
      settings.sort = sort.value;
      setLocalStorage();

      if (filteredData.length) {
        renderCards(filteredData);
      } else {
        showEmptyMessage();
      }
    }

    function resetFilters() {
      filterFavorite.checked = false;
      filterSizeSmall.checked = false;
      filterSizeMedium.checked = false;
      filterSizeBig.checked = false;
      filterColorWhite.checked = false;
      filterColorYellow.checked = false;
      filterColorRed.checked = false;
      filterColorBlue.checked = false;
      filterColorGreen.checked = false;
      filterShapeBall.checked = false;
      filterShapeFigure.checked = false;
      filterShapeBell.checked = false;
      filterShapeCone.checked = false;
      filterShapeFlake.checked = false;
      search.value = "";
      sliderNumber.noUiSlider.set([sliderNumberMin, sliderNumberMax]);
      sliderYear.noUiSlider.set([sliderYearMin, sliderYearMax]);
      filterData();
    }

    function resetSettings() {
      settings.favorites = [];
      sort.value = "name";
      handleFavoritesCounter();
      resetFilters();
      initSettings();
    }

    function showEmptyMessage() {
      cardsContainer!.innerHTML = "";
      const emptyMessage = document.createElement("p");
      emptyMessage.classList.add("empty-message");
      emptyMessage.innerText = "Извините, совпадений не обнаружено.";
      cardsContainer!.append(emptyMessage);
    }

  


    function actualizeFilters() {
      if (settings.filters.arrSize.includes("малый")) {
        filterSizeSmall.checked = true;
      }
      if (settings.filters.arrSize.includes("средний")) {
        filterSizeMedium.checked = true;
      }
      if (settings.filters.arrSize.includes("большой")) {
        filterSizeBig.checked = true;
      }

      if (settings.filters.arrShape.includes("шар")) {
        filterShapeBall.checked = true;
      }
      if (settings.filters.arrShape.includes("фигурка")) {
        filterShapeFigure.checked = true;
      }
      if (settings.filters.arrShape.includes("колокольчик")) {
        filterShapeBell.checked = true;
      }
      if (settings.filters.arrShape.includes("шишка")) {
        filterShapeCone.checked = true;
      }
      if (settings.filters.arrShape.includes("снежинка")) {
        filterShapeFlake.checked = true;
      }

      if (settings.filters.arrColor.includes("белый")) {
        filterColorWhite.checked = true;
      }
      if (settings.filters.arrColor.includes("желтый")) {
        filterColorYellow.checked = true;
      }
      if (settings.filters.arrColor.includes("красный")) {
        filterColorRed.checked = true;
      }
      if (settings.filters.arrColor.includes("синий")) {
        filterColorBlue.checked = true;
      }
      if (settings.filters.arrColor.includes("зелёный")) {
        filterColorGreen.checked = true;
      }

      sort.value = settings.sort;

      if (settings.filters.onlyFavorites === true) {
        filterFavorite.checked = true;
      }
    }



    function initSettings() {
      setDefaultSettings();
      handleFavoritesCounter();
      setLocalStorage();
    }


   
    function init() {
      assignSettings();

      overlay?.addEventListener("click", () => {
        overlay.classList.add("hidden");
      });

      noUiSlider.create(sliderNumber, {
        start: [settings.filters.number[0], settings.filters.number[1]],
        step: 1,
        connect: true,
        range: {
          min: sliderNumberMin,
          max: sliderNumberMax,
        },
      });

      noUiSlider.create(sliderYear, {
        start: [settings.filters.year[0], settings.filters.year[1]],
        step: 1,
        connect: true,
        range: {
          min: sliderYearMin,
          max: sliderYearMax,
        },
      });

      sliderNumber.noUiSlider.on("update", function (values, handle) {
        sliderNumberOutputs[handle].innerHTML = parseInt(values[handle]).toString();
        filterData();
      });

      sliderYear.noUiSlider.on("update", function (values, handle) {
        sliderYearOutputs[handle].innerHTML = parseInt(values[handle]).toString();
        filterData();
      });

      actualizeFilters();
      handleFavoritesCounter();
      filterData();
    }

    //window.addEventListener("beforeunload", setLocalStorage);
    window.addEventListener("load", init);
    init();
  },
};

export default Toys;
