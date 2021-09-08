const languagePrevButton = document.querySelector(".carousel-control-prev");
const languageNextButton = document.querySelector(".carousel-control-next");
const languages = ["js", "html", "css", "python", "java", "c", "sql", "vba"];
let languageIndex = 0;
let prevIndex;

function changeStyles() {
  // Changing primary classes
  const primaryItems = document.querySelectorAll(
    `.${languages[prevIndex]}-primary`
  );
  primaryItems.forEach((item) => {
    console.log(item);
    item.classList.add(`${languages[languageIndex]}-primary`);
    item.classList.remove(`${languages[prevIndex]}-primary`);
  });

  // Changing secondary classes
  const secondaryItems = document.querySelectorAll(
    `.${languages[prevIndex]}-secondary`
  );
  secondaryItems.forEach((item) => {
    console.log(item);
    item.classList.add(`${languages[languageIndex]}-secondary`);
    item.classList.remove(`${languages[prevIndex]}-secondary`);
  });
}

languageNextButton.addEventListener("click", function () {
  console.log("Testing");
  prevIndex = languageIndex;
  languageIndex =
    languageIndex === languages.length - 1 ? 0 : languageIndex + 1;
  changeStyles(prevIndex);
});

languagePrevButton.addEventListener("click", function () {
  prevIndex = languageIndex;
  languageIndex =
    languageIndex === 0 ? languages.length - 1 : languageIndex - 1;
  changeStyles(prevIndex);
});
