import { InputBaseElement } from "./base.js";

const inputNumberTemplate = document.createElement("template");
inputNumberTemplate.innerHTML = `
<input type="number" />
`;

export class InputNumberElement extends InputBaseElement {
    constructor() {
        super();

        this.shadowRoot.append(inputNumberTemplate.content.cloneNode(true));
    }

    // connectedCallback() {}
    // disconnectedCallback() {}
}
