import { keyArr } from "./keyArr.js";

export function shiftToggle() {
  for (let i = 0; i < keyArr.length; i++) {
    if (keyArr[i][0].slice(0, 3) == "Key") {
      let keyKey = document.querySelector(`.${keyArr[i][0]}`);
      if (keyKey.querySelector(".rus").classList.contains("hidden")) {
        keyKey
          .querySelector(".eng")
          .querySelector(".caseUp")
          .classList.toggle("hidden");
        keyKey
          .querySelector(".eng")
          .querySelector(".caseDown")
          .classList.toggle("hidden");
      }
      //
      else if (keyKey.querySelector(".eng").classList.contains("hidden")) {
        keyKey
          .querySelector(".rus")
          .querySelector(".caseUp")
          .classList.toggle("hidden");
        keyKey
          .querySelector(".rus")
          .querySelector(".caseDown")
          .classList.toggle("hidden");
      }
    }
  }
}
