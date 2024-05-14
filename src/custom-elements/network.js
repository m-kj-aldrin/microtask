import { ComBaseElement } from "./base.js";

const comNetworkTemplate = document.createElement("template");
comNetworkTemplate.innerHTML = `
<slot></slot>
`;

/**
 * @extends ComBaseElement<null,"com-chain">
 */
export class ComNetworkElement extends ComBaseElement {
    constructor() {
        super(null, "com-chain");

        // console.log("network constructing: START");

        this.shadowRoot.append(comNetworkTemplate.content.cloneNode(true));

        // console.log("network constructing: END");
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
