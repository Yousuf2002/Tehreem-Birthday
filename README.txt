BIRTHDAY WEBSITE - HOW TO CUSTOMISE
===================================

1. Open index.html in any browser (double-click it). No server needed.

2. ADD HER PHOTOS
   - Copy her pictures into the "images" folder.
   - Open js/config.js and edit the "photos" list so the file names match
     (for example "images/us-at-the-beach.jpg") and write a caption for each.
   - Add or remove lines to show more or fewer photos.
   - Until you add photos, pretty placeholders are shown.

3. CHANGE THE TEXT
   - Everything (her name, your name, messages, quiz, reasons, timeline,
     letter) is in js/config.js. Edit the words inside the quotes.
   - The birthday is already set to 21 October for the countdown.

4. SEND IT TO HER (no backend needed)
   Easiest: go to https://app.netlify.com/drop, drag the whole
   "birthday-site" folder onto the page, and you get a link you can send her.
   Other free options: GitHub Pages, Cloudflare Pages.
   Or just zip the folder and send it; she opens index.html.

Pages: index.html (home), memories.html (slideshow, photo cards, timeline),
surprise.html (cake, reasons, letter, quiz, gift box).
