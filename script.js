const themeToggle = document.getElementById("theme-toggle");

themeToggle.checked = localStorage.getItem("theme") === "dark";
themeToggle.addEventListener("change", () => {
    localStorage.setItem("theme", themeToggle.checked ? "dark" : "light");
});

const burgerButton = document.querySelector(".burger-btn");
const burgerMenu = document.getElementById("mobile-menu");
const mobileScreen = window.matchMedia("(max-width: 768px)");

function setMenuOpen(open) {
    const isOpen = open && mobileScreen.matches;
    burgerButton.setAttribute("aria-expanded", String(isOpen));
    burgerButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    burgerMenu.classList.toggle("is-open", isOpen);
    burgerMenu.inert = !isOpen;
    document.body.classList.toggle("menu-open", isOpen);
}

burgerButton.addEventListener("click", () => {
    setMenuOpen(burgerButton.getAttribute("aria-expanded") !== "true");
});

burgerMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && burgerButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        burgerButton.focus();
    }
});

mobileScreen.addEventListener("change", () => setMenuOpen(false));

if (document.querySelector(".grid")) {
    const dialog = document.querySelector(".product-dialog");
    const dialogContent = dialog.querySelector(".product-dialog__content");
    const closeButton = dialog.querySelector(".product-dialog__close");
    let selectedCard;

    function openProduct(product, card) {
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        const details = document.createElement("div");
        const title = document.createElement("h2");
        title.id = "product-dialog-title";
        title.textContent = product.name;
        const description = document.createElement("p");
        description.textContent = product.description;
        const price = document.createElement("p");
        price.className = "price";
        price.textContent = `$${product.price.toFixed(2)}`;
        details.append(title, description, price);
        dialogContent.replaceChildren(image, details);

        selectedCard = card;
        dialog.showModal();
        document.body.classList.add("modal-open");
        closeButton.focus();
    }

    closeButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
        const bounds = dialog.getBoundingClientRect();
        if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
            dialog.close();
        }
    });
    dialog.addEventListener("close", () => {
        document.body.classList.remove("modal-open");
        selectedCard.focus();
    });

    products.forEach((product, index) => {
        const card = document.createElement("article");
        card.className = "item";
        card.dataset.productIndex = index;
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `View ${product.name}`);

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        const title = document.createElement("h3");
        title.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = `$${product.price.toFixed(2)}`;

        card.append(image, title, description, price);
        card.addEventListener("click", () => openProduct(product, card));
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openProduct(product, card);
            }
        });
        document.querySelector(`.grid-${product.category}`).append(card);
    });
}
