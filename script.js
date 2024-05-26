const languageTopBar = document.querySelector(".language");
const languageLeft = document.getElementById("language-left");
const englishBtn = document.getElementById("english");
const frenchBtn = document.getElementById("french");
const dropdownLeft = document.getElementById("dropdown");

const numberCountInput = document.getElementById("input-count");
const translateBtn = document.getElementById("translate-btn");
const switchContainer = document.getElementById("switch-container");

const languageRight = document.getElementById("language-right");
const englishBtnSecondContainer = document.getElementById("english-right");
const frenchhBtnSecondContainer = document.getElementById("french-right");
const dropdownRight = document.getElementById("dropdown-right");
const textareaRight = document.getElementById("text-area-right");

//Button Language style
function applyButtonStyles(button) {
    button.style.color = "#F9FAFB";
    button.style.backgroundColor = "#4D5562";
    button.style.padding = "10px";
    button.style.borderRadius = "10px";
}

function removeButtonStyles(button) {
    button.style.color = "";
    button.style.backgroundColor = "";
    button.style.padding = "";
    button.style.borderRadius = "";
}

//Left Container
frenchBtn.addEventListener("click", french);
englishBtn.addEventListener("click", english);
dropdownLeft.addEventListener("click", dropDownSpanish);

//Very good, French and english are seprate from the dropdown menu. 
function french() {
    applyButtonStyles(frenchBtn);
    removeButtonStyles(englishBtn);
    removeButtonStyles(dropdownLeft);
}

function english() {
    applyButtonStyles(englishBtn);
    removeButtonStyles(frenchBtn);
    removeButtonStyles(dropdownLeft);
}

function dropDownSpanish(){
    applyButtonStyles(dropdownLeft);
    removeButtonStyles(englishBtn);
    removeButtonStyles(frenchBtn);
}

//Right Container
englishBtnSecondContainer.addEventListener("click", englishRightContainer)
frenchhBtnSecondContainer.addEventListener("click", frenchRightContainer)
dropdownRight.addEventListener("click", dropwDownSpanishRightContainer)

//(1)
function frenchRightContainer(){
    applyButtonStyles(frenchhBtnSecondContainer);
    removeButtonStyles(englishBtnSecondContainer);
    removeButtonStyles(dropdownRight);
}

function englishRightContainer(){
    applyButtonStyles(englishBtnSecondContainer);
    removeButtonStyles(frenchhBtnSecondContainer);
    removeButtonStyles(dropdownRight);
}

function dropwDownSpanishRightContainer(){
    applyButtonStyles(dropdownRight);
    removeButtonStyles(englishBtnSecondContainer);
    removeButtonStyles(frenchhBtnSecondContainer);
}

//This is good, we want to use the language-left as an event listener so we can target all languages. 
let sourceLanguage = '';

languageLeft.addEventListener('click', (event) => {
    const target = event.target;

    if (target.tagName === 'SPAN') {
        // Handle span click
        sourceLanguage = target.getAttribute("data-lang"); 
        textareaLeft.removeAttribute('disabled');
        console.log(`Selected language: ${sourceLanguage}`);
    }
    if (target.tagName === 'OPTION') {
        // Handle dropdown option select
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

let targetLanguage = '';

languageRight.addEventListener('click', (event) => {
    const target = event.target;

    if (target.tagName === 'SPAN') {
        // Handle span click
        targetLanguage = target.getAttribute("data-lang"); 
        console.log(`Selected language: ${targetLanguage}`);
    }
    if (target.tagName === 'OPTION') {
        // Handle dropdown option select
        targetLanguage = target.value;
        console.log(`Selected language: ${targetLanguage}`);
    }
});

languageRight.addEventListener('change', (event) => {
    if (event.target.tagName === 'SELECT') {
         targetLanguage = event.target.value;
        console.log(`Selected language: ${targetLanguage}`);
    }
});

const textareaLeft = document.getElementById("text-area");
textareaLeft.addEventListener('input', () => {
    if (languageLeft.value && languageRight.value) {
        textareaLeft.value = textareaRight.value; 
    }

});

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
