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

If you need to run or debug the email server, you must supply the email
password as an `env` var on the command line:

```bash
EMAIL_PASS="really bad password" npm run gulp
```

See the `app/configure` files for more `env` var overrides, such as `PORT`:

```bash
PORT=8080 EMAIL_PASS="really bad password" npm run gulp
```

See `gulpfile.js` for more gulp tasks.

## Notes

The codebase uses server-side React to place the blog posts into the index.html
page, but the rest of the templates are rendered via a super simple template
function that uses `${token}` place markers.  We should decide to use either
React or the super simple template function.

I refactored the site from a buckets-of-type structure to a component-oriented
structure.  The view templates have been moved to the `src` folder.  The old
templates in the `views` folder are no longer used.  

I haven't moved the css into the component folders, yet.

Code is built into a `build` folder and run from there.  (See `gulpfile.js`.)
