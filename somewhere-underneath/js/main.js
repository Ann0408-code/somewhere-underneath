/* =========================================================
   PRIVATE ARCHIVE
   MAIN SYSTEM
   ========================================================= */


/* =========================================================
   ARCHIVE DATABASE
   ========================================================= */


const archives = [

  {
    number: "01",
    name: "CONTROL",
    file: "archive/01-control.html",
    progressKey: "archive01"
  },

  {
    number: "02",
    name: "PLATFORM",
    file: "archive/02-platform.html",
    progressKey: "archive02"
  },

  {
    number: "03",
    name: "臥室",
    file: "archive/03-bedroom.html",
    progressKey: "archive03"
  },

  {
    number: "04",
    name: "時間",
    file: "archive/04-time.html",
    progressKey: "archive04"
  },

  {
    number: "05",
    name: "ことば",
    file: "archive/05-kotoba.html",
    progressKey: "archive05"
  },

  {
    number: "06",
    name: "ポラリス",
    file: "archive/06-polaris.html",
    progressKey: "archive06"
  },

  {
    number: "07",
    name: "Lebewohl",
    file: "archive/07-lebewohl.html",
    progressKey: "archive07"
  }

];



/* =========================================================
   ELEMENTS
   ========================================================= */


const homeScreen =
  document.getElementById(
    "homeScreen"
  );


const archiveIndex =
  document.getElementById(
    "archiveIndex"
  );


const enterArchive =
  document.getElementById(
    "enterArchive"
  );


const returnHome =
  document.getElementById(
    "returnHome"
  );


const archiveList =
  document.getElementById(
    "archiveList"
  );


const availability =
  document.getElementById(
    "availability"
  );


const jstClock =
  document.getElementById(
    "jstClock"
  );


const redDot =
  document.getElementById(
    "redDot"
  );



/* =========================================================
   ARCHIVE PROGRESS
   ========================================================= */


function archiveComplete(index) {


  /*
     index is zero-based.

     Archive 01 is archives[0].
  */


  const archive =
    archives[index];


  return (
    localStorage.getItem(
      archive.progressKey
    ) === "complete"
  );


}



/* =========================================================
   IS ARCHIVE AVAILABLE
   ========================================================= */


function archiveAvailable(index) {


  /*
     Archive 01 is always available.
  */


  if (
    index === 0
  ) {

    return true;

  }


  /*
     Every later archive requires
     the previous one to be complete.
  */


  return archiveComplete(
    index - 1
  );


}



/* =========================================================
   AVAILABLE COUNT
   ========================================================= */


function getAvailableCount() {


  let count =
    0;


  archives.forEach(
    (
      archive,
      index
    ) => {


      if (
        archiveAvailable(index)
      ) {

        count++;

      }


    }
  );


  return count;

}



/* =========================================================
   BUILD ARCHIVE INDEX
   ========================================================= */


function buildArchiveIndex() {


  if (
    !archiveList
  ) {

    return;

  }


  archiveList.innerHTML =
    "";


  archives.forEach(
    (
      archive,
      index
    ) => {


      const entry =
        document.createElement(
          "div"
        );


      entry.classList.add(
        "archive-entry"
      );


      const complete =
        archiveComplete(index);


      const available =
        archiveAvailable(index);


      /*
         STATE
      */


      if (
        complete
      ) {

        entry.classList.add(
          "complete"
        );

      }

      else if (
        available
      ) {

        entry.classList.add(
          "available"
        );

      }

      else {

        entry.classList.add(
          "locked"
        );

      }


      /*
         NUMBER
      */


      const number =
        document.createElement(
          "div"
        );


      number.className =
        "archive-number-list";


      number.textContent =
        archive.number;


      /*
         NAME
      */


      const name =
        document.createElement(
          "div"
        );


      name.className =
        "archive-name";


      name.textContent =
        archive.name;


      /*
         STATUS
      */


      const status =
        document.createElement(
          "div"
        );


      status.className =
        "archive-state-label";


      if (
        complete
      ) {

        status.textContent =
          "COMPLETE";

      }

      else if (
        available
      ) {

        status.textContent =
          "AVAILABLE";

      }

      else {

        status.textContent =
          "LOCKED";

      }


      /*
         ADD ELEMENTS
      */


      entry.appendChild(
        number
      );


      entry.appendChild(
        name
      );


      entry.appendChild(
        status
      );


      /*
         CLICK

         Completed archives remain
         replayable.
      */


      if (
        available ||
        complete
      ) {


        entry.addEventListener(
          "click",
          () => {


            openArchive(
              archive.file
            );


          }
        );


      }


      archiveList.appendChild(
        entry
      );


    }
  );


  /*
     Available count
  */


  if (
    availability
  ) {


    const count =
      getAvailableCount();


    availability.textContent =
      `${String(count).padStart(2, "0")} / 07 AVAILABLE`;


  }


}



