import { OperatorBaseElement } from "./base.js";

const pthOperatorTemplate = document.createElement("template");
pthOperatorTemplate.innerHTML = `

`;

export class PthOperatorElement extends OperatorBaseElement {
    constructor() {
        super();

        this.shadowRoot.append(pthOperatorTemplate.content.cloneNode(true));
    }

    // connectedCallback() {}
    // disconnectedCallback() {}
}
