/* =========================================================
   SOURCE 08
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const sourceLabel =
  document.getElementById("sourceLabel");

const stageOne =
  document.getElementById("stageOne");

const stageTwo =
  document.getElementById("stageTwo");

const stageThree =
  document.getElementById("stageThree");

const stageFour =
  document.getElementById("stageFour");


const missingPosition =
  document.getElementById("missingPosition");

const systemLine =
  document.getElementById("systemLine");


const instructionRecords =
  document.getElementById("instructionRecords");

const instructionDate =
  document.getElementById("instructionDate");

const instructionDateValue =
  document.getElementById("instructionDateValue");

const instructionFixed =
  document.getElementById("instructionFixed");

const instructionLeft =
  document.getElementById("instructionLeft");


const indexResult =
  document.getElementById("indexResult");

const positionState =
  document.getElementById("positionState");

const positionStatus =
  document.getElementById("positionStatus");


const leftEdge =
  document.getElementById("leftEdge");


const recoverContent =
  document.getElementById("recoverContent");

const recoverMessage =
  document.getElementById("recoverMessage");

const contentStatus =
  document.getElementById("contentStatus");

const sourceRedDot =
  document.getElementById("sourceRedDot");


const terminal =
  document.getElementById("terminal");

const terminalInput =
  document.getElementById("terminalInput");

const terminalHistory =
  document.getElementById("terminalHistory");


const finalState =
  document.getElementById("finalState");

const finalInput =
  document.getElementById("finalInput");

const finalAnswer =
  document.getElementById("finalAnswer");

const theEnd =
  document.getElementById("theEnd");


/* =========================================================
   STATE
   ========================================================= */

let positionRecovered = false;

let indexRecovered = false;

let fixedRecovered = false;

let leftSelected = false;

let leftRecovered = false;

let referenceRequested = false;

let referenceRecovered = false;

let finalResolved = false;

let dateStep = 0;


/* =========================================================
   INITIAL
   ========================================================= */

setTimeout(
  () => {

    if (stageOne) {

      stageOne.classList.add(
        "active"
      );

    }

  },

  1300
);


/* =========================================================
   STAGE 01
   NORMAL RECORDS
   ========================================================= */

document
  .querySelectorAll(".source-record")
  .forEach(
    record => {

      record.addEventListener(
        "click",
        () => {

          if (
            positionRecovered
          ) {
            return;
          }


          if (!systemLine) {
            return;
          }


          systemLine.textContent =
            "POSITION VERIFIED";


          setTimeout(
            () => {

              if (
                !positionRecovered
              ) {

                systemLine.textContent =
                  "Everything is where it should be.";

              }

            },

            1100
          );

        }
      );

    }
  );


/* =========================================================
   STAGE 01
   MISSING POSITION
   ========================================================= */

if (missingPosition) {

  missingPosition.addEventListener(
    "click",
    () => {

      if (
        positionRecovered
      ) {
        return;
      }


      positionRecovered = true;


      if (systemLine) {

        systemLine.textContent =
          "Except one.";

      }


      /*
         Stage 01 fades away.
      */

      setTimeout(
        () => {

          if (stageOne) {

            stageOne.classList.remove(
              "active"
            );

          }

        },

        1200
      );


      /*
         Reveal 08.
      */

      setTimeout(
        () => {

          if (stageTwo) {

            stageTwo.classList.add(
              "active"
            );

          }

        },

        2300
      );

    }
  );

}


/* =========================================================
   STAGE 02
   INDEX

   04.08
      ↓
   04:08
      ↓
   04 / 08
      ↓
   04 → 08
   ========================================================= */

if (instructionDate) {

  instructionDate.addEventListener(
    "click",
    () => {

      if (
        indexRecovered
      ) {
        return;
      }


      dateStep++;


      /* -----------------------------------------
         STEP 01
         ----------------------------------------- */

      if (
        dateStep === 1
      ) {

        instructionDateValue.textContent =
          "04:08";


        indexResult.textContent =
          "FORMAT";


        return;

      }


      /* -----------------------------------------
         STEP 02
         ----------------------------------------- */

      if (
        dateStep === 2
      ) {

        instructionDateValue.textContent =
          "04 / 08";


        instructionDate.classList.add(
          "index-recovered"
        );


        indexResult.textContent =
          "INDEX";


        return;

      }


      /* -----------------------------------------
         STEP 03
         ----------------------------------------- */

      if (
        dateStep >= 3
      ) {

        indexRecovered = true;


        instructionDateValue.textContent =
          "04 / 08";


        instructionDate.classList.add(
          "index-recovered"
        );


        indexResult.textContent =
          "04 → 08";


        if (positionState) {

          positionState.textContent =
            "04 / 08";

        }


        if (positionStatus) {

          positionStatus.textContent =
            "INDEXED";

        }


        /*
           Begin movement.
        */

        setTimeout(
          startDrift,
          1100
        );

      }

    }
  );

}


