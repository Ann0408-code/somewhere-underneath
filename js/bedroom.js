/* =========================================================
   ARCHIVE 03 / 臥室
   ========================================================= */


const inspector =
  document.getElementById(
    "bedroomInspector"
  );


const roomStatus =
  document.getElementById(
    "roomStatus"
  );


const roomStatusContainer =
  document.querySelector(
    ".room-status"
  );


const blanket =
  document.getElementById(
    "blanket"
  );


const hiddenPhoto =
  document.getElementById(
    "hiddenPhoto"
  );


const missingTime =
  document.getElementById(
    "missingTime"
  );



/* =========================================================
   STATE
   ========================================================= */


let bedInspections =
  0;


let photoFound =
  false;


let completing =
  false;



/* =========================================================
   ROOM DATA
   ========================================================= */


const roomObjects = {


  bed: {

    name:
      "床",

    state:
      "已整理",

    time:
      "03:11",

    description:
      "毯子折了兩次。"

  },


  desk: {

    name:
      "書桌",

    state:
      "已清空",

    time:
      "03:13",

    description:
      "沒有留下任何攤開的東西。"

  },


  drawer: {

    name:
      "抽屜",

    state:
      "已關閉",

    time:
      "03:14",

    description:
      "私人物品已清點完畢。"

  },


  waste: {

    name:
      "垃圾桶",

    state:
      "空",

    time:
      "03:16",

    description:
      "沒有需要處理的物品。"

  },


  door: {

    name:
      "門",

    state:
      "已上鎖",

    time:
      "03:17",

    description:
      "沒有離開紀錄。"

  }


};



/* =========================================================
   ROOM OBJECTS
   ========================================================= */


const roomObjectButtons =
  document.querySelectorAll(
    "[data-object]"
  );


roomObjectButtons.forEach(
  button => {


    button.addEventListener(
      "click",
      () => {


        const objectName =
          button.dataset.object;


        inspectObject(
          objectName
        );


      }
    );


  }
);



/* =========================================================
   INSPECT OBJECT
   ========================================================= */


function inspectObject(
  objectName
) {


  const object =
    roomObjects[
      objectName
    ];


  if (!object) {

    return;

  }


  inspector.innerHTML = `

    <div class="room-record-name">
      ${object.name}
    </div>


    <div class="room-record-state">
      ${object.state}
    </div>


    <div class="room-record-time">
      ${object.time}
    </div>


    <div class="room-record-description">
      ${object.description}
    </div>

  `;



  /*
      BED IS DIFFERENT.

      First click:
      normal inspection.

      Second click:
      move blanket and
      reveal the photograph.
  */


  if (
    objectName ===
    "bed"
  ) {


    bedInspections++;


    if (
      bedInspections >= 2 &&
      !photoFound
    ) {


      revealPhoto();


    }


  }


}



/* =========================================================
   NOTE ON CABINET
   ========================================================= */


const floorNote =
  document.getElementById(
    "floorNote"
  );


const noteOverlay =
  document.getElementById(
    "noteOverlay"
  );


const noteClose =
  document.getElementById(
    "noteClose"
  );


floorNote.addEventListener(
  "click",
  event => {


    event.stopPropagation();


    noteOverlay
      .classList
      .add(
        "visible"
      );


  }
);


noteClose.addEventListener(
  "click",
  () => {


    noteOverlay
      .classList
      .remove(
        "visible"
      );


  }
);



/* =========================================================
   REVEAL PHOTO
   ========================================================= */


function revealPhoto() {


  photoFound =
    true;


  /*
      Move blanket.
  */

  blanket
    .classList
    .add(
      "moved"
    );


  /*
      Archive suddenly admits
      that the room is incomplete.
  */

  roomStatus.textContent =
    "INCOMPLETE";


  roomStatusContainer
    .classList
    .add(
      "incomplete"
    );


  /*
      Photo appears after
      blanket movement.
  */

  setTimeout(
    () => {


      hiddenPhoto
        .classList
        .add(
          "visible"
        );


    },

    900
  );


}



/* =========================================================
   OPEN PHOTO
   ========================================================= */


const photoOverlay =
  document.getElementById(
    "photoOverlay"
  );


