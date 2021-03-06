
# Todo App in AngularJS

Todo App is written in AngularJS, It includes localDB factory which simulates database CRUD operations from localStorage


## Authors

Created by [Ashutosh Kumar Singh](https://facebook.com/ashutosh.akss). More features will be added soon


## Quick Points
* App uses Grunt for automating tasks
* CSS is generated from Less `assets/css/style.less`
* All CSS & JS files are minified into `todo.min.css` & `todo.min.js` 
* `todo.min.js` includes `jQuery`,`angular.js`,`bootstrap.js`,`toastr.js`,`moment.js`,`jquery-confirm.js` and `angular-moment.js`
* To do any changes in css, run `grunt serve` and change `assets/css/style.less` `grunt-watche` module will automate Less to css conversion and minification of css


## Development

* `npm install` & `sudo npm insall -g grunt-cli` to setup and install all dependent modules
* (if you wish to run end-to-end tests): `karma start karma.conf.js`
* `grunt` to convert less to css, minify css & uglify js 
* `grunt makedoc` to generate docs (read Documentation below for how to test docs locally).
* `grunt serve` to run live reload server at port 9000 & watch files

### Documentation

* Documentation is generated into `./docs`.  To test documentation properly, follow these steps:
  1. Clone todoapp`todoapp`
    - `git clone git@github.com:ashutosh-akss/todoapp`
  2. Start grunt express server from todoapp
    - `cd todoapp`
    - `grunt serve`
  3. to rebuild docs
    - `grunt makedoc`
  4. Open http://localhost:9000/docs and see your changes! Re-run `grunt makedoc` again whenever you change something, and grunt will update the site


## LICENSE

Todo App is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.