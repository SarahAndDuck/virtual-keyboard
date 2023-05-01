import { capsToggle } from "./capsToggle.js";

export function switchLanguage(isCapsPressed) {
  let classItem = "";
  if (isCapsPressed) {
    classItem = ".caseUp";
  } else classItem = ".caseDown";

  let eng = document.querySelectorAll(".eng");
  let rus = document.querySelectorAll(".rus");

  eng.forEach((item) => item.classList.toggle("hidden"));
  rus.forEach((item) => item.classList.toggle("hidden"));

  eng.forEach((item) => {
    item
      .querySelectorAll(classItem)
      .forEach((item) => item.classList.toggle("hidden"));
  });

  rus.forEach((item) => {
    item
      .querySelectorAll(classItem)
      .forEach((item) => item.classList.toggle("hidden"));
  });
}
