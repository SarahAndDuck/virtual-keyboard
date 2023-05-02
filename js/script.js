import { keyArr } from "./keyArr.js";
import { buildkeyboard } from "./buildKeyboard.js";
import { switchLanguage } from "./switchLanguage.js";
import { capsToggle } from "./capsToggle.js";
import { shiftToggle } from "./shiftToggle.js";
/**
 * Рисуем секцию для клавиатуры
 */
let section = document.createElement("section");
section.classList.add("container");
section.insertAdjacentHTML(
  "afterbegin",
  `<h1 class="title">Виртуальная клавиатура</h1>
    <textarea class="textarea" id="textarea" rows="5" cols="50"> </textarea>
    <div class="keyboard" id="keyboard"></div>
    <p class="description">
      Клавиатура создана в операционной системе Windows
    </p>
    <p class="language">
      Для переключения языка нажмите: ctrl + alt
    </p>`
);
document.body.append(section);
// прорисовка самой клавиатуры
buildkeyboard();

let keyboard = document.querySelector(".keyboard");

let textarea = document.querySelector(".textarea");
textarea.textContent = "";
textarea.focus();
let isSift = false;
// клавиша Caps не нажата
let isCapsPressed = false;

function keyClick(keyValue) {
  let selectionStart = textarea.selectionStart;
  // CapsLock
  if (keyValue == `Caps Lock` || keyValue == "CapsLock") {
    isCapsPressed = !isCapsPressed;
    capsToggle(isCapsPressed, isSift);
  }
  //Backspace
  else if (keyValue == "Backspace") {
    let removed = textarea.textContent.split("");
    removed.splice(selectionStart - 1, 1);
    textarea.textContent = removed.join("");
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = selectionStart - 1;
  }
  //Tab
  else if (keyValue == "Tab") {
    textarea.textContent += "\t";
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
  }
  //Space
  else if (keyValue == "Space" || keyValue == "") {
    textarea.textContent += " ";
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
  }
  //Delete
  else if (keyValue == "Delete" || keyValue == "Del") {
    let removed = textarea.textContent.split("");
    removed.splice(selectionStart, 1);
    textarea.textContent = removed.join("");
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = selectionStart;
  }
  //
  else if (keyValue == "Enter") {
    let removedStart = textarea.textContent.split("");
    let removedEnd = textarea.textContent.split("");

    removedStart.splice(selectionStart, textarea.textContent.length - 1);
    removedEnd.splice(0, selectionStart);

    textarea.textContent = removedStart.join("") + "\n" + removedEnd.join("");
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
  }
  //  при нажатии shift
  else if (
    keyValue == "ShiftRight" ||
    keyValue == "ShiftLeft" ||
    keyValue == "Shift"
  ) {
    isSift = !isSift;
    shiftToggle();
  }
  //ArrowLeft
  else if (keyValue == "ArrowLeft" || keyValue == "◄") {
    if (selectionStart == 0) {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = 0;
    } else {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = selectionStart - 1;
    }
  }
  //ArrowRight
  else if (keyValue == "ArrowRight" || keyValue == "►") {
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
  }
  //ArrowUp
  else if (keyValue == "ArrowUp" || keyValue == "▲") {
    textarea.textContent += "▲";
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd =
      textarea.textContent.length;
  }
  //ArrowDown
  else if (keyValue == "ArrowDown" || keyValue == "▼") {
    textarea.textContent += "▼";
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd =
      textarea.textContent.length;
  }
  //
  else {
    for (let i = 0; i < keyArr.length; i++) {
      if (
        keyValue == keyArr[i][0] ||
        (keyArr[i].flat().includes(keyValue) &&
          keyValue !== "CapsLock" &&
          keyValue !== "ShiftLeft" &&
          keyValue !== "ShiftRight" &&
          keyValue !== "Shift")
      ) {
        let keyEngRegCapsValue = keyArr[i][2] ? keyArr[i][2] : keyArr[i][1];
        let keyRusRegCapsValue = keyArr[i][3] ? keyArr[i][3] : keyArr[i][1];
        let keyRusRegValue = keyArr[i][4] ? keyArr[i][4] : keyArr[i][1];

        let keyKey = document.querySelector(`.${keyArr[i][0]}`);

        if (
          (!isCapsPressed &&
            !isSift &&
            keyKey.querySelector(".rus").classList.contains("hidden")) ||
          (isCapsPressed &&
            isSift &&
            keyKey.querySelector(".rus").classList.contains("hidden"))
        )
          textarea.textContent += keyArr[i][1];
        else if (
          (isCapsPressed &&
            keyKey.querySelector(".rus").classList.contains("hidden")) ||
          (!isCapsPressed &&
            isSift &&
            keyKey.querySelector(".rus").classList.contains("hidden"))
        ) {
          textarea.textContent += keyEngRegCapsValue;
        } else if (
          (!isCapsPressed &&
            !isSift &&
            keyKey.querySelector(".eng").classList.contains("hidden")) ||
          (isCapsPressed &&
            isSift &&
            keyKey.querySelector(".eng").classList.contains("hidden"))
        )
          textarea.textContent += keyRusRegValue;
        else if (
          isCapsPressed &&
          keyKey.querySelector(".eng").classList.contains("hidden")
        )
          textarea.textContent += keyRusRegCapsValue;
      }
    }
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd =
      textarea.textContent.length;
  }
}
function virtKeyboardClickHandler(e) {
  // нажатая клавиша на вирт клавиатуре
  keyClick(e.target.textContent);
}
function virtKeyboardMousedownHandler(e) {
  if (e.target.textContent == "Shift") {
    isSift = !isSift;
    shiftToggle();
  }
}

function keydownHandler(e) {
  e.preventDefault();

  // при нажатии подсветка на виртуальной клавиатуре
  for (let i = 0; i < keyArr.length; i++)
    if (e.code == keyArr[i][0] && e.code !== "CapsLock") {
      document.querySelector("." + keyArr[i][0]).classList.add("active");
    }

  // при нажатии ctr + Alt переключить язык
  if ((e.code == "AltLeft" || e.code == "AltRight") && e.ctrlKey) {
    switchLanguage(isCapsPressed);
  } else keyClick(e.code);
}

// обработчик событий для кажной клавиши на виртуальной клавиатуре
keyboard.addEventListener("click", virtKeyboardClickHandler);
keyboard.addEventListener("mousedown", virtKeyboardMousedownHandler);

document.addEventListener("keydown", keydownHandler);

document.addEventListener("keyup", function (e) {
  if (e.code == "ShiftRight" || e.code == "ShiftLeft") {
    isSift = !isSift;
    shiftToggle();
  }
  for (let i = 0; i < keyArr.length; i++)
    if (e.code == keyArr[i][0] && e.code !== "CapsLock") {
      document.querySelector("." + keyArr[i][0]).classList.remove("active");
    }
});
