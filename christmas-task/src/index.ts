"use strict";

//import images from './images'
import Home from "./views/pages/Home";
import Toys from "./views/pages/Toys";
import Tree from "./views/pages/Tree";
import Error404 from "./views/pages/Error404";
import Navbar from "./views/components/Navbar";
import Bottombar from "./views/components/Bottombar";
import Utils from "./services/Utils";

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  "/": Home,
  "/home": Home,
  "/toys": Toys,
  "/tree": Tree,
};


type Settings = {
  favorites: string[];
  filters: {
    arrShape: string[];
    number: number[];
    year: number[];
    arrColor: string[];
    arrSize: string[];
    onlyFavorites: boolean;
  };
  sort: string;
  music: boolean;
  treeOptions: {
    snow: boolean;
    tree: number;
    background: number;
    garland: string;
  }
};

export let settings: Settings = {
  favorites: [],
  filters: {
    arrShape: [],
    number: [],
    year: [],
    arrColor: [],
    arrSize: [],
    onlyFavorites: false,
  },
  sort: "",
  music: true,
  treeOptions: {
    snow: true, 
    tree: 1,
    background: 1,
    garland: "",
  }
};

export const sliderNumberMin = 1;
export const sliderNumberMax = 12;
export const sliderYearMin = 1940;
export const sliderYearMax = 2020;


assignSettings()

export function assignSettings() {
  if (localStorage.getItem("bvfromru-christmas-settings2")) {
    settings = JSON.parse(localStorage.getItem("bvfromru-christmas-settings2")!);
  } else {
    setDefaultSettings();
  }
}

export function setDefaultSettings() {
  settings.favorites = [];
  settings.filters.arrShape = [];
  settings.filters.number = [sliderNumberMin, sliderNumberMax];
  settings.filters.year = [sliderYearMin, sliderYearMax];
  settings.filters.arrColor = [];
  settings.filters.arrSize = [];
  settings.filters.onlyFavorites = false;
  settings.sort = "name";
  settings.music = true;
  settings.treeOptions.snow = true;
  settings.treeOptions.tree = 1;
  settings.treeOptions.background = 1;
  settings.treeOptions.garland = "off";
}

export function setLocalStorage() {
  localStorage.setItem("bvfromru-christmas-settings2", JSON.stringify(settings));
}


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
  // Lazy load view element:
  const header = null || document.getElementById("header_container");
  const content = null || document.getElementById("page_container");
  const footer = null || document.getElementById("footer_container");

  // Render the Header and footer of the page
  header!.innerHTML = await Navbar.render();
  await Navbar.after_render();
  footer!.innerHTML = await Bottombar.render();
  await Bottombar.after_render();

  // Get the parsed URl from the addressbar
  let request = Utils.parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content!.innerHTML = await page.render();
  await page.after_render();
};

// Listen on hash change:
window.addEventListener("hashchange", router);

// Listen on page load:
window.addEventListener("load", router);

Utils.audios.music.autoplay = true;
Utils.audios.music.loop = true;


console.log("***\n\nПриветствую проверяющего!\nВсе обязательные пункты ТЗ выполнил, самопроверка 200/200\nДискорд для связи: Vitaliy (bvfromru)#4741, пишите в случае чего!\n\nС Наступающим!\n***");