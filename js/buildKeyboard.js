import { keyArr } from "./keyArr.js";

export function buildkeyboard() {
  let startRow, endRow;

  for (let j = 0; j < 5; j++) {
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    divRow.classList.add("keyboard--row");
    document.querySelector(".keyboard").append(divRow);
    let a = ``;

    switch (j) {
      case 0:
        startRow = 0;
        endRow = 14;
        break;
      case 1:
        startRow = 14;
        endRow = 29;
        break;
      case 2:
        startRow = 29;
        endRow = 42;
        break;
      case 3:
        startRow = 42;
        endRow = 55;
        break;
      default:
        startRow = 55;
        endRow = 64;
    }
    for (let i = startRow; i < endRow; i++) {
      let divKey = document.createElement("div");
      divKey.classList.add("keyboard--key");
      divKey.classList.add("key");
      divKey.classList.add(keyArr[i][0]);
      // для одинакового значения
      let keyEngRegCapsValue, keyRusRegCapsValue, keyRusRegValue;

      keyEngRegCapsValue = keyArr[i][2] ? keyArr[i][2] : keyArr[i][1];
      keyRusRegCapsValue = keyArr[i][3] ? keyArr[i][3] : keyArr[i][1];
      keyRusRegValue = keyArr[i][4] ? keyArr[i][4] : keyArr[i][1];

      a = `
        <span class="eng">
            <span class="caseDown">${keyArr[i][1]}</span>
            <span class="caseUp hidden">${keyEngRegCapsValue}</span>
            <span class="caps hidden">${keyEngRegCapsValue}</span>
            <span class="shiftCaps hidden">${keyArr[i][1]} </span> 
         </span>
         <span class="rus hidden">
            <span class="caseDown hidden">${keyRusRegValue}</span> 
            <span class="caseUp hidden">${keyRusRegCapsValue}</span>
            <span class="caps hidden">${keyRusRegCapsValue}</span>
            <span class="shiftCaps hidden">${keyRusRegValue}</span>
            </span>
        `;
      divKey.insertAdjacentHTML("afterbegin", a);

      divRow.append(divKey);
    }
  }
}