/* =========================================================
   DRIFT

   Everything moves.

   Except one.
   ========================================================= */

function startDrift() {

  if (
    !indexRecovered ||
    fixedRecovered
  ) {
    return;
  }


  if (instructionRecords) {

    instructionRecords.classList.add(
      "drifting"
    );

  }


  if (indexResult) {

    indexResult.textContent =
      "";

  }

}


/* =========================================================
   FIXED

   Polaris rule.
   ========================================================= */

if (instructionFixed) {

  instructionFixed.addEventListener(
    "click",
    () => {

      if (
        !indexRecovered ||
        fixedRecovered
      ) {
        return;
      }


      fixedRecovered = true;


      /*
         Stop movement.
      */

      if (instructionRecords) {

        instructionRecords.classList.remove(
          "drifting"
        );


        /*
           Everything except LEFT
           becomes secondary.
        */

        instructionRecords.classList.add(
          "fixed-resolved"
        );

      }


      if (indexResult) {

        indexResult.textContent =
          "FIXED → 08";

      }


      if (positionState) {

        positionState.textContent =
          "FIXED";

      }


      if (positionStatus) {

        positionStatus.textContent =
          "INDEXED";

      }

    }
  );

}


/* =========================================================
   LEFT

   LEFT is not the answer.

   LEFT is an instruction.
   ========================================================= */

if (instructionLeft) {

  instructionLeft.addEventListener(
    "click",
    () => {

      if (
        !fixedRecovered ||
        leftRecovered ||
        leftSelected
      ) {
        return;
      }


      leftSelected = true;


      if (instructionRecords) {

        instructionRecords.classList.add(
          "left-selected"
        );

      }


      if (indexResult) {

        indexResult.textContent =
          "LEFT";

      }


      /*
         Reveal a subtle physical trace
         on the left side of the viewport.
      */

      setTimeout(
        () => {

          if (
            leftRecovered
          ) {
            return;
          }


          if (leftEdge) {

            leftEdge.classList.add(
              "available"
            );

          }

        },

        550
      );

    }
  );

}


/* =========================================================
   PHYSICAL LEFT EDGE
   ========================================================= */

if (leftEdge) {

  leftEdge.addEventListener(
    "click",
    () => {

      if (
        !fixedRecovered ||
        !leftSelected ||
        leftRecovered
      ) {
        return;
      }


      if (
        !leftEdge.classList.contains(
          "available"
        )
      ) {
        return;
      }


      leftRecovered = true;


      /*
         Disable edge.
      */

      leftEdge.classList.remove(
        "available"
      );


      /*
         Hide instruction layer.
      */

      if (stageTwo) {

        stageTwo.classList.remove(
          "active"
        );

      }


      /*
         Reveal SOURCE 08.
      */

      if (stageThree) {

        stageThree.classList.add(
          "active"
        );


        /*
           Force layout so transition
           starts outside the viewport.
        */

        void stageThree.offsetWidth;


        requestAnimationFrame(
          () => {

            stageThree.classList.add(
              "revealed"
            );

          }
        );

      }

    }
  );

}


/* =========================================================
   STAGE 03
   RECOVER CONTENT
   ========================================================= */

if (recoverContent) {

  recoverContent.addEventListener(
    "click",
    () => {

      if (
        referenceRecovered
      ) {
        return;
      }


      referenceRequested = true;


      if (recoverMessage) {

        recoverMessage.textContent =
          "INSUFFICIENT REFERENCE";

      }


      /*
         The red dot can now
         act as the reference.
      */

      if (sourceRedDot) {

        sourceRedDot.classList.add(
          "reference-ready"
        );

      }

    }
  );

}


/* =========================================================
   RED DOT
   FIXED REFERENCE
   ========================================================= */

if (sourceRedDot) {

  sourceRedDot.addEventListener(
    "click",
    () => {

      if (
        !referenceRequested ||
        referenceRecovered
      ) {
        return;
      }


      referenceRecovered = true;


      if (recoverMessage) {

        recoverMessage.textContent =
          "REFERENCE ACCEPTED";

      }


      if (contentStatus) {

        contentStatus.textContent =
          "RECOVERING";

      }


      sourceRedDot.classList.remove(
        "reference-ready"
      );


      /*
         Recovery complete.
      */

      setTimeout(
        () => {

          if (contentStatus) {

            contentStatus.textContent =
              "RECOVERED";

          }


          if (recoverMessage) {

            recoverMessage.textContent =
              "";

          }

        },

        1200
      );


      /*
         Metadata disappears.
      */

      setTimeout(
        () => {

          if (stageThree) {

            stageThree.classList.remove(
              "active"
            );

          }

        },

        2200
      );


      /*
         Raw source appears.
      */

      setTimeout(
        () => {

          if (stageFour) {

            stageFour.classList.add(
              "active"
            );

          }


          revealFragments();

        },

        3200
      );

    }
  );

}


