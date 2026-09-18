/* =========================================================
   ARCHIVE 04 / 時間
   ========================================================= */


const temporalRecord =
  document.querySelector(
    ".temporal-record"
  );

const specialTime =
  document.getElementById(
    "specialTime"
  );

const specialSeparator =
  document.getElementById(
    "specialSeparator"
  );

const sequenceStatus =
  document.getElementById(
    "sequenceStatus"
  );

const formatMessage =
  document.getElementById(
    "formatMessage"
  );

const orderMessage =
  document.getElementById(
    "orderMessage"
  );

const classificationOverlay =
  document.getElementById(
    "classificationOverlay"
  );

const classificationResponse =
  document.getElementById(
    "classificationResponse"
  );


let formatRecovered = false;
let completing = false;
let draggedRecord = null;


/* =========================================================
   ORIGINAL ORDER
   ========================================================= */

const originalOrder = [
  "04.08",
  "20:29",
  "03:17",
  "03:12"
];


/* =========================================================
   PREPARE DRAGGABLE RECORDS
   ========================================================= */

/*
   temporal-record contains:

   record-line
   vertical-line
   record-line
   vertical-line
   ...

   We only drag record-line.
*/

const recordLines =
  document.querySelectorAll(
    ".record-line"
  );


recordLines.forEach(
  line => {

    line.draggable = true;

    line.classList.add(
      "draggable-record"
    );


    /* -----------------------------------------
       DRAG START
       ----------------------------------------- */

    line.addEventListener(
      "dragstart",
      event => {

        if (
          formatRecovered ||
          completing
        ) {
          event.preventDefault();
          return;
        }

        draggedRecord = line;

        line.classList.add(
          "dragging"
        );

        event.dataTransfer.effectAllowed =
          "move";

      }
    );


    /* -----------------------------------------
       DRAG END
       ----------------------------------------- */

    line.addEventListener(
      "dragend",
      () => {

        line.classList.remove(
          "dragging"
        );

        draggedRecord = null;

        rebuildTimeline();

        checkOrder();

      }
    );


    /* -----------------------------------------
       DRAG OVER
       ----------------------------------------- */

    line.addEventListener(
      "dragover",
      event => {

        if (
          !draggedRecord ||
          draggedRecord === line ||
          formatRecovered
        ) {
          return;
        }

        event.preventDefault();

        const rect =
          line.getBoundingClientRect();

        const middle =
          rect.top +
          rect.height / 2;


        /*
           Above midpoint:
           insert before.

           Below midpoint:
           insert after.
        */

        if (
          event.clientY <
          middle
        ) {

          temporalRecord.insertBefore(
            draggedRecord,
            line
          );

        } else {

          temporalRecord.insertBefore(
            draggedRecord,
            line.nextSibling
          );

        }

        rebuildTimeline();

      }
    );

  }
);


/* =========================================================
   REBUILD VERTICAL LINES
   ========================================================= */

function rebuildTimeline() {

  /*
     Remove old connector lines.
  */

  temporalRecord
    .querySelectorAll(
      ".vertical-line"
    )
    .forEach(
      line => line.remove()
    );


  const records =
    Array.from(
      temporalRecord.querySelectorAll(
        ".record-line"
      )
    );


  /*
     Add a vertical line
     between every record.
  */

  records.forEach(
    (record, index) => {

      if (
        index ===
        records.length - 1
      ) {
        return;
      }


      const connector =
        document.createElement(
          "div"
        );


      connector.className =
        "vertical-line";


      record.insertAdjacentElement(
        "afterend",
        connector
      );

    }
  );

}


/* =========================================================
   READ CURRENT ORDER
   ========================================================= */

function getCurrentOrder() {

  return Array
    .from(
      temporalRecord.querySelectorAll(
        ".record-line"
      )
    )
    .map(
      line => {

        const value =
          line.querySelector(
            ".time-value"
          );

        return value
          .textContent
          .replace(
            /\s/g,
            ""
          );

      }
    );

}


/* =========================================================
   CHECK ORDER
   ========================================================= */

function checkOrder() {

  if (
    formatRecovered
  ) {
    return;
  }


  const currentOrder =
    getCurrentOrder();


  const isOriginal =
    currentOrder.every(
      (value, index) =>
        value ===
        originalOrder[index]
    );


  if (
    isOriginal
  ) {

    sequenceStatus.textContent =
      "VALID";

    orderMessage.textContent =
      "ORDER VERIFIED";

    formatMessage.textContent =
      "";

    formatMessage.classList.remove(
      "visible"
    );

  } else {

    sequenceStatus.textContent =
      "INVALID";

    orderMessage.textContent =
      "ORDER UNVERIFIED";

    formatMessage.textContent =
      "SEQUENCE DOES NOT RESOLVE";

    formatMessage.classList.add(
      "visible"
    );

  }

}


