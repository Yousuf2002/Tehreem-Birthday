/* ============================================================
   EDIT THIS FILE to personalise the whole website.
   Everything below shows up automatically on the pages.
   ============================================================ */

const CONFIG = {
  herName: "TEHREEM",          // <-- her name or nickname
  yourName: "YOUSUF",       // <-- your name (shown in the letter + footer)

  // Birthday date (month is 1-12). Used for the countdown.
  birthday: { month: 10, day: 22 },

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

/* ============================================================
   SORRY PAGE - yahan apna text likhein (sirf quotes ke andar badlein).
   Har cheez ko add / delete kar sakte hain: bas ek line copy-paste karein
   ya mita dein. Comma (,) lagana na bhoolein.
   ============================================================ */

const SORRY = {

  // Opening heading under "I'm Sorry"
  heroLine: "Tehreem Mujhy Maaf krden ik mainay ghlt kia or hurt kia apko choti si koshish hai yeh agr apko lgta h isko dekh k apka dil saaf hoga tw hi agye ki website dekhiyega",

  // Optional: apna WhatsApp number country code ke saath, bina + ya space ke.
  // Example Pakistan: "923001234567". Khali chhorein to wo khud contact chunegi.
  whatsapp: "923133056077",

  // 1) LANTERNS - har lantern par tap karne se ek note khulta hai.
  //    Jitne chahein notes likhein (6 se 12 achay lagte hain).
  lanterns: [
    { title: "Note 1 - The truth",      text: "I'm sorry. I know I hurt you, and I never wanted to. Writing this because main ni chahta k hmry diloun kuch bh baat rahay." },
    { title: "Note 2 - Meri Ghalti",     text: "Tumhain lekay thoda sa extra possesive hun tehreem hawa sy jalta hun jo tmhe touch krle Tehreem kl mainay ghalat kia itni badi koi bt ni thi tehreem mujhy maaf krden kl jo jo bakwas ki usky liye dil sy sorry meri tabiyat thk ni thi isliye bh mainay kuch extra boldia baby main apko khush dekhna chahta hun tehreeem bht khush dekhna chahta hun" },
    { title: "Note 3 - Main kia feel kr rha",   text: "Main bht ziada sharminda hun jo bh mainay bola or jis jis bt sy hurt kia apko tehreem meri jannat tumhray andar hai." },
    { title: "Note 4 - Reel wali baat",    text: "Jis time apny mujhy reel bheji us time m already bht off and low tha tehreem but bd m mainay jb soucha apny kaha k mainay bola sb kaam krungi but face ni aye tw sun k laga tehreem mainay heera psnd kia h tehreem meri us bakwaas k liye dil sy maafi sorry meri jaan." },
    { title: "Note 5 - Colleagues k sth jana", text: "Tehreem apko yeh bolunga baby ap agye bh jyn inky sth koi masla ni bs try yeh kijyega k girls bh hun tw bht ziada satisfy rahunga m warna promise abse koi masla ni jahan meri itni sunti hain yahan m sunlunga." },
    { title: "Note 6 - Comment on story",     text: "Tehreem meri jaan tum puray zamanay puri duniya k smny sirf meri property lagni chahye ho ik apny private m reply krna tha but apny story pe comment krdia koi bt ni but m chahta hun duniya dekhy tw bolay yeh yousuf ki biwi hai Please next time woh kuch bh bolay ap comment m ni boliyega Tehreem sbko pata hona chahye tum sirf meri ho." },
    { title: "Note 7 - Mery Galay lagogi?",      text: "Mujhse ghlti hui h m bht ziada extra possesive hun jo mujhy ni hona chahye tha mujhy maaf krdo or meri princess bankay galay lagjao please." },
    { title: "Note 8 - One request",    text: "Please give me one more chance to show you that I can do better." }
  ],

  // 2) ENVELOPE LETTER - lamba khat. Har line ek paragraph hai.
  letter: {
    greeting: "Mera Bacha,",
    paragraphs: [
      "I don't know how to say this perfectly, so I'm just going to say it honestly.",
      "I'm sorry for what I did. It wasn't fair to you, and you didn't deserve it.",
      "Tehreem Mujhy sirf itna pata h tmhry baghair m kuch ni hun sb kuch tum hi ho mera Please mujhy maaf krdo Tehreem main abse apki bh sunounga jo shyd m ni sunta tha or apko khush rakhnay ki koshish krunga tehreem iloveyousomuch Tehreem And i am extremely sorry for all mistakes i have done.",
      "I love you more than any words on this page can show."
    ],
    signoff: "Always yours,"
  },

  // 3) APOLOGY JAR - button dabane par in mein se koi ek note nikalta hai.
  jar: [
    "Sorry for every time I made you hurt.",
    "Sorry for the words which i have spoken wrong.",
    "Sorry for the words I can't take back.",
    "Sorry for make you feel like you are in a cage.",
    "Sorry, and thank you for still being with me Tehreem.",
    "Sorry. I will try harder, every single day.",
    "Sorry for forgetting how lucky I am to have you.",
    "Sorry, Please forgive me and be my little baby girl."
  ],

  // 4) PROMISES - tick karne wali list.
  promises: [
    "Main apki khushi bh dekhunga.",
    "Main apki baat bh sunounga.",
    "Hamesha sth khara rahunga.",
    "Main kbh apko ab rok tok wala word bolnay ka moqa ni dunga (i will try my best).",
    "Main apki khushi k liye sb krunga.",
    "Main Agye kbh apko hurt na krny ki try krunga."
  ],

  // 5) FORGIVE ME? section
  forgiveQuestion: "KIA MUJHY MAAF KROGI?",
  noTexts: ["No", "Pakki Baat hai?", "Please?", "Souchlen...", "Main Kfc khilaounga", "Guriya please?", "Acha baee Yes Dabaden"],
  yesMessage: "Thank you for giving me another chance. I promise to make you smile more than I ever made you cry. I love you. 💖",

  // 6) Uske liye jawab likhne ka box
  replyTitle: "Want to tell me something?",
  replyHint: "Agr meri Sorry Accept hogyi h tw yahan mujhy pyra sa iloveyou bolo or send message on whatsapp krden"
};

