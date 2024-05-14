const inputBaseTemplate = document.createElement("template");
inputBaseTemplate.innerHTML = `

`;

export class InputBaseElement extends HTMLElement {
  constructor() {
    super();

    // console.log("input constructing: START");

    let valueAttr = this.getAttribute("value");
    this.#value = +valueAttr;

    this.attachShadow({ mode: "open" });

    this.shadowRoot.append(inputBaseTemplate.content.cloneNode(true));

    this.#setupListeners();
    // console.log("input constructing: END");
  }

  #setupListeners() {
    this.shadowRoot.addEventListener("input", (e) => {
      this.#value = +e.target.value;
    });
  }

  #value = 0;
  get value() {
    return this.#value;
  }
  set value(value) {
    this.#value = value;
  }

  connectedCallback() {
    // console.log("input connected: START");
    // console.log("input connected: END");
  }
  disconnectedCallback() {}
}
