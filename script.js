const languageLeft = document.getElementById("language-left");
const englishBtn = document.getElementById("english");
const frenchBtn = document.getElementById("french");
const dropdownLeft = document.getElementById("dropdown");
const dropdownleftArrow = document.getElementById("left-arrow");
const numberCountInput = document.getElementById("input-count");
const translateBtn = document.getElementById("translate-btn");
const leftBorder = document.getElementById("leftborder");

const languageRight = document.getElementById("language-right");
const englishBtnRight = document.getElementById("english-right");
const frenchhBtnRight = document.getElementById("french-right");
const dropdownrightArrow = document.getElementById("right-arrow");
const dropdownRight = document.getElementById("dropdown-right");
const textareaRight = document.getElementById("text-area-right");
const rightBorder = document.getElementById("rightborder");

//Button Language style
function applyButtonStyles(button) {
    button.style.color = "#F9FAFB";
    button.style.backgroundColor = "#4D5562";
    button.style.padding = "10px";
    button.style.borderRadius = "13px";
}

function removeButtonStyles(button) {
    button.style.color = "";
    button.style.backgroundColor = "";
    button.style.padding = "";
    button.style.borderRadius = "";
}

//Left Container, button styles toggle
frenchBtn.addEventListener("click", french);
englishBtn.addEventListener("click", english);
dropdownLeft.addEventListener("click", dropDownSpanish);

function french() {
    applyButtonStyles(frenchBtn);
    removeButtonStyles(englishBtn);
    removeButtonStyles(dropdownLeft);
    rightBorder.style.height = "0.1px";
    dropdownleftArrow.style.display = "flex";
}

function english() {
    applyButtonStyles(englishBtn);
    removeButtonStyles(frenchBtn);
    removeButtonStyles(dropdownLeft);
    rightBorder.style.height = "0.1px";
    dropdownleftArrow.style.display = "flex";
}

function dropDownSpanish(){
    applyButtonStyles(dropdownLeft);
    removeButtonStyles(englishBtn);
    removeButtonStyles(frenchBtn);
    dropdownleftArrow.style.display = "none";
    leftBorder.style.height = "0.1px";
    rightBorder.style.height = "0.1px";
}

//Right Container, button styles toggle
englishBtnRight.addEventListener("click", englishRightContainer)
frenchhBtnRight.addEventListener("click", frenchRightContainer)
dropdownRight.addEventListener("click", dropwDownSpanishRightContainer)

function frenchRightContainer(){
    applyButtonStyles(frenchhBtnRight);
    removeButtonStyles(englishBtnRight);
    removeButtonStyles(dropdownRight);
    dropdownrightArrow.style.display = "flex";
}

function englishRightContainer(){
    applyButtonStyles(englishBtnRight);
    removeButtonStyles(frenchhBtnRight);
    removeButtonStyles(dropdownRight);
    dropdownrightArrow.style.display = "flex";
}

function dropwDownSpanishRightContainer(){
    applyButtonStyles(dropdownRight);
    removeButtonStyles(englishBtnRight);
    removeButtonStyles(frenchhBtnRight);
    dropdownrightArrow.style.display = "none";
    rightBorder.style.height = "0.1px";
}

//Select language on the left container
let sourceLanguage = '';

languageLeft.addEventListener('click', (event) => {
    const target = event.target;

    if (target.tagName === 'SPAN') {
        sourceLanguage = target.getAttribute("data-lang"); 
        textareaLeft.removeAttribute('disabled');
        console.log(`Selected language: ${sourceLanguage}`);
    }
    if (target.tagName === 'OPTION') {
        sourceLanguage = target.value;
        textareaLeft.removeAttribute('disabled');
        console.log(`Selected language: ${sourceLanguage}`);
    }
});

languageLeft.addEventListener('change', (event) => {
    if (event.target.tagName === 'SELECT') {
        const selectedOption = event.target.value;
        sourceLanguage = selectedOption;
        textareaLeft.removeAttribute('disabled');
        console.log(`Selected language: ${sourceLanguage}`);
    }
});

//select language on the right container
let targetLanguage = '';

languageRight.addEventListener('click', (event) => {
    const target = event.target;

    if (target.tagName === 'SPAN') {
        targetLanguage = target.getAttribute("data-lang"); 
        console.log(`Selected language: ${targetLanguage}`);
    }
    if (target.tagName === 'OPTION') {
        targetLanguage = target.value;
        targetLanguage = target.value.es
        console.log(`Selected language: ${targetLanguage}`);
    }
});

languageRight.addEventListener('change', (event) => {
    if (event.target.tagName === 'SELECT') {
         targetLanguage = event.target.value;
        console.log(`Selected language: ${targetLanguage}`);
    }
});

