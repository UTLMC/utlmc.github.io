# UT-SAMA Light Music Club 

This is the website for Light Music Club (LMC), a branch of the University of Toronto Student Anime & Manga Association (UTSAMA). We are a student-led music club focused on performing music from anime, video games, and J-pop.

## File Structure

The website is implemented as a single `index.html` with accompanying CSS and JS files of the same name. Text from `data.js` is dynamically rendered into the base HTML with `index.js`. This is chosen for a few reasons:
- Manually editing the HTML file every time is a bad idea
- The club cannot expect a steady stream of CS skill so it needs basic functionality like updating data to be as easy as possible, hence we separate data from code. SEO may suffer if data is not hard-coded into `index.html` so we keep small/rarely-changing data hard-coded.
- React, other frontend technologies, or a proper backend all require use of the command line, which is inaccessible for non-CS students and even early CS students.

In the future, `database.html` will be a simpler interface for non-technical people to upload CSVs from "LMC Database", upload `data.js`, and save changes to `data.js`.

There is also a separate setlist website for usage during concerts at `setlist.html`.


## Updating Data (as of 3 May 2026)

Go to the Google Sheets file called "LMC Database" and make your changes there. Once complete, hit `File -> Download -> Comma Separated Values (.csv)` for each of the four main tabs (People, Songs, Performances, Events). Then go to `utlmc.github.io/database`, upload each file, and press the "Parse Data" button. Open the development menu (press F12 on Windows Chrome), navigate to the "Console" tab, and right-click + copy object on the objects that pop up. Paste them in the correct spot in `data.js`.