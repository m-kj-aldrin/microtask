import { ComBaseElement } from "./base.js";

const PID_ENUM = {
    dac: 1,
    adc: 2,
    dout: 3,
    din: 4,
    MIDI_1: 5,
    MIDI_2: 6,
    MIDI_3: 7,
    MIDI_DEV: 8,
    MIDI_HOST: 9,
    I2C_1: 10,
    I2C_2: 11,
    osc: 12,
    none: 13,
};

/**@type {ComOutElement[]} */
const OUTS_ARRAY = [];

const comOutTemplate = document.createElement("template");
comOutTemplate.innerHTML = `
<select id="cv-pid">
    <option></option>
    ${Object.keys(PID_ENUM)
        .map((key) => `<option>${key}</option>`)
        .join("\n")}
</select>
<select id="cv-ch">
    <option></option>
    ${[...Array(16)].map((_, i) => `<option>${i}</option>`).join("\n")}
</select>
<select id="gt-pid">
    <option></option>
    ${Object.keys(PID_ENUM)
        .map((key) => `<option>${key}</option>`)
        .join("\n")}
</select>
<select id="gt-ch">
    <option></option>
    ${[...Array(16)].map((_, i) => `<option>${i}</option>`).join("\n")}
</select>
`;

/**@typedef {keyof typeof PID_ENUM} PidNames */

export class ComOutElement extends ComBaseElement {
    constructor() {
        super();

        // this.attachShadow({ mode: "open" });

        this.shadowRoot.append(comOutTemplate.content.cloneNode(true));

        this.#setupListeners();

        let cvPidAttr = this.getAttribute("cv-pid");
        let cvChAttr = this.getAttribute("cv-ch");
        let gtPidAttr = this.getAttribute("gt-pid");
        let gtChAttr = this.getAttribute("gt-ch");

        this.#cv_pid = cvPidAttr;
        this.#cv_ch = cvChAttr;
        this.#gt_pid = gtPidAttr;
        this.#gt_ch = gtChAttr;

        this.#updateDom();

        if (this.hasAttribute("signal")) {
            this.signal("new");
        }
    }

    #setupListeners() {
        this.shadowRoot.addEventListener("input", (e) => {
            if (!(e.target instanceof HTMLSelectElement)) return;

            let id = e.target.id;
            let value = e.target.value;
            switch (id) {
                case "cv-pid":
                    this.#cv_pid = value;
                    break;
                case "cv-ch":
                    this.#cv_ch = value;
                    break;
                case "gt-pid":
                    this.#gt_pid = value;
                    break;
                case "gt-ch":
                    this.#gt_ch = value;
                    break;
                default:
                    return;
            }

            this.signal("new");
        });
    }

    #updateDom() {
        this.#cv_pid &&
            (this.shadowRoot.querySelector("#cv-pid").value = this.#cv_pid);
        this.#cv_ch &&
            (this.shadowRoot.querySelector("#cv-ch").value = this.#cv_ch);
        this.#gt_pid &&
            (this.shadowRoot.querySelector("#gt-pid").value = this.#gt_pid);
        this.#gt_ch &&
            (this.shadowRoot.querySelector("#gt-ch").value = this.#gt_ch);
    }

    /**@type {PidNames} */
    #cv_pid = null;
    /**@type {number} */
    #cv_ch = null;
    /**@type {PidNames} */
    #gt_pid = null;
    /**@type {number} */
    #gt_ch = null;

    get parent() {
        return this.closest("com-module");
    }

    #connectedToIntercom = false;

    /**@type {"new" | "remove"} */
    #deferedSignal = null;

    get index() {
        return OUTS_ARRAY.indexOf(this);
    }

    remove(signal = false) {
        signal && this.signal("remove");
        return super.remove();
    }

    #testGroupsOfTwo() {
        let a = this.#cv_pid;
        let b = this.#cv_ch;
        let c = this.#gt_pid;
        let d = this.#gt_ch;

        if (
            (a && b && !c && !d) ||
            (c && d && !a && !b) ||
            (a && b && c && d)
        ) {
            return true;
        }
        return false;
    }

    /**
     * @param {"new" | "remove"} type
     */
    signal(type) {
        if (!this.parent.isConnectedToIntercom) {
            this.#deferedSignal = "new";
            return this;
        }

        if (!this.#testGroupsOfTwo()) {
            return;
        }

        let signalString = "";

        switch (type) {
            case "new":
                if (this.#connectedToIntercom) {
                    this.signal("remove");
                }

                this.#deferedSignal = null;
                this.#connectedToIntercom = true;

                let cidx = this.parent.parent.index;
                let midx = this.parent.index;

                let cvPid = PID_ENUM[this.#cv_pid] ?? "_";
                let cvCh = this.#cv_ch ?? "_";
                let gtPid = PID_ENUM[this.#gt_pid] ?? "_";
                let gtCh = this.#gt_ch ?? "_";

                signalString = `out -n ${cidx}:${midx}:${cvPid}:${cvCh}:${gtPid}:${gtCh}`;

                OUTS_ARRAY.push(this);

                break;
            case "remove":
                if (!this.#connectedToIntercom) return this;
                this.#connectedToIntercom = false;
                signalString = `out -r ${this.index}`;

                OUTS_ARRAY.splice(this.index, 1);

                break;
            default:
                return this;
        }

        if (signalString) {
            console.log(signalString);
        }

        return this;
    }

    connectedCallback() {
        if (this.#deferedSignal) {
            this.signal(this.#deferedSignal);
        }
    }
    disconnectedCallback() {
        if (this.#connectedToIntercom) {
            this.signal("remove");
        }
    }
}
