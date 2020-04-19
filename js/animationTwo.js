window.addEventListener("load", () => {

  // Declaring variables to control the DOM elements inside the banner
  let fringe = document.getElementById("fringe");
  let innerGreeting = document.getElementById("innerGreeting");
  let followDown = document.getElementById("followDown");
  let header = document.getElementById("header");
  let back = document.getElementById("back");
  let mainProject = document.getElementById("mainProject");
  let options = document.getElementById("options");
  let windowPop = document.getElementById("windowPop");
  let banner = document.getElementById("banner");
  let close = document.getElementById("close");


  // Variable to append the html for the project div
  let htmlOptions = "";

  header.style.opacity = 0;
  back.style.opacity = 0;
  mainProject.style.opacity = 0;

  // Variable to save the data name from the API
  let dataName;

  // Variable to save data for the coding skills
  let skills;

  // Variable to know when cliking outside windowPop
  let windowOut = 0;
  let plusIconClicked = 0;

  // Async function to fetch the data from the server as a json file
  // Fetching the name data
  const requestName = async () => {
    const responseName = await fetch("http://192.0.0.1:3030/name");
    dataName = await responseName.json();
  }

  // Fetching the skills data
  const requestSkills = async () => {
    const responseSkills = await fetch("http://192.0.0.1:3030/skills");
    skills = await responseSkills.json();
  }

  // Once the Async function get the data we print it to the fringe banner
  requestName().then(() => {

    innerGreeting.innerHTML = "Hi " + dataName.Name + ",<br> Welcome to my Portfolio,<br>These are some of my projects";

  });
  requestSkills().then(() => {

  });

  // Listener to know when the user clikc the Down arrow
  // and then to start the transition for the fringe banner to Up
  followDown.addEventListener('click', function (event) {

    // Start transition for fringe banner
    fringe.setAttribute("class", "fringeUp");
    followDown.setAttribute("class", "fadeOut");
    followDown.style.opacity = 0;
    fringe.style.marginTop = 0;
    fringe.style.opacity = 0;

  });

  // Listener to know when the fringe banner finish its transition
  // And to start the header one
  fringe.addEventListener("webkitAnimationEnd", (e) => {

      if (e.animationName == "fringeUp") {
        header.setAttribute("class", "headerDown");
        header.style.opacity = 1;

      }

  });


 // Listening the header animation to know whne it is done to start the links fading in
  header.addEventListener("webkitAnimationEnd", (e) => {
    if (e.animationName == "headerDown" || e.animationName == "headerDownMobile") {

      // Starting the top header links animation
      back.setAttribute("class", "fadeIn");

      // Using a for loop to catch the elements and properties from the json data.
      // Once we have the properties we append them to a html format to write on DOM.
      htmlOptions = "";
      for (var prop in skills.front) {

        htmlOptions = htmlOptions + "<div id='"+ skills.front[prop].title +"' class='optionLink'><div id='line'></div><div class='innerskiil'>"+ skills.front[prop].title +"</div></div>";
      }



    options.innerHTML = htmlOptions;

    mainProject.insertAdjacentHTML('beforeend', "<p id='mainProjectTitle'>"+ skills.front.one.title +"</p><p id='mainProjectSubtitle'>"+ skills.front.one.description +"</p>");
    let plusIcon = document.getElementById("plusIcon");
    let mainProjectTitle = document.getElementById("mainProjectTitle");
    //mainProject.style.background = "#f3f3f3 url('../images/"+ skills.front.one.title +".png') no-repeat right";
    //mainProject.style.backgroundSize = "20vw 23vw";
    back.style.opacity = 1;
    mainProject.style.opacity = 1;
    }
  });

  plusIcon.addEventListener('click', function (event) {

    setTimeout(() => {
      windowPop.style.opacity = 1;
      mainProject.style.opacity = 0;
      windowPop.style.zIndex = 4;
      mainProject.style.zIndex = 3;
      plusIconClicked = 1;
      banner.style.opacity = 0.4;
      options.style.opacity = 0;
      header.style.opacity = 0;
    }, 250);


  });

  //Function to double check when an element is hovered and make a redundant checking
  function isHover(e) {
    return (e.parentElement.querySelector(':hover') === e);
  }

  document.addEventListener('mousemove', function checkHover() {

    //Assigning variables to windowPop
    let hovered = isHover(windowPop);

    //sentence to know when a windowPop is hovered
    if (hovered == false) {
      //nothing to do
      windowOut = 1;
    } else {
      windowOut = 0;
    }

  });

  banner.addEventListener('click', function (event) {

    if(windowOut == 1 && plusIconClicked == 1) {

      plusIconClicked = 0;
      windowPop.style.opacity = 0;
      mainProject.style.opacity = 1;
      windowPop.style.zIndex = 3;
      mainProject.style.zIndex = 4;
      banner.style.opacity = 1;
      options.style.opacity = 1;
      header.style.opacity = 1;

    }

  });

  close.addEventListener('click', function (event) {

    if(plusIconClicked == 1) {

      plusIconClicked = 0;
      windowPop.style.opacity = 0;
      mainProject.style.opacity = 1;
      windowPop.style.zIndex = 3;
      mainProject.style.zIndex = 4;
      banner.style.opacity = 1;
      options.style.opacity = 1;
      header.style.opacity = 1;

    }
  });


  options.addEventListener('click', function (event) {
    let name = (event.srcElement.firstChild.nodeValue || event.originalTarget.firstChild.nodeValu);

    let description = "";


        for (var prop in skills.front) {
          if (skills.front[prop].title == name) {
            description = skills.front[prop].description;
            imageUrl = skills.front[prop].image;
          }
        }

    if (name != null){
      mainProjectTitle.innerText = "";
      mainProjectSubtitle.innerText = "";
      mainProjectTitle.innerText = name;
      mainProjectSubtitle.innerText = description;
      windowPop.style.backgroundImage = "url("+ imageUrl +")";
    }


  });


});
