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

const sliderTrack = document.querySelector(".slider-track");

if (sliderTrack) {
    const slides = [...sliderTrack.children];
    const dots = [...document.querySelectorAll(".dots__item")];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = 0;
    let position = 1;
    let moving = false;
    let pending = 0;

    const lastClone = slides.at(-1).cloneNode(true);
    const firstClone = slides[0].cloneNode(true);
    for (const clone of [lastClone, firstClone]) {
        clone.classList.remove("slider-item--active");
        clone.setAttribute("aria-hidden", "true");
        clone.inert = true;
    }
    sliderTrack.prepend(lastClone);
    sliderTrack.append(firstClone);
    sliderTrack.style.transition = "none";
    sliderTrack.style.transform = "translateX(-100%)";
    sliderTrack.classList.add("is-ready");
    void sliderTrack.offsetWidth;
    sliderTrack.style.removeProperty("transition");

    function updateSlider() {
        slides.forEach((slide, index) => {
            const active = index === current;
            slide.classList.toggle("slider-item--active", active);
            slide.setAttribute("aria-hidden", String(!active));
            slide.inert = !active;
            dots[index].classList.toggle("dots__item--active", active);
            if (active) dots[index].setAttribute("aria-current", "true");
            else dots[index].removeAttribute("aria-current");
        });
    }

    function snapToCurrent() {
        sliderTrack.style.transition = "none";
        position = current + 1;
        sliderTrack.style.transform = `translateX(-${position * 100}%)`;
        void sliderTrack.offsetWidth;
        sliderTrack.style.removeProperty("transition");
        finishMove();
    }

    function finishMove() {
        moving = false;
        if (pending) {
            const direction = Math.sign(pending);
            pending -= direction;
            moveSlider(direction);
        }
    }

    function moveSlider(direction) {
        if (moving) {
            pending += direction;
            return;
        }
        current = (current + direction + slides.length) % slides.length;
        updateSlider();
        if (reducedMotion.matches) {
            snapToCurrent();
            return;
        }
        moving = true;
        position += direction;
        sliderTrack.style.transform = `translateX(-${position * 100}%)`;
    }

    sliderTrack.addEventListener("transitionend", (event) => {
        if (event.target !== sliderTrack || event.propertyName !== "transform") return;
        if (position === 0 || position === slides.length + 1) {
            snapToCurrent();
            return;
        }
        finishMove();
    });
    document.querySelector(".slider-btn--prev").addEventListener("click", () => moveSlider(-1));
    document.querySelector(".slider-btn--next").addEventListener("click", () => moveSlider(1));
    dots.forEach((dot, index) => dot.addEventListener("click", () => {
        if (index !== current) moveSlider(index === (current + 1) % slides.length ? 1 : -1);
    }));
    reducedMotion.addEventListener("change", snapToCurrent);
    updateSlider();
}

if (document.querySelector(".grid")) {
    const dialog = document.querySelector(".product-dialog");
    const dialogContent = dialog.querySelector(".product-dialog__content");
    const closeButton = dialog.querySelector(".product-dialog__close");
    const grids = Object.fromEntries(["coffee", "tea", "dessert"].map((category) => [category, document.querySelector(`.grid-${category}`)]));
    const categoryButtons = [...document.querySelectorAll(".tab[data-category]")];
    const moreButton = document.querySelector(".load-more");
    const compactCatalog = window.matchMedia("(max-width: 1359px)");
    let activeCategory = "coffee";
    let showAll = false;
    let selectedCard;

    function updateCatalog() {
        categoryButtons.forEach((button) => {
            button.setAttribute("aria-pressed", String(button.dataset.category === activeCategory));
        });
        for (const [category, grid] of Object.entries(grids)) {
            grid.hidden = category !== activeCategory;
            [...grid.children].forEach((card, index) => {
                card.hidden = compactCatalog.matches && !showAll && index >= 4;
            });
        }
        moreButton.hidden = !compactCatalog.matches || showAll || grids[activeCategory].children.length <= 4;
    }

    categoryButtons.forEach((button) => button.addEventListener("click", () => {
        activeCategory = button.dataset.category;
        showAll = false;
        updateCatalog();
    }));
    moreButton.addEventListener("click", () => {
        showAll = true;
        updateCatalog();
    });
    compactCatalog.addEventListener("change", updateCatalog);

    function createOptionGroup(title, options, type) {
        const group = document.createElement("fieldset");
        group.className = "product-dialog__group";
        const legend = document.createElement("legend");
        legend.textContent = title;
        const choices = document.createElement("div");
        choices.className = "product-dialog__choices";

        options.forEach((option, index) => {
            const choice = document.createElement("label");
            choice.className = "product-dialog__choice";
            const input = document.createElement("input");
            input.className = "visually-hidden";
            input.type = type;
            input.value = index;
            if (type === "radio") {
                input.name = "product-size";
                input.checked = index === 0;
            }
            const badge = document.createElement("span");
            badge.className = "product-dialog__badge";
            badge.textContent = type === "radio" ? option.code : String(index + 1);
            const label = document.createElement("span");
            label.textContent = type === "radio" ? option.label : option.name;
            choice.append(input, badge, label);
            choices.append(choice);
        });

        group.append(legend, choices);
        return group;
    }

    function openProduct(product, card) {
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        const details = document.createElement("div");
        details.className = "product-dialog__details";
        const title = document.createElement("h2");
        title.id = "product-dialog-title";
        title.textContent = product.name;
        const description = document.createElement("p");
        description.className = "product-dialog__description";
        description.textContent = product.description;
        const sizes = createOptionGroup("Size", product.sizes, "radio");
        const additives = createOptionGroup("Additives", product.additives, "checkbox");
        const total = document.createElement("div");
        total.className = "product-dialog__total";
        const totalLabel = document.createElement("span");
        totalLabel.textContent = "Total:";
        const amount = document.createElement("output");
        amount.setAttribute("aria-live", "polite");
        total.append(totalLabel, amount);
        const note = document.createElement("p");
        note.className = "product-dialog__note";
        note.textContent = "The total price depends on the selected size and additives.";

        function updateTotal() {
            const size = product.sizes[Number(sizes.querySelector("input:checked").value)];
            const additivePrice = [...additives.querySelectorAll("input:checked")].reduce((sum, input) => {
                return sum + Math.round(product.additives[Number(input.value)].price * 100);
            }, 0);
            const cents = Math.round(product.price * 100) + Math.round(size.price * 100) + additivePrice;
            amount.textContent = `$${(cents / 100).toFixed(2)}`;
        }

        sizes.addEventListener("change", updateTotal);
        additives.addEventListener("change", updateTotal);
        details.append(title, description, sizes, additives, total, note, closeButton);
        dialogContent.replaceChildren(image, details);
        dialog.setAttribute("aria-labelledby", title.id);
        updateTotal();

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
        grids[product.category].append(card);
    });

    updateCatalog();
}
