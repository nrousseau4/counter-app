import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.value = 1;
    this.minValue = 0;
    this.maxValue = 10;
  }

  static get properties() {
    return {
      title: { type: String },
      value: { type: Number, reflect: true },
      maxValue: { type: Number },
      minValue: { type: Number }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: inline-block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-primary);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
        width: 200px;
        background-color: var(--ddd-theme-default-white);
        border-radius: var(--ddd-spacing-1);
        padding: var(--ddd-spacing-4);
        border: var(--ddd-border-sm) solid var(--ddd-theme-default-potential50);
      }

      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }

      div {
        padding: var(--ddd-spacing-0);
        margin: var(--ddd-spacing-0);
      }

      .title {
        text-align: center;
        font-size: var(--ddd-font-size-ml);
      }

      .value {
        padding: var(--ddd-spacing-6);
			  text-align: center;
			  font-size: var(--ddd-font-size-xl);
      }

      .buttons-wrapper {
        display: flex;
      }

      .button {
        width: 16px;
        flex-grow: 1;
        font-size: var(--ddd-font-size-ms);
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        background: var(--ddd-theme-default-beaverBlue);
        color: var(--ddd-theme-default-roarLight);
        cursor: pointer;
        border-radius: var(--ddd-radius-xs);
      }

      .button:hover,
      .button:focus {
        background: var(--ddd-theme-default-beaver80);
      }

      :host([value="18"]) .value {
        color: red;
      }

      :host([value="21"]) .value {
        color: green;
      }
    `];
  }

  render() {    

    return html`
    
    <confetti-container id="confetti">
      <div class="wrapper">
        <div class="title">${this.title}</div>
        <div class=value>${this.value}</div>
        <div class="buttons-wrapper">
          <button class="button" @click=${this.handleDecrement} ?disabled="${this.minValue === this.value}">-</button>
          <button class="button" @click=${this.handleIncrement} ?disabled="${this.maxValue === this.value}">+</button>
        </div>
      </div>
    </confetti-container>`;

  }
  
  handleIncrement(e) {
    const click = e.target;
    if (this.value != this.maxValue) {
		  this.value++;
    }
    if (this.value === 21) {
      this.makeItRain();
    }
	}

	handleDecrement(e) {
    const click = e.target;
    if (this.value != this.minValue) {
      this.value = Math.max(0, this.value - 1);
    }
    if (this.value === 21) {
      this.makeItRain();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      if (this.value === 21) {
        this.makeItRain;
      }
    }
  }
  
  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);