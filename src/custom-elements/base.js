const comBaseTemplate = document.createElement("template");
comBaseTemplate.innerHTML = ``;

/**
 * @template {"com-network" | "com-chain" | "com-module"} ParentType
 * @template {"com-network" | "com-chain" | "com-module"} ChildType
 */
export class ComBaseElement extends HTMLElement {
    /**@type {ParentType} */
    #parentType = null;

    get parent() {
        return this.closest(this.#parentType);
    }

    get descendants() {
        return this.querySelectorAll(this.#childType);
    }

    /**@type {ChildType} */
    #childType = null;
    get childType() {
        return this.#childType;
    }

    get index() {
        let parent = this.parent;
        if (parent) {
            let siblings = parent.querySelectorAll(parent.childType);
            let i = 0;
            for (const sibling of siblings) {
                if (sibling == this) {
                    return i;
                }
                i++;
            }
        }
        return -1;
    }

    /**
     * @param {ParentType} parentType
     * @param {ChildType} childType
     */
    constructor(parentType, childType) {
        super();

        this.#parentType = parentType;
        this.#childType = childType;

        this.attachShadow({ mode: "open" });

        this.shadowRoot.append(comBaseTemplate.content.cloneNode(true));
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
