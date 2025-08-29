# UTSAMA Light Music Club 

This is the website for Light Music Club (LMC), a branch of the University of Toronto Student Anime & Manga Association (UTSAMA). We are a student-led music club focused on performing music from anime, video games, and J-pop.

## Non-Technical Guide

To get started, install Github Desktop and open it. Log into your Github account, choose to clone an online repository, and pick this repository.

Virtually every change you will ever need to make will be in `data.js`. Images are inside the `assets` folder. Follow the pre-existing formatting when you make your changes. You can verify your changes are rendering properly by opening `index.html` with a web browser.

When you have finished, use Github Desktop to make a "commit" (a bundle of changes with a description), then push that commit onto the master repository in Github. The changes will automatically get deployed into utlmc.github.io after some time.

If something fails horrendously or you want to request a feature, please contact a dev.

## Technical Details

The website is implemented as a single `index.html`, which contains every tab (with transitions handled in `index.js`). Text from `data.js` is dynamically rendered into the base HTML by `index.js`. This was done in order to shield non-technical people from having to edit the actual HTML/CSS/JS.

[DESCRIBE THE DATA.JS FORMATTING CONVENTIONS]