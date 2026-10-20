/* ============================================================
   EDIT THIS FILE to personalise the whole website.
   Everything below shows up automatically on the pages.
   ============================================================ */

const CONFIG = {
  herName: "TEHREEM",          // <-- her name or nickname
  yourName: "YOUSUF",       // <-- your name (shown in the letter + footer)

  // Birthday date (month is 1-12). Used for the countdown.
  birthday: { month: 10, day: 21 },

  // Her photos. Put image files inside the "images" folder and
  // write their file names here. Add or remove lines as you like.
  photos: [
    { src: "images/1.jpeg", caption: "The day I knew you were special" },
    { src: "images/2.jpeg", caption: "Our favourite place" },
    { src: "images/4.jpeg", caption: "That smile, every time" },
    { src: "images/6.jpeg", caption: "Adventures with you" },
    { src: "images/5.jpeg", caption: "Best day ever" },
    { src: "images/7.jpeg", caption: "Us, always" }
  ],

  // Words that type out on the home page
  heroLines: [
    "Happy Birthday!",
    "You make every day brighter.",
    "This one is just for you."
  ],

  // "Reasons I love you" generator (surprise page)
  reasons: [
    "Your smile can fix my worst day.",
    "You laugh at my silly jokes.",
    "You are kind to everyone you meet.",
    "You make ordinary moments feel special.",
    "You believe in me even when I don't.",
    "Your voice is my favourite sound.",
    "You are beautiful inside and out.",
    "With you, home is a person."
  ],

  // Timeline on the memories page
  timeline: [
    { when: "The beginning", text: "The day we first met and everything changed." },
    { when: "First date",    text: "Nervous smiles and a Something I will never forget." },
    { when: "Our Movie Date", text: "Getting lost together and loving every minute." },
    { when: "Today",         text: "Still choosing you, every single day." }
  ],

  // The letter on the surprise page (cards flip to reveal each part)
  letterCards: [
    { front: "Open me first", back: "Happy Birthday! Today the world celebrates the day you were born, and I celebrate the day you became my everything." },
    { front: "Thank you", back: "Thank you for the laughter, the patience, and for being the person I can be completely myself with." },
    { front: "My promise", back: "I promise Tehreem tumhri Life 360 degree badlounga and khushiyon ka anbaar lagadunga kbh bharosa ni todunga and princess bana k rakhunga ." },
    { front: "My wish", back: "I wish k apko duniya ki woh har chee lakay dun jispe tumhri nazar jaye or Princess bana k rakhun" }
  ],

  // Little quiz about the two of you. Change the questions to real ones!
  quiz: [
    { q: "Tumse kitna Pyar krta hun?", options: ["Mujhy Kbh ni pata chlskta", "Bht Ziada", "Infinite", "Bht bht Ziada"], answer: 0 },
    { q: "What is my favourite thing about you?", options: ["Your smile", "Your kindness", "Your laugh", "All of the above"], answer: 3 },
    { q: "Kia M tumhray liye kuch bh krskta hun", options: ["Dont Know", "Shayad", "NO", "Mujhy Yaqeen h krskty ho"], answer: 3 }
  ],

  // Final message inside the gift box
  giftMessage: "You are my favourite person, my best friend, and my greatest gift. I love you. Happy Birthday!"
};