/* =========================================================
   STAGE 04
   RAW FRAGMENTS
   ========================================================= */

function revealFragments() {

  const fragments =
    document.querySelectorAll(
      ".raw-fragment"
    );


  fragments.forEach(
    (fragment, index) => {

      setTimeout(
        () => {

          fragment.classList.add(
            "recovered"
          );

        },

        700 +
        index * 1250
      );

    }
  );


  /*
     Terminal appears after
     all fragments have surfaced.
  */

  const terminalDelay =
    700 +
    fragments.length * 1250 +
    1400;


  setTimeout(
    () => {

      if (terminal) {

        terminal.classList.add(
          "visible"
        );

      }


      if (terminalInput) {

        terminalInput.focus();

      }

    },

    terminalDelay
  );

}


/* =========================================================
   NORMALISE LANGUAGE
   ========================================================= */

function normalise(text) {

  return text
    .trim()
    .toLowerCase()

    /*
       Remove common punctuation.
    */

    .replace(
      /[.,!?。！？、，；;:："'“”‘’´`]/g,
      ""
    )

    /*
       Collapse whitespace.
    */

    .replace(
      /\s+/g,
      " "
    );

}


/* =========================================================
   ACCEPTED RESPONSES

   LANGUAGE / NULL

   There is no correct language.
   Only the meaning matters.
   ========================================================= */

const stayResponses =
  new Set([


    /* =====================================================
       中文
       ===================================================== */

    "留下",
    "留下來",
    "留下来",

    "別走",
    "别走",
    "不要走",

    "我留下",
    "我會留下",
    "我会留下",

    "我留下來",
    "我留下来",

    "我會留下來",
    "我会留下来",

    "留在這裡",
    "留在这里",

    "我留在這裡",
    "我留在这里",

    "我會留在這裡",
    "我会留在这里",

    "我不走",
    "我不會走",
    "我不会走",


    /* =====================================================
       ENGLISH
       ===================================================== */

    "stay",
    "stay here",
    "please stay",

    "dont leave",
    "do not leave",

    "ill stay",
    "i will stay",

    "im staying",
    "i am staying",

    "ill stay here",
    "i will stay here",

    "im staying here",
    "i am staying here",

    "i wont leave",
    "i will not leave",


    /* =====================================================
       日本語
       ===================================================== */

    "残って",
    "残る",
    "残ります",

    "ここにいて",
    "ここにいる",

    "ここに残る",
    "ここに残ります",

    "行かないで",
    "いかないで",

    "行かない",
    "いかない",

    "私は残る",
    "私は残ります",

    "僕は残る",
    "僕は残ります",

    "俺は残る",
    "俺は残ります",


    /* =====================================================
       DEUTSCH
       ===================================================== */

    "bleib",
    "bleib hier",

    "bitte bleib",
    "bitte bleib hier",

    "geh nicht",
    "gehe nicht",

    "ich bleibe",
    "ich bleib",

    "ich bleibe hier",
    "ich bleib hier",


    /* =====================================================
       FRANÇAIS
       ===================================================== */

    "reste",
    "reste ici",

    "restez",
    "restez ici",

    "ne pars pas",
    "ne partez pas",

    "je reste",
    "je resterai",

    "je reste ici",


    /* =====================================================
       ESPAÑOL
       ===================================================== */

    "quédate",
    "quedate",

    "quédate aquí",
    "quedate aqui",

    "no te vayas",

    "me quedo",
    "me quedaré",

    "me quedo aquí",
    "me quedo aqui",


    /* =====================================================
       ITALIANO
       ===================================================== */

    "rimani",
    "rimani qui",

    "resta",
    "resta qui",

    "non andare",
    "non andare via",

    "io resto",
    "io resto qui",

    "resterò"

  ]);


/* =========================================================
   SEMANTIC MATCH
   ========================================================= */

function meansStay(text) {

  const value =
    normalise(text);


  /*
     Exact known expression.
  */

  if (
    stayResponses.has(value)
  ) {

    return true;

  }


  /*
     Tolerant patterns.

     The ending should not become
     a vocabulary guessing game.
  */

  const patterns = [


    /* Chinese */

    /^我.*留下/,
    /^我.*留在/,
    /^我.*不走/,
    /^我.*不會走/,
    /^我.*不会走/,

    /^留下/,

    /^別走$/,
    /^别走$/,
    /^不要走$/,


    /* English */

    /^stay\b/,
    /^please stay\b/,

    /^i .*stay/,
    /^i .*staying/,

    /^i .*not leave/,
    /^i .*wont leave/,

    /^dont leave/,
    /^do not leave/,


    /* Japanese */

    /残って/,
    /残る/,
    /残ります/,

    /ここにい/,

    /行かない/,
    /いかない/,


    /* German */

    /^bleib/,
    /^ich bleib/,

    /^geh nicht/,
    /^gehe nicht/,


    /* French */

    /^reste/,
    /^je reste/,
    /^je resterai/,

    /^ne pars pas/,
    /^ne partez pas/,


    /* Spanish */

    /^quédate/,
    /^quedate/,

    /^no te vayas/,

    /^me qued/,
    /^me quedar/,


    /* Italian */

    /^rimani/,
    /^resta/,

    /^non andare/,

    /^io resto/,
    /^resterò/

  ];


  return patterns.some(
    pattern =>
      pattern.test(value)
  );

}


/* =========================================================
   TERMINAL
   ========================================================= */

if (terminalInput) {

  terminalInput.addEventListener(
    "keydown",
    event => {

      if (
        event.key !== "Enter" ||
        finalResolved
      ) {
        return;
      }


      const raw =
        terminalInput.value.trim();


      if (!raw) {
        return;
      }


      /*
         Clear input.
      */

      terminalInput.value = "";


      /*
         Meaning accepted.
      */

      if (
        meansStay(raw)
      ) {

        resolveFinal(raw);

        return;

      }


      /*
         Wrong answers are not judged.

         The source simply does not answer.
      */

      if (terminalHistory) {

        const attempt =
          document.createElement(
            "div"
          );


        attempt.textContent =
          `> ${raw}`;


        terminalHistory.appendChild(
          attempt
        );


        /*
           Only retain recent attempts.
        */

        while (
          terminalHistory.children.length >
          4
        ) {

          terminalHistory.removeChild(
            terminalHistory.firstChild
          );

        }

      }

    }
  );

}


/* =========================================================
   FINAL

   PLAYER:
   > 留下

   SOURCE:
   好.

   Then:

   The end.
   ========================================================= */

function resolveFinal(raw) {

  if (
    finalResolved
  ) {
    return;
  }


  finalResolved = true;


  /*
     SOURCE 08 was resolved.

     It is deliberately NOT archive08.
  */

  localStorage.setItem(
    "source08",
    "resolved"
  );


  /*
     Stop terminal.
  */

  if (terminalInput) {

    terminalInput.disabled =
      true;

  }


  /*
     Stop interaction with raw source.
  */

  if (stageFour) {

    stageFour.style.pointerEvents =
      "none";


    stageFour.style.opacity =
      "0";

  }


  /*
     Remove source label.
  */

  if (sourceLabel) {

    sourceLabel.style.opacity =
      "0";

  }


  /*
     Remove red dot.
  */

  if (sourceRedDot) {

    sourceRedDot.style.opacity =
      "0";


    sourceRedDot.style.pointerEvents =
      "none";

  }


  /* =======================================================
     01
     PLAYER RESPONSE
     ======================================================= */

  setTimeout(
    () => {

      if (finalInput) {

        /*
           Preserve exactly what
           the player typed.
        */

        finalInput.textContent =
          raw;

      }


      if (finalState) {

        finalState.classList.add(
          "visible"
        );

      }

    },

    1600
  );


  /* =======================================================
     02
     好。
     ======================================================= */

  setTimeout(
    () => {

      if (finalState) {

        finalState.classList.add(
          "answer-visible"
        );

      }

    },

    3700
  );


  /* =======================================================
     03
     HOLD

     "好。" stays on screen for several
     seconds before anything else happens.
     ======================================================= */


  /* =======================================================
     04
     FADE THE RESPONSE AWAY
     ======================================================= */

  setTimeout(
    () => {

      if (finalState) {

        finalState.classList.add(
          "ending"
        );

      }

    },

    9000
  );


  /* =======================================================
     05
     THE END
     ======================================================= */

  setTimeout(
    () => {

      if (finalState) {

        finalState.style.visibility =
          "hidden";

      }


      if (theEnd) {

        theEnd.classList.add(
          "visible"
        );

      }

    },

    11600
  );

}