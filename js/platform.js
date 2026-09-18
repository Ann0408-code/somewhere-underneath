/* =========================================================
   ARCHIVE 02 / PLATFORM
   ========================================================= */


const platformClock =
  document.getElementById(
    "platformClock"
  );


const cameraView =
  document.querySelector(
    ".camera-view"
  );


const cameraLabel =
  document.getElementById(
    "cameraLabel"
  );


const frameStatus =
  document.getElementById(
    "frameStatus"
  );


const train =
  document.getElementById(
    "train"
  );


const signalLetter =
  document.getElementById(
    "signalLetter"
  );


const observedSlots =
  document.getElementById(
    "observedSlots"
  );


const passengerCount =
  document.getElementById(
    "passengerCount"
  );



/* =========================================================
   CLOCK
   ========================================================= */


let fakeHour = 23;

let fakeMinute = 41;

let fakeSecond = 26;


function pad(value) {

  return String(value)
    .padStart(
      2,
      "0"
    );

}


function updatePlatformClock() {


  fakeSecond++;


  if (
    fakeSecond >= 60
  ) {

    fakeSecond = 0;

    fakeMinute++;

  }


  if (
    fakeMinute >= 60
  ) {

    fakeMinute = 0;

    fakeHour++;

  }


  if (
    fakeHour >= 24
  ) {

    fakeHour = 0;

  }


  platformClock.textContent =

    `${pad(fakeHour)}:${pad(fakeMinute)}:${pad(fakeSecond)}`;

}


setInterval(
  updatePlatformClock,
  1000
);



/* =========================================================
   SIGNAL PLAYBACK
   ========================================================= */


const signals = [

  {
    letter: "L",
    brokenLabel: "CAM_RA 02"
  },

  {
    letter: "E",
    brokenLabel: "CAMER_ 02"
  },

  {
    letter: "F",
    brokenLabel: "CAMERA _2"
  },

  {
    letter: "T",
    brokenLabel: "CAME_A 02"
  }

];


let recovered = [];



function playSignal(
  signal
) {


  /* CAMERA SHAKE */

  cameraView
    .classList
    .remove(
      "glitch"
    );


  void cameraView.offsetWidth;


  cameraView
    .classList
    .add(
      "glitch"
    );



  /* BROKEN LABEL */

  cameraLabel.textContent =
    signal.brokenLabel;


  frameStatus.textContent =
    "FRAME LOST";



  /* TRAIN */

  train
    .classList
    .remove(
      "passing"
    );


  void train.offsetWidth;


  train
    .classList
    .add(
      "passing"
    );



  /* LETTER */

  setTimeout(
    () => {


      signalLetter.textContent =
        signal.letter;


      signalLetter
        .classList
        .remove(
          "flash"
        );


      void signalLetter.offsetWidth;


      signalLetter
        .classList
        .add(
          "flash"
        );


    },

    650
  );



  /* RECOVER SIGNAL */

  setTimeout(
    () => {


      recovered.push(
        signal.letter
      );


      updateRecovered();


    },

    1500
  );



  /* RESTORE CAMERA */

  setTimeout(
    () => {


      cameraLabel.textContent =
        "CAMERA 02";


      frameStatus.textContent =
        "FRAME STABLE";


    },

    2100
  );

}



/* =========================================================
   RECOVERED DISPLAY
   ========================================================= */


function updateRecovered() {


  const slots = [
    "_",
    "_",
    "_",
    "_"
  ];


  recovered.forEach(
    (letter, index) => {

      slots[index] =
        letter;

    }
  );


  observedSlots.textContent =
    slots.join("   ");

}



/* =========================================================
   PLAYBACK TIMING
   ========================================================= */


setTimeout(
  () => {

    playSignal(
      signals[0]
    );

  },
  3500
);


setTimeout(
  () => {

    playSignal(
      signals[1]
    );

  },
  8000
);


setTimeout(
  () => {

    playSignal(
      signals[2]
    );

  },
  12500
);


setTimeout(
  () => {

    playSignal(
      signals[3]
    );

  },
  17000
);



/* =========================================================
   SIGNAL REPORT
   ========================================================= */


const platformReport =
  document.getElementById(
    "platformReport"
  );


const signalOverlay =
  document.getElementById(
    "signalOverlay"
  );


const signalClose =
  document.getElementById(
    "signalClose"
  );


const signalInput =
  document.getElementById(
    "signalInput"
  );


const signalSubmit =
  document.getElementById(
    "signalSubmit"
  );


const signalResponse =
  document.getElementById(
    "signalResponse"
  );



platformReport.addEventListener(
  "click",
  () => {

    signalOverlay
      .classList
      .add(
        "visible"
      );


    setTimeout(
      () => {

        signalInput.focus();

      },
      300
    );

  }
);



signalClose.addEventListener(
  "click",
  () => {

    signalOverlay
      .classList
      .remove(
        "visible"
      );

  }
);



signalSubmit.addEventListener(
  "click",
  checkSignal
);



signalInput.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {

      checkSignal();

    }

  }
);



/* =========================================================
   CHECK ANSWER
   ========================================================= */


function checkSignal() {


  const answer =
    signalInput
      .value
      .trim()
      .toUpperCase();


  if (
    answer === "LEFT"
  ) {


    signalResponse.textContent =
      "SIGNAL RECOVERED";


    localStorage.setItem(
      "archive02",
      "complete"
    );


    setTimeout(
      completePlatform,
      1200
    );


  }

  else {


    signalResponse.textContent =
      "SIGNAL INCOMPLETE";


  }

}



/* =========================================================
   COMPLETE
   ========================================================= */


function completePlatform() {


  signalOverlay
    .classList
    .remove(
      "visible"
    );


  passengerCount.textContent =
    "PASSENGER COUNT  00";


  const figure =
    document.querySelector(
      ".figure"
    );


  if (
    figure
  ) {

    figure.style.opacity =
      "0";

  }


  setTimeout(
    showPlatformCompletion,
    2200
  );

}



/* =========================================================
   COMPLETION SCREEN
   ========================================================= */


function showPlatformCompletion() {


  const completion =
    document.getElementById(
      "platformCompletion"
    );


  const top =
    document.getElementById(
      "platformCompleteTop"
    );


  const main =
    document.getElementById(
      "platformCompleteMain"
    );


  const sub =
    document.getElementById(
      "platformCompleteSub"
    );


  const access =
    document.getElementById(
      "platformCompleteAccess"
    );


  completion
    .classList
    .add(
      "visible"
    );


  setTimeout(
    () => {

      top.textContent =
        "ARCHIVE 02 / COMPLETE";

    },
    900
  );


  setTimeout(
    () => {

      main.textContent =
        "No departure was recorded.";

    },
    2400
  );


  setTimeout(
    () => {

      sub.textContent =
        "But someone left.";

    },
    4300
  );


  setTimeout(
    () => {

      access.textContent =
        "ARCHIVE 03 / ACCESS RESTORED";

    },
    6200
  );


  setTimeout(
    () => {

      window.location.href =
        "../index.html#archive";

    },
    8500
  );

}