/*****************************Define all the sections, buttons and variables*/
var $ = document.querySelector.bind(document);
var $$ = document.getElementById.bind(document);
const startPage = $(".startpage"); //startpage section
const dashboardPage = $(".dashboard"); //dashboard section
const doctorPage = $(".selected__doctor"); //selected doctor section
const getStartedButton = $$("js-startpageButton"); //startpage button
const backButton = $$("js-backButton"); //back button from the selected doctor section
const searchButton = $$("js-dashboardSearchButton"); //dashboard search button
const clearButton = $$("js-dashboardSearchClearButton"); //dashboard clear search button

/************************************************define al classes and arrays*/

class doctor {
  constructor(avatar, name, category, about, specialization, color) {
    this.avatar = avatar;
    this.name = name;
    this.category = category;
    this.about = about;
    this.specialization = specialization;
    this.color = color;
  }
} //class of the doctors

let doctors = [
  (stellaKane = new doctor(
    "assets/images/avatars/doc_avatar_1.svg",
    "Dr. Stella Kane",
    "Heart Surgeon - Flower Hospitals",
    "Dr. Stella is the top most heart surgeon in Flower Hospital. She has done over 100 successful sugeries within past 3 years. She has achieved several awards for her wonderful contribution in her own field. She’s available for private consultation for given schedules.",
    "heart",
    "#edf1fa"
  )),
  (josephCart = new doctor(
    "assets/images/avatars/doc_avatar_2.svg",
    "Dr. Joseph Cart",
    "Dental Surgeon - Flower Hospitals",
    "Lorem ipsum",
    "dental",
    "#faf2ea"
  )),
  (stefaniAlbert = new doctor(
    "assets/images/avatars/doc_avatar_3.svg",
    "Dr. Stefani Albert",
    "Heart Surgeon - Flower Hospitals",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam fugit maxime nesciunt, at neque reiciendis eos, consequuntur omnis, modi totam aliquid qui iste eius odit deleniti facere! Nisi, cumque fugiat.",
    "heart",
    "#f9edeb"
  )),
]; //doctors array built with the class

class category {
  constructor(category, icon, color, classes) {
    this.category = category;
    this.icon = icon;
    this.color = color;
    this.classes = classes;
  }
} //category class

let categories = [
  (dental = new category(
    "Dental Surgeon",
    "assets/images/icons/dental_ico.svg",
    "#4b7ffb",
    "dental"
  )),
  (heart = new category(
    "Heart Surgeon",
    "assets/images/icons/heart_ico.svg",
    "#ffb167",
    "heart"
  )),
  (eye = new category(
    "Eye Specialist",
    "assets/images/icons/eye_ico.svg",
    "#f57e71",
    "eye"
  )),
]; //category array


class fltrddctrs {
 
}

/*************************************************Define all the click events*/
getStartedButton.onclick = function (cat) {
  changePageAnimation(startPage, dashboardPage, "next");
  createCategoriesSlider();
  createDoctorsList();
};

backButton.onclick = function () {
  changePageAnimation(doctorPage, dashboardPage, "prew");
};

searchButton.onclick = function () {
  searchDoctors();
};

clearButton.onclick = function () {
  cleanSearch();
};

/***************************************************On load check device*/
window.onload = function () {
  let ckMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        ckMobile.Android() ||
        ckMobile.BlackBerry() ||
        ckMobile.iOS() ||
        ckMobile.Opera() ||
        ckMobile.Windows()
      );
    },
  };

  if (ckMobile.any()) {
    //If is mobile
    //Remove Desktop elements
    let allDesktop = document.querySelectorAll(".desktop");
    allDesktop.forEach((desktop) => {
      desktop.style.display = "none";
    });
  } else {
    //if is desktop
    //Remove all mobile elements
    let allMobile = document.querySelectorAll("section");
    allMobile.forEach((mobile) => {
      mobile.style.display = "none";
    });
    console.log("You're in desktop");
  }
};

