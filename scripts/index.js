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