/* =========================================================
   ARCHIVE 06 / ポラリス
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const observationField =
  document.getElementById("observationField");

const stars =
  document.querySelectorAll(".star");

const observationTime =
  document.getElementById("observationTime");

const beginButton =
  document.getElementById("beginButton");

const inspectorHeading =
  document.getElementById("inspectorHeading");

const deltaX =
  document.getElementById("deltaX");

const deltaY =
  document.getElementById("deltaY");

const objectStatus =
  document.getElementById("objectStatus");

const referenceQuestion =
  document.getElementById("referenceQuestion");

const referenceYes =
  document.getElementById("referenceYes");

const referenceNo =
  document.getElementById("referenceNo");

const movementStatus =
  document.getElementById("movementStatus");

const polarisBottom =
  document.getElementById("polarisBottom");


/* overlays */

const referenceOverlay =
  document.getElementById("referenceOverlay");

const referenceStatus =
  document.getElementById("referenceStatus");

const referenceDesignation =
  document.getElementById("referenceDesignation");

const messageOverlay =
  document.getElementById("messageOverlay");

const messageStar =
  document.getElementById("messageStar");

const personalMessage =
  document.getElementById("personalMessage");

const signalRecord =
  document.getElementById("signalRecord");

const polarisCompletion =
  document.getElementById("polarisCompletion");

const completionTop =
  document.getElementById("completionTop");

const completionMain =
  document.getElementById("completionMain");

const completionRecipient =
  document.getElementById("completionRecipient");

const completionAccess =
  document.getElementById("completionAccess");


/* =========================================================
   STATE
   ========================================================= */

let observationStarted = false;

let observationFinished = false;

let selectedObject = null;

let referenceSet = false;

let messageReady = false;

let signalDetected = false;

let completing = false;

let timeInterval = null;


/*
   Observation runs from
   03:17 -> 03:29.
*/

let observationMinute = 17;


/* =========================================================
   BEGIN OBSERVATION
   ========================================================= */

beginButton.addEventListener(
  "click",
  beginObservation
);


function beginObservation() {

  if (observationStarted) {
    return;
  }

  observationStarted = true;

  beginButton.disabled = true;

  beginButton.textContent =
    "OBSERVATION ACTIVE";

  polarisBottom.textContent =
    "TRACKING 08 OBJECTS";

  observationField.classList.add(
    "observing"
  );

  startClock();

  /*
     Give the player a moment
     before movement begins.
  */

  setTimeout(
    moveStars,
    900
  );

  /*
     Finish observation after
     the movement becomes readable.
  */

  setTimeout(
    finishObservation,
    9000
  );

}


/* =========================================================
   CLOCK
   ========================================================= */

function startClock() {

  timeInterval =
    setInterval(
      () => {

        observationMinute += 1;

        if (observationMinute > 29) {
          observationMinute = 29;
        }

        observationTime.textContent =
          `03:${String(
            observationMinute
          ).padStart(2, "0")}`;

        if (observationMinute >= 29) {

          clearInterval(
            timeInterval
          );

        }

      },

      650
    );

}


/* =========================================================
   MOVE STARS
   ========================================================= */

function moveStars() {

  stars.forEach(
    star => {

      const object =
        star.dataset.object;

      /*
         OBJECT 08 remains fixed.
      */

      if (object === "08") {
        return;
      }

      const dx =
        Number(
          star.dataset.dx
        );

      const dy =
        Number(
          star.dataset.dy
        );

      /*
         Current CSS positions are
         percentages.

         Translate movement gives
         enough visible displacement
         without destroying layout.
      */

      star.style.transform =
        `translate(
          calc(-50% + ${dx * 2}px),
          calc(-50% + ${dy * 2}px)
        )`;

  });

}


/* =========================================================
   OBSERVATION FINISHED
   ========================================================= */

function finishObservation() {

  observationFinished = true;

  observationTime.textContent =
    "03:29";

  beginButton.textContent =
    "OBSERVATION COMPLETE";

  polarisBottom.textContent =
    "MOVEMENT VERIFIED";

}


/* =========================================================
   INSPECT OBJECT
   ========================================================= */

stars.forEach(
  star => {

    star.addEventListener(
      "click",
      () => {

        inspectStar(star);

      }
    );

  }
);


