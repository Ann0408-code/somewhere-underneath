/* =========================================================
   ARCHIVE 01 / CONTROL
   ========================================================= */


const inspector =
  document.getElementById(
    "inspectorContent"
  );


const rows =
  document.querySelectorAll(
    ".inventory-row"
  );


let watchInterval = null;

let watchHintTimer = null;



/* =========================================================
   OBJECT DATA
   ========================================================= */


const objects = {

  keys: {
    id: "02",
    name: "KEYS",
    location: "TRAY / CENTER"
  },

  wallet: {
    id: "03",
    name: "WALLET",
    location: "DRAWER / 01"
  },

  glasses: {
    id: "04",
    name: "GLASSES",
    location: "DESK / RIGHT"
  },

  notebook: {
    id: "05",
    name: "NOTEBOOK",
    location: "SHELF / 02"
  },

  pen: {
    id: "06",
    name: "PEN",
    location: "DESK / LEFT"
  },

  headphones: {
    id: "07",
    name: "HEADPHONES",
    location: "DRAWER / 02"
  }

};



/* =========================================================
   ROW CLICK
   ========================================================= */


rows.forEach(
  row => {

    row.addEventListener(
      "click",
      () => {


        rows.forEach(
          item => {

            item.classList.remove(
              "selected"
            );

          }
        );


        row.classList.add(
          "selected"
        );


        const object =
          row.dataset.object;


        clearInterval(
          watchInterval
        );


        clearTimeout(
          watchHintTimer
        );


        if (
          object === "watch"
        ) {

          inspectWatch();

        }

        else {

          inspectNormalObject(
            objects[object]
          );

        }

      }
    );

  }
);



/* =========================================================
   NORMAL OBJECT
   ========================================================= */


function inspectNormalObject(
  object
) {


  inspector.innerHTML = `

    <div class="inspection-id">

      OBJECT ${object.id}

    </div>


    <div class="inspection-name">

      ${object.name}

    </div>


    <div class="inspection-data">


      <span class="label">

        POSITION

      </span>


      <span class="value">

        ${object.location}

      </span>



      <span class="label">

        RECORD

      </span>


      <span class="value">

        MATCH

      </span>


    </div>


    <div class="verified">

      POSITION VERIFIED

    </div>

  `;

}



/* =========================================================
   WATCH
   ========================================================= */


function inspectWatch() {


  inspector.innerHTML = `

    <div class="inspection-id">

      OBJECT 01

    </div>


    <div class="inspection-name">

      WATCH

    </div>


    <div class="inspection-data">


      <span class="label">

        POSITION

      </span>


      <span class="value">

        DESK / LEFT

      </span>


      <span class="label">

        RECORD

      </span>


      <span class="value">

        MATCH

      </span>


    </div>


    <div
      class="watch-time"
      id="watchTime"
    >

      20:29:26

    </div>


    <div class="watch-status">

      STATUS&nbsp;&nbsp;&nbsp;RUNNING

    </div>


    <div
      class="watch-hint"
      id="watchHint"
    >

      POSITION VERIFIED

    </div>

  `;


  startWatch();


  watchHintTimer =
    setTimeout(
      () => {

        const hint =
          document.getElementById(
            "watchHint"
          );


        if (hint) {

          hint.classList.add(
            "visible"
          );

        }

      },

      5500
    );

}



/* =========================================================
   WATCH SEQUENCE
   ========================================================= */


function startWatch() {


  const sequence = [

    "20:29:26",

    "20:29:27",

    "20:29:28",

    "20:29:29",

    "20:29:29",

    "20:29:29",

    "20:29:30",

    "20:29:31",

    "20:29:32"

  ];


  let index = 0;


  const watch =
    document.getElementById(
      "watchTime"
    );


  if (!watch) {
    return;
  }


  watch.textContent =
    sequence[0];


  watchInterval =
    setInterval(
      () => {


        index++;


        if (
          index >=
          sequence.length
        ) {

          index = 0;

        }


        const currentWatch =
          document.getElementById(
            "watchTime"
          );


        if (
          !currentWatch
        ) {

          clearInterval(
            watchInterval
          );

          return;

        }


        currentWatch.textContent =
          sequence[index];


      },

      1000
    );

}



/* =========================================================
   REPORT WINDOW
   ========================================================= */


const reportButton =
  document.getElementById(
    "reportButton"
  );


const reportOverlay =
  document.getElementById(
    "reportOverlay"
  );


const closeReport =
  document.getElementById(
    "closeReport"
  );


reportButton.addEventListener(
  "click",
  () => {

    reportOverlay
      .classList
      .add(
        "visible"
      );

  }
);


closeReport.addEventListener(
  "click",
  () => {

    reportOverlay
      .classList
      .remove(
        "visible"
      );

  }
);



/* =========================================================
   SUBMIT
   ========================================================= */


const submitReport =
  document.getElementById(
    "submitReport"
  );


submitReport.addEventListener(
  "click",
  checkReport
);



document
  .getElementById(
    "discrepancy"
  )
  .addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter"
      ) {

        checkReport();

      }

    }
  );



/* =========================================================
   CHECK ANSWER
   ========================================================= */


function checkReport() {


  const id =
    document
      .getElementById(
        "objectId"
      )
      .value
      .trim();


  const discrepancy =
    document
      .getElementById(
        "discrepancy"
      )
      .value
      .trim()
      .toLowerCase();


  const response =
    document.getElementById(
      "reportResponse"
    );


  const validId =

    id === "01" ||
    id === "1";


  const validDiscrepancy = [

    "time",

    "時間",

    "時計",

    "zeit"

  ].includes(
    discrepancy
  );


  if (
    validId &&
    validDiscrepancy
  ) {

    response.textContent =
      "DISCREPANCY ACCEPTED";


    localStorage.setItem(
      "archive01",
      "complete"
    );


    setTimeout(
      completeArchive,
      1200
    );

  }

  else {

    response.textContent =
      "NO DISCREPANCY FOUND";

  }

}



/* =========================================================
   COMPLETE ARCHIVE
   ========================================================= */


function completeArchive() {


  reportOverlay
    .classList
    .remove(
      "visible"
    );


  const count =
    document.getElementById(
      "discrepancyCount"
    );


  const message =
    document.getElementById(
      "controlMessage"
    );


  count.textContent =
    "1 DISCREPANCY";


  message.style.opacity =
    "0";


  setTimeout(
    () => {

      message.textContent =
        "It was never about where.";

      message.style.color =
        "#77756f";

      message.style.opacity =
        "1";

    },

    700
  );


  setTimeout(
    showCompletion,
    3000
  );

}



/* =========================================================
   COMPLETION SCREEN
   ========================================================= */


function showCompletion() {


  const overlay =
    document.getElementById(
      "completionOverlay"
    );


  overlay.classList.add(
    "visible"
  );


  const line1 =
    document.getElementById(
      "completionLine1"
    );


  const line2 =
    document.getElementById(
      "completionLine2"
    );


  const line3 =
    document.getElementById(
      "completionLine3"
    );


  setTimeout(
    () => {

      line1.textContent =
        "ARCHIVE 01 / COMPLETE";

    },

    1000
  );


  setTimeout(
    () => {

      line2.textContent =
        "It was never about where.";

    },

    2500
  );


  setTimeout(
    () => {

      line3.textContent =
        "ARCHIVE 02 / ACCESS RESTORED";

    },

    4700
  );


  setTimeout(
    () => {

      window.location.href =
        "../index.html#archive";

    },

    7200
  );

}