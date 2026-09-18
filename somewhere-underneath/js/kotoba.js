/* =========================================================
   ARCHIVE 05 / ことば
   ========================================================= */


/*
   Four translated versions.

   The player is initially told
   that they are consistent.
*/


const languages = {

  en: {

    number: "01",

    name: "ENGLISH",

    sentences: [

      "Some things are easier to leave unsaid.",

      "If nothing is said, nothing needs to be explained.",

      "Eventually, silence becomes another kind of language."

    ]

  },


  zh: {

    number: "02",

    name: "中文",

    sentences: [

      "有些事情不說出口反而比較簡單。",

      "只要什麼都不說，就沒有什麼需要解釋。",

      "到最後，沉默也會成為另一種語言。"

    ]

  },


  ja: {

    number: "03",

    name: "日本語",

    sentences: [

      "言葉にしないほうが簡単なこともある。",

      "何も言わなければ、何も説明する必要はない。",

      "やがて、沈黙もまた一つの言葉になる。"

    ]

  },


  de: {

    number: "04",

    name: "DEUTSCH",

    sentences: [

      "Manche Dinge sind leichter, wenn man sie unausgesprochen lässt.",

      "Wenn nichts gesagt wird, muss nichts erklärt werden.",

      "Schließlich wird auch Schweigen zu einer Art Sprache."

    ]

  }

};



/* =========================================================
   ELEMENTS
   ========================================================= */


const languageItems =
  document.querySelectorAll(
    ".language-item"
  );


const viewerLanguage =
  document.getElementById(
    "viewerLanguage"
  );


const viewerText =
  document.getElementById(
    "viewerText"
  );


const compareButton =
  document.getElementById(
    "compareButton"
  );


const translationStatus =
  document.getElementById(
    "translationStatus"
  );


const statusMessage =
  document.getElementById(
    "statusMessage"
  );


const bottomStatus =
  document.getElementById(
    "bottomStatus"
  );



/* overlays */


const compareSelectOverlay =
  document.getElementById(
    "compareSelectOverlay"
  );


const compareLanguageOptions =
  document.getElementById(
    "compareLanguageOptions"
  );


const cancelCompare =
  document.getElementById(
    "cancelCompare"
  );


const comparisonOverlay =
  document.getElementById(
    "comparisonOverlay"
  );


const comparisonLeftName =
  document.getElementById(
    "comparisonLeftName"
  );


const comparisonRightName =
  document.getElementById(
    "comparisonRightName"
  );


const comparisonBody =
  document.getElementById(
    "comparisonBody"
  );


const comparisonResult =
  document.getElementById(
    "comparisonResult"
  );


const closeComparison =
  document.getElementById(
    "closeComparison"
  );


const indexOverlay =
  document.getElementById(
    "indexOverlay"
  );


const indexLeft =
  document.getElementById(
    "indexLeft"
  );


const indexRight =
  document.getElementById(
    "indexRight"
  );


const indexSubmit =
  document.getElementById(
    "indexSubmit"
  );


const indexResponse =
  document.getElementById(
    "indexResponse"
  );


const indexClose =
  document.getElementById(
    "indexClose"
  );


const sentenceOverlay =
  document.getElementById(
    "sentenceOverlay"
  );


const translateButton =
  document.getElementById(
    "translateButton"
  );


const translationResponse =
  document.getElementById(
    "translationResponse"
  );


const restoreOverlay =
  document.getElementById(
    "restoreOverlay"
  );


const restoreButton =
  document.getElementById(
    "restoreButton"
  );


const ignoreButton =
  document.getElementById(
    "ignoreButton"
  );


const sourceOverlay =
  document.getElementById(
    "sourceOverlay"
  );


const sourceVersions =
  document.getElementById(
    "sourceVersions"
  );


const sourceEight =
  document.getElementById(
    "sourceEight"
  );


const sourceMessage =
  document.getElementById(
    "sourceMessage"
  );


const kotobaCompletion =
  document.getElementById(
    "kotobaCompletion"
  );



/* =========================================================
   STATE
   ========================================================= */


let selectedLanguage = null;

let comparisonLeft = null;

let comparisonRight = null;

let sourceRecovered = false;

let completing = false;



/* =========================================================
   LANGUAGE VIEWER
   ========================================================= */


