import { generateTemplate } from "../main.js";
import Counter from "./components/counter/counter.js"

export default class AppRoot extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    document.addEventListener('DOMContentLoaded', () => {
      // Load HTML template
      generateTemplate('div', '/src/app.html').then(data => {
        this.shadowRoot.appendChild(data)
      })

      // Load CSS styles
      generateTemplate('style', '/src/app.css').then(data => {
        this.shadowRoot.appendChild(data)
      })
    })
  };
};

document.addEventListener('DOMContentLoaded', () => {
  customElements.define('custom-counter', Counter)
})
