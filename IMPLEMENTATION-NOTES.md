Implementation Notes
====================

Foreward
--------

Per my phone interview with Karmela, I was made to believe that the applications I would write at Scientific Games would more than likely include few dependencies/third-party libraries, and which ones included wouldn't necessarily be the most up-to-date versions.  Because of this, I've opted to implement this solution in a manner that would introduce as few dependencies as possible that are slightly older than their current version.

Setup
-----

It is recommended to serve this via a web server in some capacity (either IIS, a thin node.js server like serve-static, etc) as it does rely on fetching data with $.getJSON(), which may trigger an error depending on your browser's security configuration when running straight from disk.

Dependencies
------------

* jQuery 2.2.4 (served via CloudFlare CDN)


Places for Improvement
----------------------

The implementation is "modularized" into several files, and would be better served bundled and minified.

If I were to implement this in another manner, I would pull in a few other libraries/utilities for this application to make my life easier:
* node.js - Runtime for building/bundling/minifying code.
  * grunt-cli - Task runner, provides tasks for building/bundling/minifying code.
    * grunt-webpack - Provides easy configuration of webpack for grunt tasks.
  * less - Allows for writing LESS instead of CSS for better maintainability.
  * webpack - Bundles javascript/templates/etc into a single source file for distribution.
    * grunt-contrib-mustache - Provides webpack with the ability to include/compile mustache templates to render with on the client.

With the inclusion of Webpack, I would switch to a proper module system (preferably CommonJS).