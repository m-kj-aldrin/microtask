const comBaseTemplate = document.createElement("template");
comBaseTemplate.innerHTML = ``;

export class ComBaseElement extends HTMLElement {
    /**
     * @param {NodeListOf<ComBaseElement>} collection
     * @param {ComBaseElement} of
     */
    static indexOf(collection, of) {
        let i = 0;
        for (const sibling of collection) {
            if (sibling == of) {
                return i;
            }
            i++;
        }
        return -1;
    }

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.append(comBaseTemplate.content.cloneNode(true));
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
