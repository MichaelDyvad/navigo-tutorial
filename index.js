import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
  renderText,
  setActiveLink,
  adjustForMissingHash,
  loadTemplate, renderTemplate
} from "./utils.js"

import { loadJoke } from "./pages/joke/joke.js"
import {addHandler} from "./pages/navigate/navigate.js";

window.addEventListener("load", async () => {
  const templateAbout = await loadTemplate("./pages/about/about.html")
  const templateProducts = await loadTemplate("./pages/products/products.html")
  const templateJokes = await loadTemplate("./pages/joke/joke.html")
  const templateNavigate = await loadTemplate("./pages/navigate/navigate.html")

  const router = new Navigo("/", { hash: true });
  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on("/", () => renderText("Home", "content"))
    .on("/about", () => renderTemplate(templateAbout, "content"))
    .on( "/products", (match) => {
      renderTemplate(templateProducts, "content")
      if (match.params) {
        document.getElementById("selected-product-id").innerText = match.params.id
      }
    })
    .on("/joke", () => {
      renderTemplate(templateJokes, "content")
      loadJoke()
    })
      .on("/navigate-programatically", (match) => {
        renderTemplate(templateNavigate, "content")
        addHandler(match)
      })
    .on( "/show-match", (match) =>
        renderText(`<pre>${JSON.stringify(match, null, 2)}</pre>`, "content"))
    .notFound(() => renderText("No page for this route found", "content"))
    .resolve()
});


window.onerror = (e) => alert(e)