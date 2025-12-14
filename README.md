# UTSAMA Light Music Club 

This is the website for Light Music Club (LMC), a branch of the University of Toronto Student Anime & Manga Association (UTSAMA). We are a student-led music club focused on performing music from anime, video games, and J-pop.

## Non-Technical Guide (Execs)

In most scenarios, it suffices to go to the database website (utlmc.github.io/database), make changes, save the corresponding `data.js` file, then replace the old version of that file. Occasionally, you may also need to edit text in `index.html`. Images are inside the `assets` folder. You can verify your changes are rendering properly by opening `index.html` with a web browser.

If you don't want to install Github Desktop, then every time you want to make a change you should download the repository and unzip it. Edit `index.html`, log into the LMC account, then manually upload it to the repository.

If you want to use Github Desktop, use it to log into your Github account, clone an online repository, and pick this one. This will create a local copy of the Github repository, which you can edit and save back onto Github repository. Use the "fetch/pull" button to import the latest changes from the repository.

When you have finished, use Github Desktop to make a "commit" (a bundle of changes with a description. You can make whatever description oyu want), then push that commit onto the master repository in Github. The changes will automatically become visible on utlmc.github.io after some time.

If something fails horrendously or you want to request a feature, please contact a dev.

## Technical Guide

The website is implemented as a single `index.html`. Text from `data.js` is dynamically rendered into the base HTML using `index.js`. This was done in order to shield non-technical people from having to edit the actual HTML/CSS/JS as much as possible, but makes SEO a bit more difficult
