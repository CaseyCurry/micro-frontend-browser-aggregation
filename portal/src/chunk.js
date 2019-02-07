class Chunk extends HTMLElement {
  constructor() {
    super();
    // this.innerChunk = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    fetch(this.chunkFile).then(response => {
      // simulate a slow chunk to make sure it renders in the correct place
      const timeout =
        this.getAttribute("src").indexOf("barista") >= 0 ? 1500 : 0;
      setTimeout(() => {
        if (response.ok) {
          response.text().then(body => {
            const scrubbedChunks = this.scrubInnerChunk(body);
            // this.innerChunk.innerHTML = scrubbedChunks.markup;
            this.innerHTML = scrubbedChunks.markup;
            scrubbedChunks.scriptAppenders.forEach(appender => appender());
          });
        }
      }, timeout);
    });
  }

  get chunkFile() {
    const src = this.getAttribute("src");
    const file = src[src.length - 1] === "/" ? "index.html" : "/index.html";
    return src + file;
  }

  hash(x) {
    // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    let hash = 0;
    let chr;
    if (x.length === 0) {
      return hash;
    }
    for (let i = 0; i < x.length; i++) {
      chr = x.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash;
  }

  scrubInnerChunk(markup) {
    const chunkSrc = this.getAttribute("src");
    const parsedMarkup = new DOMParser().parseFromString(markup, "text/html");

    const links = parsedMarkup.getElementsByTagName("link");
    markup = this.scrubCss(markup, chunkSrc, links);

    const scripts = parsedMarkup.getElementsByTagName("script");
    return this.scrubScripts(markup, chunkSrc, scripts);
  }

  scrubCss(markup, chunkSrc, links) {
    Array.from(links).forEach(link => {
      const originalUrl = link.getAttribute("href");
      try {
        /* This will throw an exception if the path is relative. It will then
         be made absolute in the catch. */
        new URL(originalUrl);
      } catch {
        const newUrl =
          (chunkSrc[chunkSrc.length - 1] === "/" ? chunkSrc : chunkSrc + "/") +
          originalUrl;
        /* String.replace only replaces the first instance of the originalUrl.
           That's what we want for each iteration of element. */
        markup = markup.replace(originalUrl, newUrl);
      }
    });
    return markup;
  }

  scrubScripts(markup, chunkSrc, scripts) {
    const scrubbedScripts = {
      markup: markup,
      scriptAppenders: []
    };

    /* This is used to make sure there is a unique container for each script in
       the case where an inner chunk has one script in two places. */
    let scriptCount = 0;

    Array.from(scripts).forEach(script => {
      const originalUrl = script.getAttribute("src");
      const scriptId = "s" + this.hash(`${originalUrl}.${scriptCount++}`);
      let newUrl = originalUrl;

      try {
        /* This will throw an exception if the path is relative. It will then
         be made absolute in the catch. */
        new URL(originalUrl);
      } catch {
        newUrl =
          (chunkSrc[chunkSrc.length - 1] === "/" ? chunkSrc : chunkSrc + "/") +
          originalUrl;
      }

      scrubbedScripts.markup = scrubbedScripts.markup.replace(
        script.outerHTML
          .replace('defer=""', "defer")
          .replace('async=""', "async"),
        `<script-container id="${scriptId}"></script-container>`
      );

      const scriptAppender = () => {
        const scriptElement = document.createElement("script");
        scriptElement.src = newUrl;
        scriptElement.defer = script.getAttribute("defer") == false;
        scriptElement.async = script.getAttribute("async") == false;
        // const scriptContainer = this.innerChunk.getElementById(scriptId);
        const scriptContainer = this.querySelector(`#${scriptId}`);
        scriptContainer.appendChild(scriptElement);
      };
      scrubbedScripts.scriptAppenders.push(scriptAppender);
    });

    return scrubbedScripts;
  }
}

window.customElements.define("nh-chunk", Chunk);
