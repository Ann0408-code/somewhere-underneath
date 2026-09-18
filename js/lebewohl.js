/* =========================================================
   ARCHIVE 07 / Lebewohl
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */


const lebewohlScreen =
  document.getElementById(
    "lebewohlScreen"
  );


const closeArchive =
  document.getElementById(
    "closeArchive"
  );


const finalMessageOverlay =
  document.getElementById(
    "finalMessageOverlay"
  );


const finalMessage =
  document.getElementById(
    "finalMessage"
  );


const archiveClosedOverlay =
  document.getElementById(
    "archiveClosedOverlay"
  );


const closedHeading =
  document.getElementById(
    "closedHeading"
  );


const closedRecords =
  document.getElementById(
    "closedRecords"
  );


const closedSession =
  document.getElementById(
    "closedSession"
  );


const closedReturn =
  document.getElementById(
    "closedReturn"
  );



/* =========================================================
   STATE
   ========================================================= */


let closing =
  false;



/* =========================================================
   CLOSE ARCHIVE
   ========================================================= */


closeArchive.addEventListener(
  "click",
  () => {


    if (
      closing
    ) {
      return;
    }


    closing =
      true;


    closeArchive.disabled =
      true;


    /*
       The final indexed archive
       is considered complete
       when the player chooses
       to close it.
    */


    localStorage.setItem(
      "archive07",
      "complete"
    );


    /*
       Used by the homepage
       to activate the unexplained
       red point.
    */


    localStorage.setItem(
      "archiveClosed",
      "true"
    );


    lebewohlScreen.classList.add(
      "closing"
    );


    setTimeout(
      () => {


        finalMessageOverlay.classList.add(
          "visible"
        );


      },

      1500
    );


    setTimeout(
      beginFinalMessage,
      2900
    );


  }
);



/* =========================================================
   FINAL MESSAGE
   ========================================================= */


function beginFinalMessage() {


  showMessage(
    "你找到這裡了。",
    0,
    3100
  );


  showMessage(
    "我想過很多次，<br>如果真的有人看到這些，<br>我應該留下什麼。",
    4400,
    4800
  );


  showMessage(
    "後來覺得，<br>好像也沒有什麼一定要說的。",
    10400,
    4200
  );


  showMessage(
    "謝謝你找到我。",
    15800,
    4200
  );


  /*
     Nothing follows the last line.

     The title already said it.
  */


  setTimeout(
    () => {


      finalMessageOverlay.classList.remove(
        "visible"
      );


    },

    21100
  );


  setTimeout(
    showClosedState,
    22800
  );


}



/* =========================================================
   SHOW MESSAGE
   ========================================================= */


function showMessage(
  html,
  delay,
  duration
) {


  setTimeout(
    () => {


      finalMessage.innerHTML =
        html;


      finalMessage.classList.add(
        "visible"
      );


    },

    delay
  );


  setTimeout(
    () => {


      finalMessage.classList.remove(
        "visible"
      );


    },

    delay + duration
  );


}



/* =========================================================
   CLOSED STATE
   ========================================================= */


function showClosedState() {


  archiveClosedOverlay.classList.add(
    "visible"
  );


  /*
     System UI returns.
  */


  setTimeout(
    () => {


      closedHeading.textContent =
        "ARCHIVE CLOSED";


    },

    1000
  );


  setTimeout(
    () => {


      closedRecords.innerHTML =
        "07 RECORDS<br>" +
        "07 VERIFIED<br>" +
        "07 COMPLETE";


    },

    2400
  );


  setTimeout(
    () => {


      closedSession.textContent =
        "SESSION TERMINATED";


    },

    4100
  );


  setTimeout(
    () => {


      closedReturn.classList.add(
        "visible"
      );


    },

    5400
  );


}