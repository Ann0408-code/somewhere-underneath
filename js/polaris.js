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


/*
   Animation frame IDs.
*/

let observationAnimation = null;

let referenceAnimation = null;


/*
   Observation duration.

   12 seconds gives enough time for
   the player to actually watch the sky.

   It represents 03:17 → 03:29.
*/

const OBSERVATION_DURATION = 12000;


/*
   Reference demonstration duration.
*/

const REFERENCE_DURATION = 4800;


/*
   Current visual displacement of
   every object.

   This is important because the
   reference animation must continue
   FROM the final observation position.

   It must never snap back.
*/

const starMotion = new Map();


/*
   All seven moving stars share one
   broad movement.

   This makes the FIELD appear to drift,
   rather than eight UI elements moving
   independently.

   Small variations are added below.
*/

const sharedDrift = {
  x: 11,
  y: -5
};


/*
   Tiny deviations.

   These make the observation feel
   organic without destroying the
   common direction of motion.

   OBJECT 08 is absent because it
   remains perfectly fixed.
*/

const driftVariation = {
  "01": { x:  0, y:  0 },
  "02": { x: -2, y:  1 },
  "03": { x:  1, y:  0 },
  "04": { x: -1, y: -1 },
  "05": { x:  0, y:  1 },
  "06": { x: -2, y:  0 },
  "07": { x:  1, y: -1 }
};


/*
   Initialise motion state.
*/

stars.forEach(
  star => {

    starMotion.set(
      star.dataset.object,
      {
        x: 0,
        y: 0
      }
    );

  }
);


/* =========================================================
   HELPERS
   ========================================================= */

function clamp(value, min, max) {

  return Math.min(
    Math.max(value, min),
    max
  );

}


/*
   Smoothstep.

   Unlike a harsh linear movement,
   this begins almost imperceptibly
   and settles gently at the end.
*/

function smoothstep(value) {

  const t =
    clamp(value, 0, 1);

  return (
    t * t * (3 - 2 * t)
  );

}


/*
   Apply one object's displacement.

   Every stage uses this same function,
   so there is only ONE coordinate system.
*/

function setStarTransform(
  star,
  x,
  y
) {

  star.style.transform =
    `translate(
      calc(-50% + ${x}px),
      calc(-50% + ${y}px)
    )`;

}


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


  movementStatus.textContent =
    "TRACKING";


  observationField.classList.add(
    "observing"
  );


  /*
     Give the interface a short moment
     before beginning the actual motion.
  */

  setTimeout(
    startObservationAnimation,
    650
  );

}


/* =========================================================
   OBSERVATION ANIMATION
   ========================================================= */

function startObservationAnimation() {

  const startTime =
    performance.now();


  function frame(now) {

    const elapsed =
      now - startTime;


    const rawProgress =
      clamp(
        elapsed / OBSERVATION_DURATION,
        0,
        1
      );


    /*
       Smooth visual movement.
    */

    const progress =
      smoothstep(rawProgress);


    /*
       Update the displayed observation
       time continuously from 03:17
       through 03:29.
    */

    const minuteProgress =
      Math.floor(
        rawProgress * 12
      );


    const displayedMinute =
      Math.min(
        17 + minuteProgress,
        29
      );


    observationTime.textContent =
      `03:${String(
        displayedMinute
      ).padStart(2, "0")}`;


    /*
       Move the seven ordinary objects.

       They all drift approximately
       together.

       OBJECT 08 remains exactly 0,0.
    */

    stars.forEach(
      star => {

        const object =
          star.dataset.object;


        if (object === "08") {

          setStarTransform(
            star,
            0,
            0
          );

          return;
        }


        const variation =
          driftVariation[object] ||
          { x: 0, y: 0 };


        const targetX =
          sharedDrift.x +
          variation.x;


        const targetY =
          sharedDrift.y +
          variation.y;


        const x =
          targetX * progress;


        const y =
          targetY * progress;


        /*
           Save the ACTUAL current
           displacement.
        */

        starMotion.set(
          object,
          {
            x: x,
            y: y
          }
        );


        setStarTransform(
          star,
          x,
          y
        );

      }
    );


    /*
       Continue.
    */

    if (rawProgress < 1) {

      observationAnimation =
        requestAnimationFrame(
          frame
        );

    }

    else {

      observationAnimation =
        null;


      finishObservation();

    }

  }


  observationAnimation =
    requestAnimationFrame(
      frame
    );

}


/* =========================================================
   OBSERVATION FINISHED
   ========================================================= */

function finishObservation() {

  if (observationFinished) {
    return;
  }


  observationFinished = true;


  observationTime.textContent =
    "03:29";


  beginButton.textContent =
    "OBSERVATION COMPLETE";


  movementStatus.textContent =
    "NORMAL";


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

        inspectStar(
          star
        );

      }
    );

  }
);


