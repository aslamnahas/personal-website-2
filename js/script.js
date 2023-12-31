let lightBtn = document.querySelector("#light");
let darkBtn = document.querySelector("#dark");
let header = document.querySelector("header");
let links = document.querySelectorAll("nav a");
let sections = document.querySelectorAll(".section");
let body=document.querySelector('body');
const openMenu = document.querySelector("#openMenu");
const closeMenu = document.querySelector("#closeMenu");
let navMenu = document.querySelector(".navMenu");
let logoMenu = document.querySelector(".logoMenu");
let mainHeader = document.querySelector(".mainHeader");



/*----------- light and dark modes -----------*/
if(localStorage.getItem("theme")===null){
    localStorage.setItem("theme","dark");
}
if(localStorage.getItem("theme")==="light"){
    body.classList.add("light");
    lightBtn.style.display="none";
    darkBtn.style.display="block";
}
else if(localStorage.getItem("theme")==="dark"){
    body.classList.remove("light");
    lightBtn.style.display="block";
    darkBtn.style.display="none";
}
lightBtn.onclick=()=>{
    body.classList.toggle("light");
    if(body.classList.contains("light")){
        lightBtn.style.display="none";
        darkBtn.style.display="block";
        localStorage.setItem("theme","light")
    }
    else{
        lightBtn.style.display="block";
        darkBtn.style.display="none";
        localStorage.setItem("theme","dark")
    }
}
darkBtn.onclick=()=>{
    body.classList.toggle("light");
    if(body.classList.contains("light")){
        lightBtn.style.display="none";
        darkBtn.style.display="block";
        localStorage.setItem("theme","light")
    }
    else{
        lightBtn.style.display="block";
        darkBtn.style.display="none";
        localStorage.setItem("theme","dark")
    }
}






function headerBackground(){
    if(this.scrollY <= 0 && !navMenu.classList.contains("navShow")){

        header.classList.add("headerBackground");
    }
    

    else if( this.scrollY > 0 && navMenu.classList.contains("navShow")){
        header.classList.add("headerBackground");
    }
    else if( this.scrollY <= 0 && navMenu.classList.contains("navShow")){
        header.classList.remove("headerBackground");
    }
}

/*---------- header sticky on scroll -----------*/
function stickyToggle(){
    header.classList.add("sticky");
    if(this.scrollY <= 0){
        header.classList.remove("sticky");
    }
    
}



/* change the active link on scrolling through sections ----*/
function activeToggle(){
    sections.forEach(section =>{
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        if(top >= offset && top < offset + height){
            let id = section.getAttribute("id");
        
            links.forEach(link =>{
                link.classList.remove("active");
            })
            document.querySelector(`nav a[href="#${id}"]`).classList.add("active");
        }
    })
}



/*---------- do functions on scrolling ----*/
window.addEventListener("scroll", ()=>{
    stickyToggle();
    activeToggle();
    headerBackground();
});



/*------ change active link on click ---*/
links.forEach(link=>{
    link.addEventListener("click",()=>{
        navMenu.classList.add("navShow");
        document.querySelector(".active").classList.remove("active");
        link.classList.add("active");
        console.log(window.innerWidth);
        if(window.innerWidth<="1090"){
            openMenu.style.display="block";
            closeMenu.style.display="none";
        }
    })
})



/*------- typed.js animation-------*/
const typed = new Typed(".multiple-text", {
    strings: ['Backend Developer.','Graphic Designer.','Python Developer.','Freelancer.'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});



/*----------open menu --------*/
window.addEventListener("load",()=>{
    window.scrollTo(0,0);
    navMenu.classList.add("navShow");
});
openMenu.addEventListener("click",()=>{
    openMenu.style.display="none";
    closeMenu.style.display="block";
    navMenu.classList.remove("navShow");
    logoMenu.classList.add("headerBackground");
})



/*----------close menu --------*/
closeMenu.addEventListener("click",()=>{
    closeMenu.style.display="none";
    openMenu.style.display="block";
    navMenu.classList.add("navShow");
    logoMenu.classList.remove("headerBackground");
})



/*-------------ScrollReveal-------------*/
ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.btn , .content , form', { origin: 'bottom'});

ScrollReveal().reveal('.info , .heading', { origin: 'top' });

ScrollReveal().reveal('.info #name , #aboutImg', { origin: 'left'});

ScrollReveal().reveal('.darkLight', { origin: 'left' , distance: '500px' , duration: 1700 , delay: 0 , reset:false});

function downloadAndOpenResume() {
    // URL to your resume file
    var resumeUrl = 'img/resume.jpg';

    // Open the URL in a new tab
    window.open(resumeUrl, '_blank');

    // Trigger the download
    var link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'resume.jpg';
    link.click();
}

$("#submit-form").submit((e)=>{
    e.preventDefault()
    const response = validateForm()
    if(response === false){
        return
    }
    $.ajax({
        url:"https://script.google.com/macros/s/AKfycbwbYMqrgZ-1PQmrlpWlyjFlpUGgaZ3-XVykhQZAQrbAAVzWTD7WCUYVcZvBl78s7OaMYQ/exec",
        data:$("#submit-form").serialize(),
        method:"post",
        success:function (response){
            alert("Form submitted successfully")
            window.location.reload()
            //window.location.href="https://google.com"
        },
        error:function (err){
            alert("Something Error")

        }
    })
})

function validateForm() {
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var number = document.getElementById('number').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    if (fname === "") {
        alert("Must have a username");
        document.getElementById('fname').focus();
        return false;
    } 
    if (lname === "") {
        alert("Must provide an Email Id");
        document.getElementById('lname').focus();
        return false;
    } 
    if (number === "") {
        alert("Must have a Number");
        document.getElementById('number').focus();
        return false;
    } 
    if (subject === "") {
        alert("Must have a Subject");
        document.getElementById('subject').focus();
        return false;
    } 
    if (message === "") {
        alert("Must have a Message");
        document.getElementById('message').focus();
        return false;
    } 

    // Validate name: Only letters allowed
    if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(fname)) {
        alert("Invalid name. It should contain only letters. and First name and Last name with a space");
        document.getElementById('fname').focus();
        return false;
    }

    // Validate phone number: 10 digits only
    if (!/^\d{10}$/.test(number)) {
        alert("Invalid phone number. It should be 10 digits long and contain only numbers.");
        document.getElementById('number').focus();
        return false;
    }

    // Validate email format
    var emailRegex = /^[^\s@&%#$)(!]+@[^\s@&%#$)(!]+\.[^\s@&%#$)(!]+$/;

    if (!emailRegex.test(lname)) {
        alert("Invalid email address. Please provide a valid email with the correct structure.");
        document.getElementById('lname').focus();
        return false;
    }
    
    return true;
}
