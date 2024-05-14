import { OperatorBaseElement } from "./base.js";

const lfoOperatorTemplate = document.createElement("template");
lfoOperatorTemplate.innerHTML = `
<div>lfo</div>
<input-number order="0" value="20"></input-number>
<input-number order="1" value="123"></input-number>
<input-number order="2" value="500"></input-number>
`;

export class LfoOperatorElement extends OperatorBaseElement {
    constructor() {
        super();
        // console.log("lfo-operator constructing: START");

        // this.shadowRoot.append(lfoOperatorTemplate.content.cloneNode(true));

        // console.log("lfo-operator constructing: END");
    }

    connectedCallback() {
        // console.log("lfo-operator connected: START");

        this.append(lfoOperatorTemplate.content.cloneNode(true));

        // console.log("lfo-operator connected: END");
    }
    // disconnectedCallback() {}
}