languageItems.forEach(
  item => {


    item.addEventListener(
      "click",
      () => {


        if (
          completing
        ) {
          return;
        }


        const language =
          item.dataset.language;


        openLanguage(
          language
        );


      }
    );


  }
);



function openLanguage(
  language
) {


  selectedLanguage =
    language;


  const data =
    languages[
      language
    ];


  /*
     Active state.
  */


  languageItems.forEach(
    item => {


      item.classList.toggle(
        "active",
        item.dataset.language ===
        language
      );


    }
  );


  /*
     Fade old text.
  */


  viewerText.classList.remove(
    "visible"
  );


  compareButton.classList.remove(
    "visible"
  );


  setTimeout(
    () => {


      viewerLanguage.textContent =
        `${data.number} / ${data.name}`;


      viewerText.innerHTML =
        data.sentences
          .map(
            sentence =>
              `<p>${sentence}</p>`
          )
          .join("");


      viewerText.classList.add(
        "visible"
      );


      compareButton.classList.add(
        "visible"
      );


    },

    250
  );


}



/* =========================================================
   OPEN COMPARE SELECTION
   ========================================================= */


compareButton.addEventListener(
  "click",
  () => {


    if (
      !selectedLanguage
    ) {
      return;
    }


    comparisonLeft =
      selectedLanguage;


    buildCompareOptions();


    compareSelectOverlay.classList.add(
      "visible"
    );


  }
);



function buildCompareOptions() {


  compareLanguageOptions.innerHTML =
    "";


  Object.keys(
    languages
  ).forEach(
    key => {


      if (
        key ===
        comparisonLeft
      ) {
        return;
      }


      const data =
        languages[
          key
        ];


      const button =
        document.createElement(
          "button"
        );


      button.textContent =
        `${data.number} / ${data.name}`;


      button.addEventListener(
        "click",
        () => {


          comparisonRight =
            key;


          compareSelectOverlay.classList.remove(
            "visible"
          );


          setTimeout(
            () => {

              openComparison(
                comparisonLeft,
                comparisonRight
              );

            },

            350
          );


        }
      );


      compareLanguageOptions.appendChild(
        button
      );


    }
  );


}



cancelCompare.addEventListener(
  "click",
  () => {


    compareSelectOverlay.classList.remove(
      "visible"
    );


  }
);



/* =========================================================
   OPEN COMPARISON
   ========================================================= */


function openComparison(
  left,
  right
) {


  const leftData =
    languages[
      left
    ];


  const rightData =
    languages[
      right
    ];


  comparisonLeftName.textContent =
    `${leftData.number} / ${leftData.name}`;


  comparisonRightName.textContent =
    `${rightData.number} / ${rightData.name}`;


  comparisonBody.innerHTML =
    "";


  /*
     Any comparison involving
     German contains the missing
     alignment.

     This avoids making German
     visually suspicious before
     the player actually compares it.
  */


  const containsGerman =
    left === "de" ||
    right === "de";


  /*
     First two normal rows.
  */


  createAlignmentRow(
    leftData.sentences[0],
    rightData.sentences[0]
  );


  createAlignmentRow(
    leftData.sentences[1],
    rightData.sentences[1]
  );


  /*
     Missing source position.

     Only appears when DEUTSCH
     is one side of the comparison.
  */


  if (
    containsGerman &&
    !sourceRecovered
  ) {


    createMissingRow();


  }


  /*
     Final normal row.
  */


  createAlignmentRow(
    leftData.sentences[2],
    rightData.sentences[2]
  );


  comparisonResult.textContent =
    "ALIGNMENT COMPLETE";


  comparisonOverlay.classList.add(
    "visible"
  );


}



/* =========================================================
   NORMAL ALIGNMENT ROW
   ========================================================= */


function createAlignmentRow(
  leftText,
  rightText
) {


  const row =
    document.createElement(
      "div"
    );


  row.className =
    "alignment-row";


  const left =
    document.createElement(
      "div"
    );


  left.className =
    "alignment-text left";


  left.textContent =
    leftText;


  const line =
    document.createElement(
      "div"
    );


  line.className =
    "alignment-line";


  const right =
    document.createElement(
      "div"
    );


  right.className =
    "alignment-text right";


  right.textContent =
    rightText;


  row.appendChild(
    left
  );


  row.appendChild(
    line
  );


  row.appendChild(
    right
  );


  comparisonBody.appendChild(
    row
  );


}