//Textarea
const textareaLeft = document.getElementById("text-area");
textareaLeft.addEventListener('input', () => {
    if (languageLeft.value && languageRight.value) {
        textareaLeft.value = textareaRight.value; 
    }
});

const letterCount = document.getElementById("input-count");
textareaLeft.addEventListener("input", countLetter);
function countLetter(){
    const text = textareaLeft.value;
    const textLength = text.length;
   
    letterCount.textContent = `${textLength}`;
}

const copytextareaLeft = document.getElementById("copy-left");
const messageCopyLeft = document.getElementById("copyMessage");

copytextareaLeft.addEventListener("click", function(){
    navigator.clipboard.writeText(textareaLeft.value);
    messageCopyLeft.innerHTML = `Copied!`;
    
    setTimeout(function() {
        messageCopyLeft.innerHTML = ''; 
    }, 2000);
})

const copytextareaRight = document.getElementById("copy-right");
const messageCopyRight = document.getElementById("copyMessageRight");

copytextareaRight.addEventListener("click", function(){
    navigator.clipboard.writeText(textareaRight.value);
    messageCopyRight.innerHTML = "Copied!";

    setTimeout(function() {
        messageCopyRight.innerHTML = "";
    }, 3000);
})

const speechLeft = new SpeechSynthesisUtterance();
const soundtranslateLeft = document.getElementById("sound-left");
soundtranslateLeft.addEventListener("click", soundLeft)
function soundLeft(){
    speechLeft.text = document.getElementById("text-area").value;
    window.speechSynthesis.speak(speechLeft);

}

const speechRight = new SpeechSynthesisUtterance();
const soundtranslateRight = document.getElementById("sound-right");
soundtranslateRight.addEventListener("click", soundRight)
function soundRight(){
    speechRight.text = document.getElementById("text-area-right").value;
    const dropdownRight = document.getElementById("dropdown-right").value;

    speechRight.lang = dropdownRight;
    console.log(speechRight,"works")
    window.speechSynthesis.speak(speechRight);
}

function decodeHTMLEntities(text) {
    const tempElement = document.createElement('textarea');
    tempElement.innerHTML = text;
    return tempElement.value;
}

translateBtn.addEventListener('click', () => {
    const textToTranslate = textareaLeft.value;

    if (sourceLanguage && targetLanguage && textToTranslate) {
        translateText(textToTranslate, sourceLanguage, targetLanguage).then(translatedText => {
            textareaRight.value = decodeHTMLEntities(translatedText);
        });
    }
});

//switch toggle language and textarea input, left container to the right container. Vice versa
let englishBtnLeftStyle = document.getElementById("english");
let frenchBtnLeftStyle = document.getElementById("french");
let dropdownBtnLeftStyle = document.getElementById("dropdown");
let textareaInputLeft = document.getElementById("text-area");

let englishBtnRightStyle = document.getElementById("english-right");
let frenchhBtnRightStyle = document.getElementById("french-right");
let dropdownBtnRightStyle = document.getElementById("dropdown-right");
let textareaInputRight = document.getElementById("text-area-right");

let switchContainer = document.getElementById("switch-container");

function applyButtonStyles(button) {
    button.style.color = "#F9FAFB";
    button.style.backgroundColor = "#4D5562";
    button.style.padding = "10px";
    button.style.borderRadius = "13px";
}

function removeButtonStyles(button) {
    button.style.color = "";
    button.style.backgroundColor = "";
    button.style.padding = "";
    button.style.borderRadius = "";
}

// Switch languages and styles
function switchLanguages(event) {
    const isLeftLanguageActive = englishBtnLeftStyle.classList.contains("active") || frenchBtnLeftStyle.classList.contains("active");
    const isRightLanguageActive = englishBtnRightStyle.classList.contains("active") || frenchhBtnRightStyle.classList.contains("active");

     // Switch textarea values
     let switchValue = textareaLeft.value;
     textareaLeft.value = textareaRight.value;
     textareaRight.value = switchValue;

    // Manually handle styles for language left button
    if (isLeftLanguageActive) {
        if (englishBtnLeftStyle.classList.contains("active")) {
            applyButtonStyles(frenchBtnLeftStyle);
            removeButtonStyles(englishBtnLeftStyle);
            englishBtnLeftStyle.classList.remove("active");
            frenchBtnLeftStyle.classList.add("active");
        } else {
            applyButtonStyles(englishBtnLeftStyle);
            removeButtonStyles(frenchBtnLeftStyle);
            englishBtnLeftStyle.classList.add("active");
            frenchBtnLeftStyle.classList.remove("active");
        }
    }

    // Manually handle styles for language right button
    if (isRightLanguageActive) {
        if (englishBtnRightStyle.classList.contains("active")) {
            applyButtonStyles(frenchhBtnRightStyle);
            removeButtonStyles(englishBtnRightStyle);
            englishBtnRightStyle.classList.remove("active");
            frenchhBtnRightStyle.classList.add("active");
        } else {
            applyButtonStyles(englishBtnRightStyle);
            removeButtonStyles(frenchhBtnRightStyle);
            englishBtnRightStyle.classList.add("active");
            frenchhBtnRightStyle.classList.remove("active");
        }
    }

    if (
        event.target === dropdownBtnLeftStyle ||
        event.target === dropdownBtnRightStyle
    ) {
        removeButtonStyles(englishBtnLeftStyle);
        removeButtonStyles(englishBtnRightStyle);
        switchDropDownsLang();
        return; 
    }
}

