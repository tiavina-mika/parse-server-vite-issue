# parse-server-vite-issue
Parse server issue with vite when running the server

W hen running the server with `yarn dev`, got this error in the browser console:
inherits.js:9 Uncaught TypeError: Super expression must either be null or a function
    at _inherits (inherits.js:9:11)
    at LiveQuerySubscription.js:149:18
    at node_modules/parse/lib/browser/LiveQuerySubscription.js (LiveQuerySubscription.js:197:1)
    at __require2 (chunk-7FP5O474.js?v=ba11ca24:10:50)
    at node_modules/parse/lib/browser/LiveQueryClient.js (LiveQueryClient.js:63:53)
    at __require2 (chunk-7FP5O474.js?v=ba11ca24:10:50)
    at node_modules/parse/lib/browser/ParseLiveQuery.js (ParseLiveQuery.js:41:47)
    at __require2 (chunk-7FP5O474.js?v=ba11ca24:10:50)
    at node_modules/parse/lib/browser/Parse.js (Parse.js:339:19)
    at __require2 (chunk-7FP5O474.js?v=ba11ca24:10:50)