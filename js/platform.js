/* =========================================================
   ARCHIVE 02 / PLATFORM
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const trainRecords =
  document.querySelectorAll(
    ".train-record"
  );


const recordFeedback =
  document.getElementById(
    "recordFeedback"
  );


const inspector =
  document.getElementById(
    "inspector"
  );

const inspectorLabel =
  document.getElementById(
    "inspectorLabel"
  );

const inspectorPlace =
  document.getElementById(
    "inspectorPlace"
  );

const inspectorDirection =
  document.getElementById(
    "inspectorDirection"
  );

const destinationLabel =
  document.getElementById(
    "destinationLabel"
  );

const recordStatus =
  document.getElementById(
    "recordStatus"
  );


const traceRoute =
  document.getElementById(
    "traceRoute"
  );

const closeInspector =
  document.getElementById(
    "closeInspector"
  );


const traceOverlay =
  document.getElementById(
    "traceOverlay"
  );

const traceLabel =
  document.getElementById(
    "traceLabel"
  );

const traceRouteVisual =
  document.getElementById(
    "traceRouteVisual"
  );

const traceStatus =
  document.getElementById(
    "traceStatus"
  );

const traceReturn =
  document.getElementById(
    "traceReturn"
  );


const systemStatus =
  document.getElementById(
    "systemStatus"
  );


const platformComplete =
  document.getElementById(
    "platformComplete"
  );


/* =========================================================
   STATE
   ========================================================= */

let currentRecord = null;

let currentRouteTraced = false;

let labelCorrected = false;

let archiveCompleted = false;

let traceTimers = [];


/* =========================================================
   OPEN ANY RECORD
   ========================================================= */

trainRecords.forEach(
  record => {

    record.addEventListener(
      "click",
      () => {

        if (
          archiveCompleted
        ) {
          return;
        }


        openRecord(record);

      }
    );

  }
);


/* =========================================================
   OPEN RECORD
   ========================================================= */

function openRecord(record) {

  /*
     Read the record entirely from
     its data attributes.

     This lets every row use exactly
     the same interaction.
  */

  currentRecord = {

    number:
      record.dataset.record,

    place:
      record.dataset.place,

    direction:
      record.dataset.direction,

    route:
      record.dataset.route,

    discrepancy:
      record.dataset.discrepancy || null

  };


  /*
     Every time a record is opened,
     its trace state starts clean.
  */

  currentRouteTraced = false;


  /*
     Remove any previous puzzle affordance.
  */

  inspector.classList.remove(
    "label-questionable"
  );


  destinationLabel.classList.remove(
    "corrected"
  );


  destinationLabel.textContent =
    "DESTINATION";


  destinationLabel.style.opacity =
    "1";


  /*
     Fill inspector.
  */

  inspectorLabel.textContent =
    `RECORD ${currentRecord.number}`;


  inspectorPlace.textContent =
    currentRecord.place;


  inspectorDirection.textContent =
    currentRecord.direction;


  recordStatus.textContent =
    "VERIFIED";


  recordFeedback.textContent =
    `RECORD ${currentRecord.number} / VERIFIED`;


  /*
     Open.
  */

  inspector.classList.add(
    "visible"
  );

}


/* =========================================================
   CLOSE INSPECTOR
   ========================================================= */

closeInspector.addEventListener(
  "click",
  () => {

    if (
      archiveCompleted
    ) {
      return;
    }


    inspector.classList.remove(
      "visible"
    );


    setTimeout(
      () => {

        recordFeedback.textContent =
          "SELECT A RECORD";

      },

      450
    );

  }
);


/* =========================================================
   TRACE ANY RECORD
   ========================================================= */

traceRoute.addEventListener(
  "click",
  () => {

    if (
      !currentRecord ||
      archiveCompleted
    ) {
      return;
    }


    /*
       Clear previous animation timers.
    */

    clearTraceTimers();


    /*
       Hide inspector.
    */

    inspector.classList.remove(
      "visible"
    );


    /*
       Build this record's route.
    */

    buildTrace(
      currentRecord
    );


    /*
       Show trace.
    */

    setTimeout(
      () => {

        traceOverlay.classList.add(
          "visible"
        );


        runTraceAnimation(
          currentRecord
        );

      },

      450
    );

  }
);


/* =========================================================
   BUILD TRACE
   ========================================================= */

function buildTrace(record) {

  traceLabel.textContent =
    `RECORD ${record.number} / ROUTE TRACE`;


  traceStatus.textContent =
    "CALCULATING";


  traceReturn.classList.remove(
    "available"
  );


  /*
     Clear old route.
  */

  traceRouteVisual.innerHTML =
    "";


  /*
     NORTHBOUND

     UNION
       ↑
     BLOOR–YONGE
       ↑
     FINCH
  */

  if (
    record.route === "north"
  ) {

    createTraceStation(
      "UNION"
    );

    createTracePath(
      "↑"
    );

    createTraceStation(
      "BLOOR–YONGE"
    );

    createTracePath(
      "↑"
    );

    createTraceStation(
      "FINCH"
    );

  }


  /*
     SOUTHBOUND

     FINCH
       ↓
     BLOOR–YONGE
       ↓
     UNION
  */

  else {

    createTraceStation(
      "FINCH"
    );

    createTracePath(
      "↓"
    );

    createTraceStation(
      "BLOOR–YONGE"
    );

    createTracePath(
      "↓"
    );

    createTraceStation(
      "UNION"
    );

  }

}


/* =========================================================
   CREATE TRACE STATION
   ========================================================= */

