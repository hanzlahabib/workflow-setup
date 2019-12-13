# Basic Workflow detail

## Installation

```bash
npm install
```
it will install all required dependencies

once packages are installed then  you can run `build` or `dev` command
### `npm run build` command will copy all scss files and js files will shift them into build folder after minification and pollyfilling latest javascript


```bash
npm run build
```
### `npm run dev` command creates local Server and open it for development purpose
```bash
npm run dev
```

## Brief overview regarding `npm run dev`
These are the tasks which are being done after running `npm run dev` command,
## Css task

This task includes transpiling scss files, concating into one, minifying and add browser prefixes for css propertise

## Js Task

this task transpile latest es5, es6, es7 code into old browser compatable using babel and webpack

## Html Task
this task includes copying files from dev folder to build

## Cache Busting task for Css
this task add datetime prefix at the end of css file that helps in css cache clearing for quick development

## BrowserSync task
This task allow us to use development server on local which is also great for cross browser testing due to its sync behaviour

## Image optimization
This task optimize images folder and pipe them to build folder

## Hot reaload
This task allows us to automaticly monitor when something is changed

## Css injecting
This task allows us injecting css directly to browser without reloading which saves time of reloading each time

## Watch Task
This task continuesly listens to change on any of Js, scss, Html files files and then recompile that specific thing into build folder and trigger hot reload
