import { data } from "./data";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

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
const sliderNumber: any = document.getElementById("sliderNumber")!;
const sliderYear: any = document.getElementById("sliderYear")!;
const sliderNumberMin = 1;
const sliderNumberMax = 12;
const sliderYearMin = 1940;
const sliderYearMax = 2020;
const sliderNumberOutputs = [
  document.getElementById("slider-number-output-lower")!,
  document.getElementById("slider-number-output-upper")!,
];
const sliderYearOutputs = [
  document.getElementById("slider-year-output-lower")!,
  document.getElementById("slider-year-output-upper")!,
];

noUiSlider.create(sliderNumber, {
  start: [1, 12],
  step: 1,
  connect: true,
  range: {
    min: sliderNumberMin,
    max: sliderNumberMax,
  },
});

noUiSlider.create(sliderYear, {
  start: [1940, 2020],
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

function renderCards(data) {
  const fragment = document.createDocumentFragment();
  const sourceCard = document.querySelector("#sourceCard") as HTMLTemplateElement;
  cardsContainer!.innerHTML = "";

  data.forEach((item) => {
    const sourceClone = sourceCard.content.cloneNode(true) as DocumentFragment;
    sourceClone.querySelector(".card-name")!.textContent = item.name;
    const img = sourceClone.querySelector(".card-image") as HTMLImageElement;
    img.src = `./images/toys/${item.num}.webp`;
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
}

function filterData() {
  let filteredData = data;
  if (filterFavorite.checked) {
    filteredData = filteredData.filter((el) => el.favorite);
  }

  let arrSize: string[] = [];
  if (filterSizeSmall.checked) {
    arrSize.push("малый");
  }
  if (filterSizeMedium.checked) {
    arrSize.push("средний");
  }
  if (filterSizeBig.checked) {
    arrSize.push("большой");
  }
  if (!filterSizeSmall.checked && !filterSizeMedium.checked && !filterSizeBig.checked) {
    arrSize = ["малый", "средний", "большой"];
  }
  filteredData = filteredData.filter((el) => arrSize.includes(el.size));

  let arrColor: string[] = [];
  if (filterColorWhite.checked) {
    arrColor.push("белый");
  }
  if (filterColorYellow.checked) {
    arrColor.push("желтый");
  }
  if (filterColorRed.checked) {
    arrColor.push("красный");
  }
  if (filterColorBlue.checked) {
    arrColor.push("синий");
  }
  if (filterColorGreen.checked) {
    arrColor.push("зелёный");
  }
  if (
    !filterColorWhite.checked &&
    !filterColorYellow.checked &&
    !filterColorRed.checked &&
    !filterColorBlue.checked &&
    !filterColorGreen.checked
  ) {
    arrColor = ["белый", "желтый", "красный", "синий", "зелёный"];
  }
  filteredData = filteredData.filter((el) => arrColor.includes(el.color));

  let arrShape: string[] = [];
  if (filterShapeBall.checked) {
    arrShape.push("шар");
  }
  if (filterShapeFigure.checked) {
    arrShape.push("фигурка");
  }
  if (filterShapeBell.checked) {
    arrShape.push("колокольчик");
  }
  if (filterShapeCone.checked) {
    arrShape.push("шишка");
  }
  if (filterShapeFlake.checked) {
    arrShape.push("снежинка");
  }
  if (
    !filterShapeBall.checked &&
    !filterShapeFigure.checked &&
    !filterShapeBell.checked &&
    !filterShapeCone.checked &&
    !filterShapeFlake.checked
  ) {
    arrShape = ["шар", "фигурка", "колокольчик", "шишка", "снежинка"];
  }
  filteredData = filteredData.filter((el) => arrShape.includes(el.shape));

  filteredData = filteredData.filter(
    (el) => +sliderNumberOutputs[0].innerHTML <= +el.count && +el.count <= +sliderNumberOutputs[1].innerHTML
  );
  filteredData = filteredData.filter(
    (el) => +sliderYearOutputs[0].innerHTML <= +el.year && +el.year <= +sliderYearOutputs[1].innerHTML
  );

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
  //sort.value = "name";
  filterData();
}

function showEmptyMessage() {
  cardsContainer!.innerHTML = "";
  const emptyMessage = document.createElement("p");
  emptyMessage.classList.add("empty-message");
  emptyMessage.innerText = "Извините, совпадений не обнаружено.";
  cardsContainer!.append(emptyMessage);
}

alert(
  "Уважаемый проверяющий! Прошу отложить проверку на пару дней. В связи с жизненными обстоятельствами, не успел доделать в срок. Дискорд для связи: Vitaliy (bvfromru)#4741"
);
filterData();
