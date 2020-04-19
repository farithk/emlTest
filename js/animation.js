// Check if the DOM is fully loaded before to start
window.addEventListener("load", () => {

  // Declaring variables to control the DOM elements inside the banner
  let banner = document.getElementById("banner");
  let form = document.getElementById("form");
  let title = document.getElementById("title");
  let innerTitle = document.getElementById("innerTitle");
  let askingName = document.getElementById("askingName");
  let innerAskingName = document.getElementById("innerAskingName");
  let inputName = document.getElementById("inputName");
  let submitButton = document.getElementById("submitButton");

  // At first state we set the elements inside the DOM with an opacity of 0 before start the animations.
  innerTitle.style.opacity = 0;
  askingName.style.opacity = 0;
  inputName.style.opacity = 0;
  submitButton.style.opacity = 0;
  form.style.opacity = 0;

  // Start the first iamge background contracting animation
  banner.setAttribute("class","bannerShrink");

  // Listening the banner animation to know when it finished the transition and
  // to start the transitions for Title, Subtitle, Input text and Button
  banner.addEventListener("webkitAnimationEnd", (e) => {

  // When banner finished to shrink the image we start to fade in the title
    if (e.animationName == "bannerShrink") {

      form.style.opacity = 1;

      form.setAttribute("class", "formExpanding");

    }
  });

  form.addEventListener("webkitAnimationEnd", (e) => {

    if (e.animationName == "formExpanding") {

      // Call the function in charge to fade in the letters for the Title
      // and for the subtitle
      innerTitle.style.opacity = 1;
      let innerTitleToFade = fadeLetters(innerTitle).then(() => {

        // This is called when the promise for the first transition is over
        askingName.style.opacity = 1;
        let innerSubtitleToFade = fadeLetters(innerAskingName).then(() => {

          inputName.setAttribute("class", "inputNamefadeIn");
          inputName.style.opacity = 1;
        });
      });
    }
  });
});

// This is the function to fade in to white color the letters for any prhase
async function fadeLetters(phraseName){

  // Set the long of the prhase to "long" variable
  let long = phraseName.innerText.length;
  let count = 0;

  // Split the string text to have only the specific single letters in an array
  let text = phraseName.innerText.split("");

  // Declare a promise function to have control and to know when the transitionis over
  let promise = new Promise((resolve, reject) => {

    // Using a time interval to animate the letters by changing its colors to white
    let startco = setInterval(() => {

     // Transitioning every one of the letter to a white color.
     text[count] = "<span style='color:white;'>"+text[count]+"</span>";

     // printing the actual letter to the DOM with the new color
     phraseName.innerHTML = text.join("");

     count++;

     // When the counter is greater than the long of the phrase we finish the transition
     // and resolve is done for the promise
     if (count >= long) {
       clearInterval(startco);
       resolve("Done " + phraseName.innerText + " transition");
     }
   }, 50);

 });

 // Wait till the promise resolves (*)
 let result = await promise;
}

inputName.addEventListener('input', inputHandler);

function inputHandler(){

  if (inputName.value != "") {
    submitButton.style.opacity = 1;
  } else {
    submitButton.style.opacity = 0;
  }



};
