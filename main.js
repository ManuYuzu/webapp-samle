import AppRoot from "./src/app.js";

customElements.define('app-root', AppRoot)

export const generateTemplate = async (type, url) => {
  let result

  await fetch(url)
    .then(res => res.text())
    .then(data => {
      const template = document.createElement(type)
      template.innerHTML = data.trim()
      result = template
    })
    .catch(err => {
      console.error('Error loading template:', err);
    })

  return result
}