/******************************************Function for create categories slider*/
function createCategoriesSlider() {
  let startPoint = document.querySelector(".dashboard__categories__slider");

  categories.forEach((cat, i) => {
    let sliderItem = document.createElement("div");
    sliderItem.className = "categories__slider__item";
    sliderItem.classList.add(`${cat.classes}`);
    sliderItem.onclick = function () {
      filterCategories(cat, sliderItem, i);
    };
    let SliderItemImg = document.createElement("img"); //create the icon element
    SliderItemImg.src = cat.icon;
    SliderItemImg.alt = `${cat.classes}`;
    let sliderItemSpan = document.createElement("span"); //create the text element
    sliderItemSpan.innerHTML = `${cat.category}`;
    startPoint.appendChild(sliderItem);
    sliderItem.appendChild(SliderItemImg);
    sliderItem.appendChild(sliderItemSpan);
  });
}

/***********************************************************************function for create doctor list*/

function createDoctorsList() {
  let startPoint = document.querySelector(".dashboard__doctors h3"); //where start to append items
  let list = document.createElement("ul");
  list.id = "doctorList";
  list.className = "list";
  startPoint.appendChild(list);

  //loop from frist object 0 to last and start writing the list
  doctors.forEach((doctor, i) => {
    let listItem = document.createElement("li");
    listItem.className = "list__item";
    listItem.style.background = doctor.color;
    let avatar = document.createElement("img");
    avatar.src = doctor.avatar;
    let infoBox = document.createElement("div");
    infoBox.className = "list__item__info";
    let name = document.createElement("h3");
    let spec = document.createElement("p");
    listItem.classList.add(doctor.specialization);
    list.appendChild(listItem);
    listItem.appendChild(avatar);
    listItem.appendChild(infoBox);
    infoBox.appendChild(name);
    name.innerText = doctor.name;
    infoBox.appendChild(spec);

    spec.innerText = doctor.category;
    listItem.addEventListener("click", (event) => {
      changePageAnimation(dashboardPage, doctorPage, "next");
      docInfoPage(doctor);
    });
  });
}
//Function for Selected Doctor Page
function docInfoPage(selectedDoc) {
  let docPic = document.querySelector(".doctor__profile__pic"); //Take the avatar
  let docName = document.querySelector(".doctor__profile__info h3"); //Take the name
  let docSpec = document.querySelector(".doctor__profile__info p"); //Take the specialization
  let docAbout = document.querySelector(".doctor__about p");

  docPic.src = `${selectedDoc.avatar}`;
  docName.innerHTML = `${selectedDoc.name}`;
  docSpec.innerHTML = `${selectedDoc.category}`;
  docAbout.innerHTML = `${selectedDoc.about}`;
}

/*************************************** SEARCHING & FILTERING FUNCTIONS */

//function for search doctors by name
function searchDoctors() {
  let input = document.querySelector("#search").value.toUpperCase();
  let doctors = document.querySelectorAll(".list__item");

  // Loop through all list items, and hide those who don't match the search query
  doctors.forEach((doctor) => {
    let nameTag = doctor.getElementsByTagName("h3")[0]; //take the h3 tag
    let name = nameTag.innerText || nameTag.textContent; //take the h3 content
    if (name.toUpperCase().indexOf(input) > -1) {
      doctor.style.display = "";
    } else {
      doctor.style.display = "none";
    }
  });
  clearButton.style.display = "flex"; //makes appear the clear button
  searchButton.style.width = "37.5px"; //it gives the width of the search button element
  clearButton.style.width = "37.5px"; //it gives the width of the clear button element
  clearButton.style.marginRight = "37.5px"; //it gives the margin of the clear button element
  clearButton.style.opacity = 0.7; //it gives the opacity of the clear button element
}

