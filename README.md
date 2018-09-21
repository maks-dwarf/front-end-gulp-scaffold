# Gulp + SCSS and JS compilation and Browser reload
This is a gulp setup, which will help you to develop great webapplication easily..
All dependencies are defined in package.json
All setting are in package.json and gulpfile.js

## When do I need it?
It can be used when you need to work with basic setup without Angular/Vue/React. It can definately be adjusted to be used with frameworks, but maybe typescript or other specific things have to be added..
I felt like we need some setup like this if we not work in Laravel, where laravelmix can be used..

## What does it do?
It takes files  '/jquery/dist/jquery.js' and others and compiles them into main.min.js file into dist/js folder..

It takes 'src/css/main.scss' and compiles info main.min.css file into dist/css folder..

- transpiles ES6 and ES7 to VanillaJs(ES5), which is supported by major browsers
- supports include function in .scss
- DOES NOT support require() function in Javascript.. You need to include files in "js" gulp task in gulpfile.js.. look how it is donw now, and just add more ;)
- compiles Javascript, concats all files into one main.js file, and outputs it to selected folder
- compiles SCSS to CSS, includes all other files from main file, creates one main.css file, and outputs it to selected folder 
- watching JS and SCSS files, recompiles them, when they are changed and reloads the browser..

## Installation:
cd into root folder with package.json file
run "npm i"

## Running:
run "npm run dev" or "gulp" to start development and watching files
"gulp" command will run "default" task, which is defined in "gulpfile.js"
go to "localhost:3000"

## Stop node from watching files:
press "Ctrl + C" in terminal/command line window