# Iotopia-site
Website for Iotopia Solutions, Inc.

## Instructions

To start developing:

```bash
npm install
```

To run the web server:

```bash
npm run gulp
```

See `gulpfile.js` for more gulp tasks.

## Notes

I started refactoring the site from a buckets-of-type structure to a
component-oriented structure.  Also, the source code (including view templates)
has been moved to the `src` folder.  The old templates in the `views` folder are
no longer used.  

I haven't touched the css, yet.

Code is built into a `build` folder and run from there.  (See `gulpfile.js`.)
