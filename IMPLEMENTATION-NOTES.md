Implementation Notes
====================

Foreward
--------

This is my second pass at the programming quiz, implementing a solution utilizing third party libraries of my choice.

Setup
-----

It is recommended to serve this via a web server in some capacity (either IIS, a thin node.js server like serve-static, etc) as it does rely on fetching data with $.getJSON(), which may trigger an error depending on your browser's security configuration when running straight from disk.

Dependencies
------------

Node.js is required to build.  Build dependencies are listed in the package.json file and include:
* grunt and grunt-cli - For setting up and running build tasks.
* less - For building CSS from LESS.
* webpack - For bundling javascript and mustache templates.

Additional dependencies are pulled from a Cloudflare CDN:
* jQuery 3.2.1 - Dependency for Backbone
* Underscore.js 1.8.3 - Dependency for Backbone
* Backbone.js 1.3.3 - Provides Model/View framework, including utilities for fetching data from a server.

Setup
-----

* Run npm init to pull down dependent node modules.
* Once dependencies are installed, run 'grunt build' to build the CSS and JS bundles.
  * You can run this locally with 'node .\node_modules\grunt-cli\bin\grunt' if you don't have grunt-cli installed locally.  Additionally, if you have the latest version of npm, you can use the npx utility.