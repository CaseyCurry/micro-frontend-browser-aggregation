var tag = "nh-inventory";

if (!window.customElements.get(tag)) {
  window.customElements.define(
    tag,
    class Inventory extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        const title = document.createElement("h1");
        title.innerHTML = "Inventory App";
        const description = document.createElement("h4");
        description.innerHTML =
          "HTML 5 with Javascript Using Custom Element for Delivery";
        const container = document.createElement("div");
        container.setAttribute("itemprop", "inventory");
        container.appendChild(title);
        container.appendChild(description);
        this.appendChild(container);
        container.addEventListener("click", this.receiveDelivery);
      }

      receiveDelivery() {
        const message = document.createElement("div");
        message.innerHTML =
          "delivery received - this message will be cleared after 3 seconds";
        this.appendChild(message);
        setTimeout(() => {
          this.removeChild(message);
        }, 3000);
      }
    }
  );
}