function switchDropDownsLang() {
    let switchDropdowns = dropdownBtnLeftStyle.value;
    dropdownBtnLeftStyle.value = dropdownBtnRightStyle.value;
    dropdownBtnRightStyle.value = switchDropdowns;
}

// Attach event listeners for the switch container
switchContainer.addEventListener("click", switchLanguages);
switchContainer.addEventListener("click", switchDropDownsLang);

// Handle language left container button clicks
function handleLeftButtonClick(event) {
    if (event.target === englishBtnLeftStyle) {
        applyButtonStyles(englishBtnLeftStyle);
        removeButtonStyles(frenchBtnLeftStyle);
        removeButtonStyles(dropdownBtnLeftStyle);
        englishBtnLeftStyle.classList.add("active");
        frenchBtnLeftStyle.classList.remove("active");
    } else if (event.target === frenchBtnLeftStyle) {
        applyButtonStyles(frenchBtnLeftStyle);
        removeButtonStyles(englishBtnLeftStyle);
        removeButtonStyles(dropdownBtnLeftStyle);
        frenchBtnLeftStyle.classList.add("active");
        englishBtnLeftStyle.classList.remove("active");
    }
}

// Handle language right container button clicks
function handleRightButtonClick(event) {
    if (event.target === englishBtnRightStyle) {
        applyButtonStyles(englishBtnRightStyle);
        removeButtonStyles(frenchhBtnRightStyle);
        removeButtonStyles(dropdownBtnRightStyle);
        englishBtnRightStyle.classList.add("active");
        frenchhBtnRightStyle.classList.remove("active");
    } else if (event.target === frenchhBtnRightStyle) {
        applyButtonStyles(frenchhBtnRightStyle);
        removeButtonStyles(englishBtnRightStyle);
        removeButtonStyles(dropdownBtnRightStyle);
        frenchhBtnRightStyle.classList.add("active");
        englishBtnRightStyle.classList.remove("active");
    }
}

// Handle dropdown button clicks
function handleDropdownClick(event) {
    if (event.target === dropdownBtnLeftStyle) {
        removeButtonStyles(englishBtnLeftStyle);
        removeButtonStyles(frenchBtnLeftStyle);
        englishBtnLeftStyle.classList.remove("active");
        frenchBtnLeftStyle.classList.remove("active");
        applyButtonStyles(dropdownBtnLeftStyle);
    } else if (event.target === dropdownBtnRightStyle) {
        removeButtonStyles(englishBtnRightStyle);
        removeButtonStyles(frenchhBtnRightStyle);
        englishBtnRightStyle.classList.remove("active");
        frenchhBtnRightStyle.classList.remove("active");
        applyButtonStyles(dropdownBtnRightStyle);
    }
}

// Attach event listeners for individual buttons
englishBtnLeftStyle.addEventListener("click", handleLeftButtonClick);
frenchBtnLeftStyle.addEventListener("click", handleLeftButtonClick);
englishBtnRightStyle.addEventListener("click", handleRightButtonClick);
frenchhBtnRightStyle.addEventListener("click", handleRightButtonClick);
dropdownBtnLeftStyle.addEventListener("click", handleDropdownClick);
dropdownBtnRightStyle.addEventListener("click", handleDropdownClick);

const apiKey = 'AIzaSyDbiyGIuxgyxf_7lIyO1UcltB7Ikbq1gWE';

async function translateText(text, sourceLang, targetLang) {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${encodeURIComponent(text)}&source=${sourceLang}&target=${targetLang}`;
    
    try {
        const response = await fetch(url, { method: 'POST' });
        const data = await response.json();
        return data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Error:', error);
        return '';
    }
}