/* =========================================================
   MISSING ROW
   ========================================================= */


function createMissingRow() {


  const row =
    document.createElement(
      "div"
    );


  row.className =
    "alignment-row missing";


  const left =
    document.createElement(
      "div"
    );


  left.className =
    "missing-marker";


  left.textContent =
    "—";


  const line =
    document.createElement(
      "div"
    );


  line.className =
    "alignment-line";


  line.title =
    "";


  const right =
    document.createElement(
      "div"
    );


  right.className =
    "missing-marker";


  right.textContent =
    "—";


  /*
     Clicking the empty alignment
     requests an index.
  */


  line.addEventListener(
    "click",
    openIndexPrompt
  );


  row.appendChild(
    left
  );


  row.appendChild(
    line
  );


  row.appendChild(
    right
  );


  comparisonBody.appendChild(
    row
  );


}



/* =========================================================
   CLOSE COMPARISON
   ========================================================= */


closeComparison.addEventListener(
  "click",
  () => {


    comparisonOverlay.classList.remove(
      "visible"
    );


  }
);



/* =========================================================
   INDEX PROMPT
   ========================================================= */


function openIndexPrompt() {


  indexLeft.value =
    "";


  indexRight.value =
    "";


  indexResponse.textContent =
    "";


  indexOverlay.classList.add(
    "visible"
  );


  setTimeout(
    () => {

      indexLeft.focus();

    },

    400
  );


}



/* =========================================================
   AUTO MOVE BETWEEN INPUTS
   ========================================================= */


indexLeft.addEventListener(
  "input",
  () => {


    indexLeft.value =
      indexLeft.value
        .replace(
          /\D/g,
          ""
        )
        .slice(
          0,
          2
        );


    if (
      indexLeft.value.length === 2
    ) {

      indexRight.focus();

    }


  }
);


indexRight.addEventListener(
  "input",
  () => {


    indexRight.value =
      indexRight.value
        .replace(
          /\D/g,
          ""
        )
        .slice(
          0,
          2
        );


  }
);



/* =========================================================
   ENTER KEY
   ========================================================= */


indexLeft.addEventListener(
  "keydown",
  event => {


    if (
      event.key ===
      "Enter"
    ) {

      verifyIndex();

    }


  }
);


indexRight.addEventListener(
  "keydown",
  event => {


    if (
      event.key ===
      "Enter"
    ) {

      verifyIndex();

    }


  }
);



/* =========================================================
   VERIFY INDEX
   ========================================================= */


indexSubmit.addEventListener(
  "click",
  verifyIndex
);



function verifyIndex() {


  const left =
    indexLeft.value.padStart(
      2,
      "0"
    );


  const right =
    indexRight.value.padStart(
      2,
      "0"
    );


  /*
     Archive 04 taught:

     04 / 08

     04 = DEUTSCH
     08 = hidden source position
  */


  if (
    left === "04" &&
    right === "08"
  ) {


    indexResponse.textContent =
      "INDEX ACCEPTED";


    setTimeout(
      () => {


        indexResponse.textContent =
          "SOURCE POSITION 08";


      },

      900
    );


    setTimeout(
      revealSentence,
      1900
    );


    return;

  }


  indexResponse.textContent =
    "INDEX NOT FOUND";


}



/* =========================================================
   CANCEL INDEX
   ========================================================= */


indexClose.addEventListener(
  "click",
  () => {


    indexOverlay.classList.remove(
      "visible"
    );


  }
);



/* =========================================================
   REVEAL SENTENCE
   ========================================================= */


function revealSentence() {


  indexOverlay.classList.remove(
    "visible"
  );


  comparisonOverlay.classList.remove(
    "visible"
  );


  translationStatus.textContent =
    "INCOMPLETE";


  statusMessage.textContent =
    "1 UNALIGNED RECORD";


  statusMessage.classList.add(
    "visible"
  );


  bottomStatus.textContent =
    "SOURCE POSITION 08 RECOVERED";


  setTimeout(
    () => {


      sentenceOverlay.classList.add(
        "visible"
      );


    },

    500
  );


}



/* =========================================================
   TRANSLATE
   ========================================================= */