/* =========================================================
   OPEN ARCHIVE
   ========================================================= */


function openArchive(path) {


  document.body.classList.add(
    "page-leaving"
  );


  setTimeout(
    () => {


      window.location.href =
        path;


    },

    650
  );


}



/* =========================================================
   SHOW HOME
   ========================================================= */


function showHome() {


  if (
    homeScreen
  ) {

    homeScreen.classList.remove(
      "hidden"
    );

  }


  if (
    archiveIndex
  ) {

    archiveIndex.classList.remove(
      "visible"
    );

  }


  /*
     Remove #archive from URL
     without refreshing.
  */


  if (
    window.location.hash ===
    "#archive"
  ) {


    history.replaceState(
      null,
      "",
      window.location.pathname
    );


  }


}



/* =========================================================
   SHOW INDEX
   ========================================================= */


function showArchiveIndex() {


  buildArchiveIndex();


  if (
    homeScreen
  ) {

    homeScreen.classList.add(
      "hidden"
    );

  }


  if (
    archiveIndex
  ) {

    archiveIndex.classList.add(
      "visible"
    );

  }


  if (
    window.location.hash !==
    "#archive"
  ) {


    history.replaceState(
      null,
      "",
      "#archive"
    );


  }


}



/* =========================================================
   ENTER ARCHIVE
   ========================================================= */


if (
  enterArchive
) {


  enterArchive.addEventListener(
    "click",
    () => {


      showArchiveIndex();


    }
  );


}



/* =========================================================
   RETURN HOME
   ========================================================= */


if (
  returnHome
) {


  returnHome.addEventListener(
    "click",
    () => {


      showHome();


    }
  );


}



/* =========================================================
   HASH
   ========================================================= */


function handleHash() {


  if (
    window.location.hash ===
    "#archive"
  ) {


    showArchiveIndex();


  }

  else {


    showHome();


  }


}


window.addEventListener(
  "hashchange",
  handleHash
);



/* =========================================================
   JST CLOCK
   ========================================================= */


let frozen29 =
  false;


let frozenUntil =
  0;


function updateJSTClock() {


  if (
    !jstClock
  ) {

    return;

  }


  const now =
    new Date();


  /*
     Convert current time into
     Japan Standard Time.
  */


  const formatter =
    new Intl.DateTimeFormat(
      "en-GB",
      {

        timeZone:
          "Asia/Tokyo",

        hour:
          "2-digit",

        minute:
          "2-digit",

        second:
          "2-digit",

        hour12:
          false

      }
    );


  const parts =
    formatter.formatToParts(
      now
    );


  const values =
    {};


  parts.forEach(
    part => {


      if (
        part.type !==
        "literal"
      ) {


        values[
          part.type
        ] =
          part.value;


      }


    }
  );


  const hours =
    values.hour;


  const minutes =
    values.minute;


  const seconds =
    Number(
      values.second
    );


  const timestamp =
    Date.now();


  /*
     Every minute:
     when seconds reach 29,
     hold :29 for approximately
     two seconds.
  */


  if (
    seconds === 29 &&
    !frozen29
  ) {


    frozen29 =
      true;


    frozenUntil =
      timestamp + 2000;


    jstClock.textContent =
      `${hours}:${minutes}:29 JST`;


    return;

  }


  /*
     Keep displaying :29
     during freeze.
  */


  if (
    frozen29 &&
    timestamp <
    frozenUntil
  ) {


    jstClock.textContent =
      `${hours}:${minutes}:29 JST`;


    return;

  }


  /*
     Release freeze.
  */


  if (
    frozen29 &&
    timestamp >=
    frozenUntil
  ) {


    frozen29 =
      false;


  }


  jstClock.textContent =
    `${hours}:${minutes}:${String(seconds).padStart(2, "0")} JST`;


}



/*
   Refresh frequently enough
   for a smooth digital clock.
*/


setInterval(
  updateJSTClock,
  200
);


updateJSTClock();



/* =========================================================
   UNINDEXED SOURCE
   ========================================================= */


function initialiseHiddenSource() {


  if (
    !redDot
  ) {

    return;

  }


  const archiveClosed =
    localStorage.getItem(
      "archiveClosed"
    );


  /*
     Before Archive 07:

     The dot exists visually,
     but cannot be interacted with.
  */


  if (
    archiveClosed !==
    "true"
  ) {

    return;

  }


  /*
     After Archive 07:

     Nothing changes visually.

     No animation.
     No glow.
     No pointer cursor.
     No system warning.

     It simply starts working.
  */


  redDot.classList.add(
    "active"
  );


  redDot.addEventListener(
    "click",
    () => {


      document.body.classList.add(
        "page-leaving"
      );


      setTimeout(
        () => {


          window.location.href =
            "archive/source-08.html";


        },

        650
      );


    }
  );


}



/* =========================================================
   INITIALISE
   ========================================================= */


buildArchiveIndex();


initialiseHiddenSource();


handleHash();