function createTraceStation(name) {

  const station =
    document.createElement(
      "div"
    );


  station.className =
    "trace-station";


  station.textContent =
    name;


  traceRouteVisual.appendChild(
    station
  );

}


/* =========================================================
   CREATE TRACE PATH
   ========================================================= */

function createTracePath(symbol) {

  const path =
    document.createElement(
      "div"
    );


  path.className =
    "trace-path";


  path.textContent =
    symbol;


  traceRouteVisual.appendChild(
    path
  );

}


/* =========================================================
   TRACE ANIMATION
   ========================================================= */

function runTraceAnimation(record) {

  const stations =
    traceRouteVisual.querySelectorAll(
      ".trace-station"
    );


  stations.forEach(
    station => {

      station.classList.remove(
        "active"
      );

    }
  );


  /*
     First station.
  */

  traceTimers.push(

    setTimeout(
      () => {

        if (stations[0]) {

          stations[0].classList.add(
            "active"
          );

        }

      },

      700
    )

  );


  /*
     Second station.
  */

  traceTimers.push(

    setTimeout(
      () => {

        if (stations[0]) {

          stations[0].classList.remove(
            "active"
          );

        }


        if (stations[1]) {

          stations[1].classList.add(
            "active"
          );

        }

      },

      1500
    )

  );


  /*
     Final station.
  */

  traceTimers.push(

    setTimeout(
      () => {

        if (stations[1]) {

          stations[1].classList.remove(
            "active"
          );

        }


        if (stations[2]) {

          stations[2].classList.add(
            "active"
          );

        }

      },

      2300
    )

  );


  /*
     Confirm direction.
  */

  traceTimers.push(

    setTimeout(
      () => {

        traceStatus.textContent =
          `DIRECTION / ${record.direction}`;

      },

      3000
    )

  );


  /*
     Now evaluate what the route means.
  */

  traceTimers.push(

    setTimeout(
      () => {

        currentRouteTraced =
          true;


        /*
           NORMAL RECORDS

           Direction and destination
           describe the same route.
        */

        if (
          record.discrepancy !== "label"
        ) {

          traceStatus.textContent =
            "ROUTE / VERIFIED";

        }


        /*
           RECORD 07

           We deliberately do NOT say
           "destination wrong".

           The player only learns that
           SOUTHBOUND is unquestionably
           correct.
        */

        else {

          traceStatus.textContent =
            "DIRECTION / VERIFIED";

        }


        traceReturn.classList.add(
          "available"
        );

      },

      3900
    )

  );

}


/* =========================================================
   CLEAR TRACE TIMERS
   ========================================================= */

function clearTraceTimers() {

  traceTimers.forEach(
    timer => {

      clearTimeout(
        timer
      );

    }
  );


  traceTimers = [];

}


/* =========================================================
   RETURN FROM TRACE
   ========================================================= */

traceReturn.addEventListener(
  "click",
  () => {

    if (
      !currentRouteTraced ||
      archiveCompleted
    ) {
      return;
    }


    clearTraceTimers();


    traceOverlay.classList.remove(
      "visible"
    );


    setTimeout(
      () => {

        inspector.classList.add(
          "visible"
        );


        /*
           Only record 07 creates
           a semantic contradiction.

           We still don't explicitly
           tell the player what is wrong.
        */

        if (
          currentRecord &&
          currentRecord.discrepancy ===
            "label"
        ) {

          inspector.classList.add(
            "label-questionable"
          );

        }

      },

      500
    );

  }
);


/* =========================================================
   DESTINATION

   This button exists on EVERY record.

   Clicking it does nothing unless
   the player has traced record 07.
   ========================================================= */

destinationLabel.addEventListener(
  "click",
  () => {

    if (
      archiveCompleted ||
      labelCorrected ||
      !currentRecord ||
      !currentRouteTraced
    ) {
      return;
    }


    /*
       Normal records:
       DESTINATION really is
       the correct label.
    */

    if (
      currentRecord.discrepancy !==
        "label"
    ) {

      return;

    }


    /*
       RECORD 07:

       FINCH + SOUTHBOUND is valid
       only if FINCH describes
       where the route began.
    */

    labelCorrected = true;


    destinationLabel.style.opacity =
      "0";


    setTimeout(
      () => {

        destinationLabel.textContent =
          "ORIGIN";


        destinationLabel.classList.add(
          "corrected"
        );


        destinationLabel.style.opacity =
          "1";

      },

      500
    );


    /*
       Recalculate record.
    */

    setTimeout(
      () => {

        recordStatus.textContent =
          "RECALCULATING";


        systemStatus.textContent =
          "RECALCULATING";

      },

      1200
    );


    /*
       Semantic consistency restored.
    */

    setTimeout(
      () => {

        recordStatus.textContent =
          "CONSISTENT";


        systemStatus.textContent =
          "CONSISTENT";

      },

      2200
    );


    /*
       Complete archive.
    */

    setTimeout(
      () => {

        completeArchive();

      },

      3300
    );

  }
);


/* =========================================================
   COMPLETE ARCHIVE
   ========================================================= */

function completeArchive() {

  if (
    archiveCompleted
  ) {
    return;
  }


  archiveCompleted = true;


  /*
     Unlock Archive 03.
  */

  localStorage.setItem(
    "archive02",
    "complete"
  );


  /*
     Remove inspector.
  */

  inspector.classList.remove(
    "visible"
  );


  /*
     Completion.
  */

  setTimeout(
    () => {

      platformComplete.classList.add(
        "visible"
      );

    },

    700
  );


  /*
     Return to archive index.
  */

  setTimeout(
    () => {

      window.location.href =
        "../index.html#archive";

    },

    6200
  );

}