translateButton.addEventListener(
  "click",
  () => {


    if (
      sourceRecovered
    ) {
      return;
    }


    translateButton.disabled =
      true;


    translationResponse.textContent =
      "TRANSLATION UNAVAILABLE";


    setTimeout(
      () => {


        translationResponse.innerHTML =
          "TRANSLATION UNAVAILABLE<br>SOURCE LANGUAGE UNKNOWN";


      },

      1500
    );


    setTimeout(
      () => {


        sentenceOverlay.classList.remove(
          "visible"
        );


        restoreOverlay.classList.add(
          "visible"
        );


      },

      3500
    );


  }
);



/* =========================================================
   IGNORE
   ========================================================= */


ignoreButton.addEventListener(
  "click",
  () => {


    restoreOverlay.classList.remove(
      "visible"
    );


    /*
       The archive returns to its
       comfortable lie.
    */


    translationStatus.textContent =
      "CONSISTENT";


    statusMessage.textContent =
      "NO DISCREPANCY DETECTED";


    bottomStatus.textContent =
      "4 VERSIONS VERIFIED";


    setTimeout(
      () => {


        statusMessage.classList.remove(
          "visible"
        );


      },

      2200
    );


    /*
       Allow the player to discover
       it again.
    */


    translateButton.disabled =
      false;


    translationResponse.textContent =
      "";


  }
);



/* =========================================================
   RESTORE
   ========================================================= */


restoreButton.addEventListener(
  "click",
  () => {


    if (
      completing
    ) {
      return;
    }


    completing =
      true;


    sourceRecovered =
      true;


    restoreOverlay.classList.remove(
      "visible"
    );


    /*
       Archive 05 complete.
    */


    localStorage.setItem(
      "archive05",
      "complete"
    );


    setTimeout(
      beginSourceReveal,
      700
    );


  }
);



/* =========================================================
   SOURCE REVEAL
   ========================================================= */


function beginSourceReveal() {


  sourceOverlay.classList.add(
    "visible"
  );


  /*
     Four translations remain
     visible for a moment.
  */


  setTimeout(
    () => {


      sourceVersions.style.opacity =
        "0.25";


    },

    1700
  );


  /*
     SOURCE 08 appears.
  */


  setTimeout(
    () => {


      sourceEight.classList.add(
        "visible"
      );


    },

    3000
  );


  /*
     Remove translations.
  */


  setTimeout(
    () => {


      sourceVersions.style.opacity =
        "0";


    },

    4200
  );


  /*
     First message.
  */


  setTimeout(
    () => {


      sourceMessage.textContent =
        "有些話不存在於任何語言裡。";


      sourceMessage.classList.add(
        "visible"
      );


    },

    5600
  );


  /*
     Fade.
  */


  setTimeout(
    () => {


      sourceMessage.classList.remove(
        "visible"
      );


    },

    8200
  );


  /*
     Second message.
  */


  setTimeout(
    () => {


      sourceMessage.textContent =
        "但不代表它沒有被說過。";


      sourceMessage.classList.add(
        "visible"
      );


    },

    9300
  );


  /*
     Fade.
  */


  setTimeout(
    () => {


      sourceMessage.classList.remove(
        "visible"
      );


    },

    11900
  );


  /*
     Completion.
  */


  setTimeout(
    () => {


      sourceOverlay.classList.remove(
        "visible"
      );


      showCompletion();


    },

    13100
  );


}



/* =========================================================
   COMPLETION
   ========================================================= */


function showCompletion() {


  const completionTop =
    document.getElementById(
      "completionTop"
    );


  const completionMain =
    document.getElementById(
      "completionMain"
    );


  const completionSource =
    document.getElementById(
      "completionSource"
    );


  const completionAccess =
    document.getElementById(
      "completionAccess"
    );


  kotobaCompletion.classList.add(
    "visible"
  );


  setTimeout(
    () => {


      completionTop.textContent =
        "ARCHIVE 05 / COMPLETE";


    },

    900
  );


  setTimeout(
    () => {


      completionMain.textContent =
        "SOURCE 08 / RESTORED";


    },

    2400
  );


  setTimeout(
    () => {


      completionSource.textContent =
        "LANGUAGE / NULL";


    },

    3900
  );


  setTimeout(
    () => {


      completionAccess.textContent =
        "ARCHIVE 06 / ACCESS RESTORED";


    },

    5500
  );


  setTimeout(
    () => {


      window.location.href =
        "../index.html#archive";


    },

    7800
  );


}