function inspectStar(star) {

  /*
     Let inspection work before
     observation too, but movement
     values are unresolved.
  */

  stars.forEach(
    item => {

      item.classList.remove(
        "selected"
      );

    }
  );

  star.classList.add(
    "selected"
  );

  const object =
    star.dataset.object;

  selectedObject =
    object;

  inspectorHeading.textContent =
    `OBJECT ${object}`;

  if (!observationFinished) {

    deltaX.textContent =
      "—";

    deltaY.textContent =
      "—";

    objectStatus.textContent =
      observationStarted
        ? "TRACKING"
        : "UNRESOLVED";

    referenceQuestion.classList.remove(
      "visible"
    );

    return;

  }

  const dx =
    Number(
      star.dataset.dx
    );

  const dy =
    Number(
      star.dataset.dy
    );

  deltaX.textContent =
    formatDelta(dx);

  deltaY.textContent =
    formatDelta(dy);

  objectStatus.textContent =
    "TRACKED";

  /*
     Only OBJECT 08 has
     zero displacement.
  */

  if (
    object === "08"
  ) {

    referenceQuestion.classList.add(
      "visible"
    );

    polarisBottom.textContent =
      "FIXED OBJECT DETECTED";

  }

  else {

    referenceQuestion.classList.remove(
      "visible"
    );

  }

}


/* =========================================================
   FORMAT DELTA
   ========================================================= */

function formatDelta(value) {

  if (value === 0) {
    return "00";
  }

  const sign =
    value > 0
      ? "+"
      : "-";

  return (
    sign +
    String(
      Math.abs(value)
    ).padStart(2, "0")
  );

}


/* =========================================================
   REFERENCE / NO
   ========================================================= */

referenceNo.addEventListener(
  "click",
  () => {

    referenceQuestion.classList.remove(
      "visible"
    );

    polarisBottom.textContent =
      "MOVEMENT VERIFIED";

  }
);


/* =========================================================
   REFERENCE / YES
   ========================================================= */

referenceYes.addEventListener(
  "click",
  () => {

    if (
      selectedObject !== "08" ||
      referenceSet
    ) {
      return;
    }

    referenceSet = true;

    beginReferenceSequence();

  }
);


/* =========================================================
   REFERENCE SEQUENCE
   ========================================================= */

function beginReferenceSequence() {

  /*
     First change the system's
     interpretation.
  */

  movementStatus.textContent =
    "RECALCULATING";

  polarisBottom.textContent =
    "SETTING REFERENCE";

  /*
     Fade normal interface.
  */

  setTimeout(
    () => {

      referenceOverlay.classList.add(
        "visible"
      );

    },

    700
  );


  /*
     OBJECT 08 / FIXED
  */

  setTimeout(
    () => {

      referenceStatus.textContent =
        "REFERENCE STATUS / FIXED";

    },

    2000
  );


  /*
     Reveal designation.
  */

  setTimeout(
    () => {

      referenceDesignation.textContent =
        "POLARIS";

    },

    3400
  );


  /*
     Briefly return to the star field
     and reinterpret movement around 08.
  */

  setTimeout(
    () => {

      referenceOverlay.classList.remove(
        "visible"
      );

      rotateAroundPolaris();

    },

    5200
  );


  /*
     Then strip the interface away.
  */

  setTimeout(
    () => {

      messageOverlay.classList.add(
        "visible"
      );

    },

    9200
  );


  /*
     Begin personal message.
  */

  setTimeout(
    beginMessageSequence,
    10800
  );

}


/* =========================================================
   ROTATE AROUND POLARIS
   ========================================================= */

function rotateAroundPolaris() {

  movementStatus.textContent =
    "REFERENCE FIXED";

  polarisBottom.textContent =
    "OBJECT 08 / REFERENCE";


  /*
     Instead of literally moving
     the entire coordinate system,
     give every other star a second
     curved-looking displacement.

     OBJECT 08 remains perfectly fixed.
  */

  stars.forEach(
    star => {

      if (
        star.dataset.object === "08"
      ) {
        return;
      }

      const rect =
        star.getBoundingClientRect();

      const fieldRect =
        observationField
          .getBoundingClientRect();

      const starX =
        rect.left +
        rect.width / 2;

      const starY =
        rect.top +
        rect.height / 2;

      const centerX =
        fieldRect.left +
        fieldRect.width * 0.51;

      const centerY =
        fieldRect.top +
        fieldRect.height * 0.45;

      const x =
        starX - centerX;

      const y =
        starY - centerY;

      /*
         Small rotation around
         the fixed reference point.
      */

      const angle =
        0.13;

      const rotatedX =
        x * Math.cos(angle) -
        y * Math.sin(angle);

      const rotatedY =
        x * Math.sin(angle) +
        y * Math.cos(angle);

      const moveX =
        rotatedX - x;

      const moveY =
        rotatedY - y;

      star.style.transition =
        "transform 3.2s ease-in-out";

      star.style.transform =
        `translate(
          calc(-50% + ${moveX}px),
          calc(-50% + ${moveY}px)
        )`;

    }
  );

}


