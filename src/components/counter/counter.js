import { generateTemplate } from "../../../main.js";

export default class Counter extends HTMLElement {
  constructor() {
    super();

    let valueElement
    let incrementOneButton
    let decrementtOneButton

    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Load HTML template
    generateTemplate('div', '/src/components/counter/counter.html').then(data => {
      data.classList.add('counter')

      this.valueElement = data.querySelector('#value');
      this.incrementOneButton = data.querySelector('#increment_1')
      this.decrementtOneButton = data.querySelector('#decrement_1')

      this.shadowRoot.appendChild(data)

      this.observable(
        this.incrementOneButton,
        () => this.incrementOneButton.addEventListener('click', this.incrementOne)
      );

      this.observable(
        this.decrementtOneButton,
        () => this.decrementtOneButton.addEventListener('click', this.decrementOne)
      );
    })

    // Load CSS styles
    generateTemplate('style', '/src/components/counter/counter.css').then(data => {
      this.shadowRoot.appendChild(data)
    })

    this.counterValue = 0;
  };


  connectedCallback() { }

  disconnectedCallback() {
    this.incrementOneButton.removeEventListener('click', this.incrementOne);
    this.decrementtOneButton.removeEventListener('click', this.decrementOne);
  }

  incrementOne() {
    console.log('add 1');
    this.counterValue++;
    this.updateValue();
  }

  decrementOne() {
    console.log('remove 1');
    this.counterValue--;
    this.updateValue();
  }

  intervals = []

  observable(element, event) {
    const index = this.intervals.length

    this.intervals.push(setInterval(() => {
      if (element) {
        event;
        clearInterval(this.intervals[index])
      }
    }, 1000))
  }
};
