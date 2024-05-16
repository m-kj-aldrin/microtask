import { ComBaseElement } from "./base.js";

const comNetworkTemplate = document.createElement("template");
comNetworkTemplate.innerHTML = `
<slot></slot>
`;

export class ComNetworkElement extends ComBaseElement {
    constructor() {
        super();

        // console.log("network constructing: START");

        this.shadowRoot.append(comNetworkTemplate.content.cloneNode(true));

        // console.log("network constructing: END");
    }

    connectedCallback() {
        const currentNetwork = document.querySelector("com-network");
        if (currentNetwork != this) {
            console.error(
                "only one network element can be present in the document"
            );
            this.remove();
        }
    }
    disconnectedCallback() {}
}