/* =========================================================
   PERSONAL MESSAGE
   ========================================================= */

function beginMessageSequence() {

  /*
     Message 1
  */

  personalMessage.textContent =
    "如果你迷路了，就找一個不會動的東西。";

  personalMessage.classList.add(
    "visible"
  );


  setTimeout(
    () => {

      personalMessage.classList.remove(
        "visible"
      );

    },

    3200
  );


  /*
     Message 2
  */

  setTimeout(
    () => {

      personalMessage.textContent =
        "我以前是這樣做的。";

      personalMessage.classList.add(
        "visible"
      );

    },

    4300
  );


  setTimeout(
    () => {

      personalMessage.classList.remove(
        "visible"
      );

    },

    7000
  );


  /*
     Message 3
  */

  setTimeout(
    () => {

      personalMessage.textContent =
        "不知道你現在還看不看得到。";

      personalMessage.classList.add(
        "visible"
      );

    },

    8100
  );


  setTimeout(
    () => {

      personalMessage.classList.remove(
        "visible"
      );

    },

    11300
  );


  /*
     The player now has to click
     the remaining star.
  */

  setTimeout(
    () => {

      messageReady = true;

      signalRecord.textContent =
        "SIGNAL AVAILABLE";

      signalRecord.classList.add(
        "visible"
      );

    },

    12500
  );

}


/* =========================================================
   CLICK POLARIS
   ========================================================= */

messageStar.addEventListener(
  "click",
  () => {

    if (
      !messageReady ||
      signalDetected
    ) {
      return;
    }

    signalDetected = true;

    messageStar.classList.add(
      "signal"
    );

    signalRecord.classList.remove(
      "visible"
    );

    setTimeout(
      () => {

        signalRecord.innerHTML =
          "SIGNAL DETECTED";

        signalRecord.classList.add(
          "visible"
        );

    },

    700
  );


  setTimeout(
    () => {

      signalRecord.classList.remove(
        "visible"
      );

    },

    2200
  );


  /*
     Recipient initially unknown.
  */

  setTimeout(
    () => {

      signalRecord.innerHTML =
        "RECIPIENT<br>UNKNOWN";

      signalRecord.classList.add(
        "visible"
      );

    },

    3100
  );


  /*
     Remove UNKNOWN.
  */

  setTimeout(
    () => {

      signalRecord.classList.remove(
        "visible"
      );

    },

    5000
  );


  /*
     Then address the player.
  */

  setTimeout(
    () => {

      signalRecord.innerHTML =
        "RECIPIENT<br>YOU";

      signalRecord.classList.add(
        "visible"
      );

    },

    6100
  );


  /*
     Complete archive.
  */

  setTimeout(
    () => {

      completeArchive();

    },

    8800
  );

});


/* =========================================================
   COMPLETE
   ========================================================= */

function completeArchive() {

  if (completing) {
    return;
  }

  completing = true;

  localStorage.setItem(
    "archive06",
    "complete"
  );

  messageOverlay.classList.remove(
    "visible"
  );

  setTimeout(
    () => {

      polarisCompletion.classList.add(
        "visible"
      );

    },

    900
  );


  setTimeout(
    () => {

      completionTop.textContent =
        "ARCHIVE 06 / COMPLETE";

    },

    1800
  );


  setTimeout(
    () => {

      completionMain.textContent =
        "OBJECT 08 / FIXED";

    },

    3200
  );


  setTimeout(
    () => {

      completionRecipient.textContent =
        "RECIPIENT / YOU";

    },

    4300
  );


  setTimeout(
    () => {

      completionAccess.textContent =
        "ARCHIVE 07 / ACCESS RESTORED";

    },

    5800
  );


  setTimeout(
    () => {

      window.location.href =
        "../index.html#archive";

    },

    8200
  );

}