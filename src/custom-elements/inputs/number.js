import { InputBaseElement } from "./base.js";

const inputNumberTemplate = document.createElement("template");
inputNumberTemplate.innerHTML = `
<input type="number" />
`;

export class InputNumberElement extends InputBaseElement {
  constructor() {
    super();

    this.shadowRoot.append(inputNumberTemplate.content.cloneNode(true));

    let valueAttr = this.getAttribute("value");
    this.value = +valueAttr;
  }

  // connectedCallback() {}
  // disconnectedCallback() {}
}
