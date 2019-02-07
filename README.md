// TODO: In this demo, the chunks on the chunk-server render the element.
Instead nh-chunk should just register a custom element in the window.
Then the portal should use the custom element as it would a standard
element. That would prevent the chunks from having to be concerned with
not registering themselves as duplicate elements on the window. It would
also reduce the http traffic (or it would reduce all of the code that
would have to be written in nh-chunk to optimize the http traffic).
// TODO: CSS should be loaded before adding the chunk to the DOM. This problem
should naturally go away with the implementation of the TODO above.
// TODO: slow chunks shouldn't effect fast chunks
consider both slow downloading and slow rendering once the chunk is
downloaded
// TODO: failing chunks shouldn't effect succeeding chunks
// TODO: who is responsible for sizing chunks?
// TODO: fragment falls more inline with industry terminology than chunk
// TODO: there is work to do to get Angular to cooperate

Once you download the repo, execute the following commands in the repo's root
to run the chunk-server...

```
cd ./chunk-server
npm install
node ./src/host.js
```

Open http://localhost:8090/bakery/dist/index.html. You should see the bakery app.

In a separate command prompt, execute the following commands in the repo's root
to run the portal...

```
cd ./portal
npm install
node ./src/host.js
```

Open http://localhost:8091.