function inspectStar(star) {

  /*
     Once the reference sequence starts,
     object inspection is finished.
  */

  if (referenceSet) {
    return;
  }


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


  /*
     Before the observation is complete,
     displacement values remain unresolved.
  */

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


  /*
     Use the values from our new
     observation model.

     This means what the inspector
     reports is exactly what the
     player watched happen.
  */

  let dx = 0;
  let dy = 0;


  if (object !== "08") {

    const variation =
      driftVariation[object] ||
      { x: 0, y: 0 };


    dx =
      sharedDrift.x +
      variation.x;


    dy =
      sharedDrift.y +
      variation.y;

  }


  deltaX.textContent =
    formatDelta(dx);


  deltaY.textContent =
    formatDelta(dy);


  objectStatus.textContent =
    "TRACKED";


  /*
     OBJECT 08 alone has
     zero displacement.
  */

  if (object === "08") {

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


    polarisBottom.textContent =
      "MOVEMENT VERIFIED";

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
      Math.abs(
        Math.round(value)
      )
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
     Remove selected highlight.

     OBJECT 08 should now be understood
     through movement, not brightness.
  */

  stars.forEach(
    star => {

      star.classList.remove(
        "selected"
      );

    }
  );


  movementStatus.textContent =
    "RECALCULATING";


  polarisBottom.textContent =
    "SETTING REFERENCE";


  referenceQuestion.classList.remove(
    "visible"
  );


  /*
     Fade to interpretation screen.
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
     Name the reference.
  */

  setTimeout(
    () => {

      referenceDesignation.textContent =
        "POLARIS";

    },

    3400
  );


  /*
     Return to the SAME star field.

     No positions are reset.
  */

  setTimeout(
    () => {

      observationField.classList.add(
        "reference-active"
      );


      referenceOverlay.classList.remove(
        "visible"
      );


      startReferenceRotation();

    },

    5200
  );


  /*
     After the player has actually seen
     the field rotate around OBJECT 08,
     remove the archive interface.
  */

  setTimeout(
    () => {

      messageOverlay.classList.add(
        "visible"
      );

    },

    10800
  );


  /*
     Personal message begins only
     after the visual idea has landed.
  */

  setTimeout(
    beginMessageSequence,
    12400
  );

}


/* =========================================================
   REFERENCE ROTATION
   ========================================================= */

function startReferenceRotation() {

  /*
     Find the REAL centre of OBJECT 08
     inside the observation field.

     We use its original CSS position,
     not an assumed 50/50 centre.
  */

  const polaris =
    document.querySelector(
      '.star[data-object="08"]'
    );


  if (!polaris) {
    return;
  }


  const fieldRect =
    observationField
      .getBoundingClientRect();


  /*
     OBJECT 08 itself never moved,
     so its current centre is also
     its reference centre.
  */

  const polarisRect =
    polaris.getBoundingClientRect();


  const centerX =
    polarisRect.left +
    polarisRect.width / 2 -
    fieldRect.left;


  const centerY =
    polarisRect.top +
    polarisRect.height / 2 -
    fieldRect.top;


  /*
     Snapshot every star's position
     BEFORE reference rotation begins.

     This is what prevents snapping.
  */

  const referenceStart =
    new Map();


  stars.forEach(
    star => {

      const object =
        star.dataset.object;


      const rect =
        star.getBoundingClientRect();


      const x =
        rect.left +
        rect.width / 2 -
        fieldRect.left;


      const y =
        rect.top +
        rect.height / 2 -
        fieldRect.top;


      const motion =
        starMotion.get(object) ||
        {
          x: 0,
          y: 0
        };


      referenceStart.set(
        object,
        {
          screenX: x,
          screenY: y,
          transformX: motion.x,
          transformY: motion.y
        }
      );

    }
  );


  /*
     Rotate only a few degrees.

     It should feel astronomical,
     not like a loading spinner.
  */

  const finalAngle =
    7 * Math.PI / 180;


  const startTime =
    performance.now();


  function frame(now) {

    const elapsed =
      now - startTime;


    const rawProgress =
      clamp(
        elapsed / REFERENCE_DURATION,
        0,
        1
      );


    const progress =
      smoothstep(
        rawProgress
      );


    const angle =
      finalAngle * progress;


    stars.forEach(
      star => {

        const object =
          star.dataset.object;


        /*
           Polaris remains absolutely
           fixed throughout.
        */

        if (object === "08") {

          setStarTransform(
            star,
            0,
            0
          );

          return;
        }


        const start =
          referenceStart.get(
            object
          );


        if (!start) {
          return;
        }


        /*
           Position relative to Polaris.
        */

        const relativeX =
          start.screenX -
          centerX;


        const relativeY =
          start.screenY -
          centerY;


        /*
           Rotate that vector.
        */

        const rotatedX =
          relativeX *
            Math.cos(angle) -
          relativeY *
            Math.sin(angle);


        const rotatedY =
          relativeX *
            Math.sin(angle) +
          relativeY *
            Math.cos(angle);


        /*
           Difference between the
           rotated point and its
           starting point.
        */

        const rotationDX =
          rotatedX -
          relativeX;


        const rotationDY =
          rotatedY -
          relativeY;


        /*
           IMPORTANT:

           Add rotation displacement
           ON TOP OF observation
           displacement.

           This is the part the old
           version was missing.
        */

        const finalX =
          start.transformX +
          rotationDX;


        const finalY =
          start.transformY +
          rotationDY;


        starMotion.set(
          object,
          {
            x: finalX,
            y: finalY
          }
        );


        setStarTransform(
          star,
          finalX,
          finalY
        );

      }
    );


    if (rawProgress < 1) {

      referenceAnimation =
        requestAnimationFrame(
          frame
        );

    }

    else {

      referenceAnimation =
        null;


      movementStatus.textContent =
        "REFERENCE FIXED";


      polarisBottom.textContent =
        "OBJECT 08 / REFERENCE";

    }

  }


  referenceAnimation =
    requestAnimationFrame(
      frame
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


    /*
       SIGNAL DETECTED
    */

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

  }
);


/* =========================================================
   COMPLETE
   ========================================================= */

function completeArchive() {

  if (completing) {
    return;
  }


  completing = true;


  /*
     Unlock Archive 07.
  */

  localStorage.setItem(
    "archive06",
    "complete"
  );


  messageOverlay.classList.remove(
    "visible"
  );


  /*
     Completion screen.
  */

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