hiddenPhoto.addEventListener(
  "click",
  event => {


    event.stopPropagation();


    /*
        Recover missing
        03:12 record.
    */

    missingTime.textContent =
      "03:12";


    missingTime
      .classList
      .add(
        "recovered"
      );


    photoOverlay
      .classList
      .add(
        "visible"
      );


  }
);



/* =========================================================
   REMOVE PHOTO
   ========================================================= */


const removePhoto =
  document.getElementById(
    "removePhoto"
  );


removePhoto.addEventListener(
  "click",
  () => {


    photoOverlay
      .classList
      .remove(
        "visible"
      );


    /*
        Archive removes
        the photograph.
    */

    hiddenPhoto
      .classList
      .remove(
        "visible"
      );


    roomStatus.textContent =
      "COMPLETE";


    roomStatusContainer
      .classList
      .remove(
        "incomplete"
      );


    /*
        For a moment,
        everything looks correct.
    */


    setTimeout(
      () => {


        roomStatus.textContent =
          "INCOMPLETE";


        roomStatusContainer
          .classList
          .add(
            "incomplete"
          );


      },

      1200
    );


    /*
        But the photograph
        comes back.
    */


    setTimeout(
      () => {


        hiddenPhoto
          .classList
          .add(
            "visible"
          );


      },

      1900
    );


  }
);



/* =========================================================
   KEEP PHOTO
   ========================================================= */


const keepPhoto =
  document.getElementById(
    "keepPhoto"
  );


keepPhoto.addEventListener(
  "click",
  () => {


    if (
      completing
    ) {

      return;

    }


    completing =
      true;


    photoOverlay
      .classList
      .remove(
        "visible"
      );


    /*
        Save progress.
    */

    localStorage.setItem(
      "archive03",
      "complete"
    );


    /*
        Someone responds.
    */

    setTimeout(
      showGoodMessage,
      900
    );


  }
);



/* =========================================================
   "很好。"
   ========================================================= */


function showGoodMessage() {


  const overlay =
    document.getElementById(
      "bedroomMessageOverlay"
    );


  const message =
    document.getElementById(
      "bedroomMessage"
    );


  /*
      Reset in case page state
      changed previously.
  */

  message.textContent =
    "";


  message.style.opacity =
    "1";


  overlay
    .classList
    .add(
      "visible"
    );


  /*
      Let the empty black screen
      remain for a moment.
  */

  setTimeout(
    () => {


      message.textContent =
        "很好。";


    },

    1100
  );


  /*
      Make it disappear again.
  */

  setTimeout(
    () => {


      message.style.opacity =
        "0";


    },

    3300
  );


  /*
      Move to completion screen.
  */

  setTimeout(
    () => {


      overlay
        .classList
        .remove(
          "visible"
        );


      showCompletion();


    },

    4500
  );


}



/* =========================================================
   COMPLETION
   ========================================================= */


function showCompletion() {


  const completion =
    document.getElementById(
      "bedroomCompletion"
    );


  const top =
    document.getElementById(
      "bedroomCompleteTop"
    );


  const main =
    document.getElementById(
      "bedroomCompleteMain"
    );


  const second =
    document.getElementById(
      "bedroomCompleteSecond"
    );


  const access =
    document.getElementById(
      "bedroomCompleteAccess"
    );


  completion
    .classList
    .add(
      "visible"
    );


  /*
      ARCHIVE COMPLETE
  */

  setTimeout(
    () => {


      top.textContent =
        "ARCHIVE 03 / COMPLETE";


    },

    900
  );


  /*
      First sentence.
  */

  setTimeout(
    () => {


      main.textContent =
        "有些東西不是遺失了。";


    },

    2400
  );


  /*
      Second sentence.
  */

  setTimeout(
    () => {


      second.textContent =
        "只是被藏起來了。";


    },

    3900
  );


  /*
      Unlock next archive.
  */

  setTimeout(
    () => {


      access.textContent =
        "ARCHIVE 04 / ACCESS RESTORED";


    },

    5800
  );


  /*
      Return to archive index.
  */

  setTimeout(
    () => {


      window.location.href =
        "../index.html#archive";


    },

    8000
  );


}