//function for clear the search results
function cleanSearch() {
  let input = document.querySelector("#search");
  let doctors = document.querySelectorAll(".list__item");
  input.value = ""; //it gives the value at the input field
  doctors.forEach((doctor) => {
    doctor.style.display = "flex"; //it makes all the doctors appear again
  });
  clearButton.style.display = "none"; //it makes the clear button element disappear again
  searchButton.style.width = "75px"; //it gives to the search button his original width
}

/***************************************************** UTILITY FUNCTIONS */

//Function for page animation
function changePageAnimation(currentPage, finalPage, where) {
  //Define Keyframes
  let slideOutKeyFrames = [
    { transform: "translateX(0%)" },
    { transform: "translateX(-120%)" },
  ];

  let slideInKeyFrames = [
    { transform: "translateX(120%)" },
    { transform: "translateX(0)" },
  ];

  let slideOutReverseKeyFrames = [
    { transform: "translateX(0%)" },
    { transform: "translateX(120%)" },
  ];

  let slideInReverseKeyFrames = [
    { transform: "translateX(-120%)" },
    { transform: "translateX(0)" },
  ];

  if (where == "next") {
    let slideOut = currentPage.animate(slideOutKeyFrames, 350);
    finalPage.animate(slideInKeyFrames, 350);
    finalPage.style.display = "flex";
    slideOut.onfinish = function () {
      currentPage.style.display = "none";
    };
  } else if (where == "prew") {
    currentPage.animate(slideOutReverseKeyFrames, 350);
    finalPage.animate(slideInReverseKeyFrames, 350);
    currentPage.style.transform = slideOutKeyFrames;
    finalPage.style.display = "flex";
  }
}

function filterCategories(cat, sliderItem, i) {
  let filteredDoctors = doctors.filter(
    (doctor) => doctor.specialization == cat.classes
  ) ; // filter the doctors by categories


  //define the image, the text, and the list that has to be changed
  let categoryImg = document.querySelectorAll(".categories__slider__item img");
  let categoryDesc = document.querySelectorAll(
    ".categories__slider__item span"
  );
  
  console.log(document.getElementsByClassName("list__item"))
 

  sliderItem.classList.toggle("clicked");

  //toggle to filter and clear the filter
  if (sliderItem.classList.contains("clicked")) {
    categoryImg[i].style.background = "white"; //change the background
    categoryImg[i].src = "assets/images/icons/close_ico.svg"; //change the icon
    categoryDesc[i].innerHTML = "Clear Search"; //change the text
    document.getElementById("doctorList").style.display = "none";
    createFilteredDoctorsList(filteredDoctors);
  } else {
    document.getElementById("doctorList").style.display = "";
    document.getElementById("filteredDoctorList").remove();

    categoryImg[i].style.background = cat.color; //change the background
    categoryImg[i].src = cat.icon; //change the icon
    categoryDesc[i].innerHTML = cat.category; //change the text
  }
}

function createFilteredDoctorsList(filteredDoctors) {
  let startPoint = document.querySelector(".dashboard__doctors h3"); //where start to append items
  let list = document.createElement("ul");
  list.className = "list";
  list.id = "filteredDoctorList";
  startPoint.appendChild(list);
  filteredDoctors.forEach((doctor, i) => {
    let listItem = document.createElement("li");
    listItem.className = "list__item";
    listItem.style.background = doctor.color;
    let avatar = document.createElement("img");
    avatar.src = doctor.avatar;
    let infoBox = document.createElement("div");
    infoBox.className = "list__item__info";
    let name = document.createElement("h3");
    let spec = document.createElement("p");
    listItem.classList.add(doctor.specialization);
    list.appendChild(listItem);
    listItem.appendChild(avatar);
    listItem.appendChild(infoBox);
    infoBox.appendChild(name);
    name.innerText = doctor.name;
    infoBox.appendChild(spec);

    spec.innerText = doctor.category;
    listItem.addEventListener("click", (event) => {
      changePageAnimation(dashboardPage, doctorPage, "next");
      docInfoPage(doctor);
    });
  });
}