/* =========================================================
   04.08 — ACTUAL SOLUTION
   ========================================================= */

specialTime.addEventListener(
  "click",
  event => {

    /*
       Prevent drag behaviour
       from interfering with click.
    */

    event.stopPropagation();


    if (
      formatRecovered
    ) {
      return;
    }


    formatRecovered = true;


    /*
       The player finally notices
       the actual discrepancy:

       04.08
       20:29
       03:17
       03:12

       The problem was never
       their order.
    */


    specialSeparator.textContent =
      ":";


    specialTime.classList.add(
      "corrected"
    );


    /*
       Disable dragging.
    */

    document
      .querySelectorAll(
        ".record-line"
      )
      .forEach(
        line => {

          line.draggable =
            false;

          line.classList.remove(
            "draggable-record"
          );

        }
      );


    sequenceStatus.textContent =
      "DISCREPANCY";


    orderMessage.textContent =
      "FORMAT DISCREPANCY";


    formatMessage.textContent =
      "1 FORMAT DISCREPANCY RECOVERED";


    formatMessage.classList.add(
      "visible"
    );


    setTimeout(
      () => {

        classificationOverlay
          .classList
          .add(
            "visible"
          );

      },
      1800
    );

  }
);


/* =========================================================
   CLASSIFICATION
   ========================================================= */

const classificationButtons =
  document.querySelectorAll(
    "[data-answer]"
  );


classificationButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        const answer =
          button.dataset.answer;

        checkClassification(
          answer
        );

      }
    );

  }
);


function checkClassification(
  answer
) {

  if (
    completing
  ) {
    return;
  }


  if (
    answer !== "index"
  ) {

    classificationResponse.textContent =
      "INSUFFICIENT";

    return;

  }


  completing = true;


  classificationResponse.textContent =
    "INDEX CONFIRMED";


  localStorage.setItem(
    "archive04",
    "complete"
  );


  setTimeout(
    beginReveal,
    1300
  );

}


/* =========================================================
   REVEAL
   ========================================================= */

function beginReveal() {

  classificationOverlay
    .classList
    .remove(
      "visible"
    );


  const reveal =
    document.getElementById(
      "timeReveal"
    );

  const numbers =
    document.getElementById(
      "revealNumbers"
    );

  const message =
    document.getElementById(
      "revealMessage"
    );


  setTimeout(
    () => {

      reveal.classList.add(
        "visible"
      );

    },
    500
  );


  /*
     Remove ":".

     They were never clocks.
  */

  setTimeout(
    () => {

      numbers.classList.add(
        "remove-separators"
      );

    },
    2200
  );


  setTimeout(
    () => {

      message.textContent =
        "你一直把它們當成時間。";

      message.classList.add(
        "visible"
      );

    },
    4100
  );


  setTimeout(
    () => {

      message.classList.remove(
        "visible"
      );

    },
    6500
  );


  setTimeout(
    () => {

      message.textContent =
        "它們從來都不是。";

      message.classList.add(
        "visible"
      );

    },
    7600
  );


  setTimeout(
    () => {

      message.classList.remove(
        "visible"
      );

    },
    10000
  );


  setTimeout(
    () => {

      reveal.classList.remove(
        "visible"
      );

      showCompletion();

    },
    11100
  );

}


/* =========================================================
   COMPLETION
   ========================================================= */

function showCompletion() {

  const completion =
    document.getElementById(
      "timeCompletion"
    );

  const top =
    document.getElementById(
      "timeCompleteTop"
    );

  const main =
    document.getElementById(
      "timeCompleteMain"
    );

  const second =
    document.getElementById(
      "timeCompleteSecond"
    );

  const access =
    document.getElementById(
      "timeCompleteAccess"
    );


  completion.classList.add(
    "visible"
  );


  setTimeout(
    () => {

      top.textContent =
        "ARCHIVE 04 / COMPLETE";

    },
    900
  );


  setTimeout(
    () => {

      main.textContent =
        "時間不是紀錄。";

    },
    2400
  );


  setTimeout(
    () => {

      second.textContent =
        "時間只是索引。";

    },
    3900
  );


  setTimeout(
    () => {

      access.textContent =
        "ARCHIVE 05 / ACCESS RESTORED";

    },
    5800
  );


  setTimeout(
    () => {

      window.location.href =
        "../index.html#archive";

    },
    8000
  );

}