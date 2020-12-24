//Define all the sections
const homePage = document.querySelector(".homepage");
const dashboardPage = document.querySelector(".dashboard");
const doctorPage = document.querySelector(".selected__doctor");

//On load check device
window.onload = function() {
    let ckMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
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

//Function for create categories slider
function createCategoriesSlider() {
    let categories = ["Dental Surgeon", "Heart Surgeon", "Eye Specialist"];
    let categoriesIcons = [
        "assets/images/icons/dental_ico.svg",
        "assets/images/icons/heart_ico.svg",
        "assets/images/icons/eye_ico.svg",
    ];
    let classes = ["dental", "heart", "eye"];
    let startPoint = document.querySelector(".dashboard__categories__slider");

    categories.forEach((cat, i) => {
        let sliderItem = document.createElement("div");
        sliderItem.className = "categories__slider__item";
        sliderItem.classList.add(`${classes[i]}`);
        sliderItem.onclick = function() {
            filterCategory(`${classes[i]}`);
        };
        let SliderItemImg = document.createElement("img");
        SliderItemImg.src = categoriesIcons[i];
        SliderItemImg.alt = `${categories[i]}`;
        let sliderItemSpan = document.createElement("span");
        sliderItemSpan.innerHTML = `${cat}`;
        startPoint.appendChild(sliderItem);
        sliderItem.appendChild(SliderItemImg);
        sliderItem.appendChild(sliderItemSpan);
    });
}

//function for create doctor list
function createDoctorsList() {
    //Define doctors array
    let doctors = [{
            avatar: "assets/images/avatars/doc_avatar_1.svg",
            name: "Dr. Stella Kane",
            category: "Heart Surgeon - Flower Hospitals",
            about: "Dr. Stella is the top most heart surgeon in Flower Hospital. She has done over 100 successful sugeries within past 3 years. She has achieved several awards for her wonderful contribution in her own field. She’s available for private consultation for given schedules.",
        },
        {
            avatar: "assets/images/avatars/doc_avatar_2.svg",
            name: "Dr. Joseph Cart",
            category: "Dental Surgeon - Flower Hospitals",
            about: "lorem ipsum",
        },
        {
            avatar: "assets/images/avatars/doc_avatar_3.svg",
            name: "Dr. Stefani Albert",
            category: "Heart Surgeon - Flower Hospitals",
            about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam fugit maxime nesciunt, at neque reiciendis eos, consequuntur omnis, modi totam aliquid qui iste eius odit deleniti facere! Nisi, cumque fugiat.",
        }

    ];

    //And colors array
    let colors = ["#edf1fa", "#faf2ea", "#f9edeb"];

    let startPoint = document.querySelector(".dashboard__doctors h3"); //where start to append items
    let list = document.createElement("ul");
    list.className = "list";
    startPoint.appendChild(list);

    //loop from frist object 0 to last and start writing the list
    doctors.forEach((doctor, i) => {
        let listItem = document.createElement("li");
        listItem.className = "list__item";
        listItem.style.background = colors[i];
        if (doctor.category.includes("Heart")) listItem.classList.add("heart");
        else if (doctor.category.includes("Dental"))
            listItem.classList.add("dental");
        else if (doctor.category.includes("Eye")) listItem.classList.add("eye");
        let avatar = document.createElement("img");
        avatar.src = doctor.avatar;
        let infoBox = document.createElement("div");
        infoBox.className = "list__item__info";
        let name = document.createElement("h3");
        let spec = document.createElement("p");
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