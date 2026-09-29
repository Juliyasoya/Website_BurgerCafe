const menuCategories = {
    burgers: {
        title: "Бургеры",
        image: "image/menu-burgers.png",
        products: [
            {
                id: "vintage-burger",
                image: "image/product-vintage-burger.jpg",
                name: "Винтаж бургер",
                description: "Говяжья котлета, сыр, овощи и фирменный соус",
                price: 590
            },
            {
                id: "cheese-burger",
                image: "image/product-cheese-burger.jpg",
                name: "Чизбургер",
                description: "Говяжья котлета, двойной сыр и свежие овощи",
                price: 520
            },
            {
                id: "bacon-burger",
                image: "image/product-bacon-burger.jpg",
                name: "Бургер с беконом",
                description: "Котлета, хрустящий бекон, сыр и соус барбекю",
                price: 650
            }
        ]
    },
    snacks: {
        title: "Закуски",
        image: "image/menu-snacks.png",
        products: [
            {
                id: "french-fries",
                image: "image/product-french-fries.jpg",
                name: "Картофель фри",
                description: "Хрустящий картофель с солью и соусом",
                price: 240
            },
            {
                id: "cheese-sticks",
                image: "image/product-cheese-sticks.jpg",
                name: "Сырные палочки",
                description: "Расплавленный сыр в золотистой панировке",
                price: 320
            },
            {
                id: "onion-rings",
                image: "image/product-onion-rings.jpg",
                name: "Луковые кольца",
                description: "Хрустящие кольца с пряным томатным соусом",
                price: 280
            }
        ]
    },
    salads: {
        title: "Салаты",
        image: "image/menu-salads.png",
        products: [
            {
                id: "caesar-salad",
                image: "image/product-caesar-salad.jpg",
                name: "Цезарь с курицей",
                description: "Курица гриль, салат, томаты, сыр и соус цезарь",
                price: 470
            },
            {
                id: "greek-salad",
                image: "image/product-greek-salad.jpg",
                name: "Греческий салат",
                description: "Свежие овощи, маслины, сыр фета и зелень",
                price: 390
            },
            {
                id: "warm-salad",
                image: "image/product-warm-salad.jpg",
                name: "Тёплый салат",
                description: "Говядина, запечённые овощи и салатный микс",
                price: 520
            }
        ]
    },
    chicken: {
        title: "Курица",
        image: "image/menu-chicken.jpg",
        products: [
            {
                id: "chicken-wings",
                image: "image/product-chicken-wings.jpg",
                name: "Куриные крылья",
                description: "Сочные крылья в глазури барбекю",
                price: 480
            },
            {
                id: "crispy-chicken",
                image: "image/product-crispy-chicken.jpg",
                name: "Хрустящее филе",
                description: "Куриное филе в пряной хрустящей панировке",
                price: 510
            },
            {
                id: "chicken-nuggets",
                image: "image/product-chicken-nuggets.jpg",
                name: "Куриные наггетсы",
                description: "Нежное куриное филе с сырным соусом",
                price: 360
            }
        ]
    },
    hot: {
        title: "Горячее",
        image: "image/menu-hot.jpg",
        products: [
            {
                id: "beef-steak",
                image: "image/product-beef-steak.jpg",
                name: "Стейк с овощами",
                description: "Говяжий стейк, овощи гриль и пряный соус",
                price: 890
            },
            {
                id: "bbq-ribs",
                image: "image/product-bbq-ribs.jpg",
                name: "Рёбра барбекю",
                description: "Томлёные свиные рёбра в соусе барбекю",
                price: 760
            },
            {
                id: "potato-with-meat",
                image: "image/product-potato-with-meat.jpg",
                name: "Картофель с мясом",
                description: "Запечённый картофель, говядина и свежая зелень",
                price: 590
            }
        ]
    },
    desserts: {
        title: "Десерты",
        image: "image/menu-desserts.jpg",
        products: [
            {
                id: "chocolate-fondant",
                image: "image/product-chocolate-fondant.jpg",
                name: "Шоколадный фондан",
                description: "Тёплый шоколадный десерт с жидкой начинкой",
                price: 390
            },
            {
                id: "cheesecake",
                image: "image/product-cheesecake.jpg",
                name: "Чизкейк",
                description: "Нежный сливочный чизкейк с ягодным соусом",
                price: 360
            },
            {
                id: "berry-ice-cream",
                image: "image/product-berry-ice-cream.jpg",
                name: "Мороженое с ягодами",
                description: "Сливочное мороженое, ягоды и шоколадная крошка",
                price: 290
            }
        ]
    }
};

const productsModal = document.querySelector("#products-modal");
const cartModal = document.querySelector("#cart-modal");
const productsModalTitle = document.querySelector("#products-modal-title");
const productsList = document.querySelector("#products-list");
const productsModalTotal = document.querySelector("#products-modal-total");
const cartList = document.querySelector("#cart-list");
const cartEmpty = document.querySelector("#cart-empty");
const cartTotal = document.querySelector("#cart-total");
const cartMessage = document.querySelector("#cart-message");
const buyButton = document.querySelector("#buy-button");
const cartCounters = document.querySelectorAll(".navigation__counter");
const menuCards = document.querySelectorAll(".menu-card");
const openCartButtons = document.querySelectorAll("[data-open-cart]");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");

let cart = loadCart();
let currentCategoryKey = "";
let activeModal = null;
let lastFocusedElement = null;

function loadCart() {
    try {
        const savedCart = localStorage.getItem("vintageFoodCart");

        if (savedCart === null) {
            return {};
        }

        return JSON.parse(savedCart);
    } catch (error) {
        return {};
    }
}

function saveCart() {
    try {
        localStorage.setItem("vintageFoodCart", JSON.stringify(cart));
    } catch (error) {
        return;
    }
}

function formatPrice(price) {
    return price.toLocaleString("ru-RU") + " ₽";
}

function findProduct(productId) {
    const categoryKeys = Object.keys(menuCategories);

    for (let categoryIndex = 0; categoryIndex < categoryKeys.length; categoryIndex = categoryIndex + 1) {
        const categoryKey = categoryKeys[categoryIndex];
        const category = menuCategories[categoryKey];

        for (let productIndex = 0; productIndex < category.products.length; productIndex = productIndex + 1) {
            const product = category.products[productIndex];

            if (product.id === productId) {
                return {
                    product: product,
                    category: category
                };
            }
        }
    }

    return null;
}

function getProductQuantity(productId) {
    if (cart[productId] === undefined) {
        return 0;
    }

    return cart[productId];
}

function calculateCartTotal() {
    const productIds = Object.keys(cart);
    let total = 0;

    for (let index = 0; index < productIds.length; index = index + 1) {
        const productId = productIds[index];
        const productData = findProduct(productId);

        if (productData !== null) {
            total = total + productData.product.price * cart[productId];
        }
    }

    return total;
}

function calculateProductsCount() {
    const productIds = Object.keys(cart);
    let count = 0;

    for (let index = 0; index < productIds.length; index = index + 1) {
        count = count + cart[productIds[index]];
    }

    return count;
}

function updateCartCounter() {
    const productsCount = calculateProductsCount();

    for (let index = 0; index < cartCounters.length; index = index + 1) {
        cartCounters[index].textContent = productsCount;
    }
}

function changeProductQuantity(productId, change) {
    let newQuantity = getProductQuantity(productId) + change;

    if (newQuantity > 99) {
        newQuantity = 99;
    }

    if (newQuantity <= 0) {
        delete cart[productId];
    } else {
        cart[productId] = newQuantity;
    }

    saveCart();
    updateCartCounter();
    productsModalTotal.textContent = formatPrice(calculateCartTotal());

    if (activeModal === productsModal) {
        renderProducts(currentCategoryKey);
    }

    if (activeModal === cartModal) {
        renderCart();
    }
}

function createQuantityControls(productId, quantity, extraClassName) {
    return `
        <div class="quantity ${extraClassName}">
            <button class="quantity__button" type="button" aria-label="Уменьшить количество" data-action="decrease" data-product-id="${productId}">−</button>
            <span class="quantity__value">${quantity}</span>
            <button class="quantity__button" type="button" aria-label="Увеличить количество" data-action="increase" data-product-id="${productId}">+</button>
        </div>
    `;
}

function renderProducts(categoryKey) {
    const category = menuCategories[categoryKey];

    if (category === undefined) {
        return;
    }

    currentCategoryKey = categoryKey;
    productsModalTitle.textContent = category.title;
    productsList.innerHTML = "";

    for (let index = 0; index < category.products.length; index = index + 1) {
        const product = category.products[index];
        const quantity = getProductQuantity(product.id);
        const productTotal = product.price * quantity;
        const productCard = document.createElement("article");

        productCard.className = "product-card";
        productCard.innerHTML = `
            <img class="product-card__image" src="${product.image}" alt="${product.name}">
            <div class="product-card__body">
                <h3 class="product-card__name">${product.name}</h3>
                <p class="product-card__description">${product.description}</p>
                <div class="product-card__price-row">
                    <span class="product-card__price-label">Цена за одну</span>
                    <strong class="product-card__price">${formatPrice(product.price)}</strong>
                </div>
                <div class="product-card__controls">
                    ${createQuantityControls(product.id, quantity, "product-card__quantity")}
                    <div>
                        <span class="product-card__total-label">Сумма</span>
                        <strong class="product-card__total">${formatPrice(productTotal)}</strong>
                    </div>
                </div>
            </div>
        `;

        productsList.appendChild(productCard);
    }

    productsModalTotal.textContent = formatPrice(calculateCartTotal());
}

function renderCart() {
    const productIds = Object.keys(cart);
    cartList.innerHTML = "";
    cartMessage.textContent = "";

    if (productIds.length === 0) {
        cartEmpty.classList.remove("cart__empty--hidden");
        buyButton.disabled = true;
    } else {
        cartEmpty.classList.add("cart__empty--hidden");
        buyButton.disabled = false;
    }

    for (let index = 0; index < productIds.length; index = index + 1) {
        const productId = productIds[index];
        const productData = findProduct(productId);

        if (productData === null) {
            continue;
        }

        const product = productData.product;
        const category = productData.category;
        const quantity = cart[productId];
        const productTotal = product.price * quantity;
        const cartItem = document.createElement("article");

        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img class="cart-item__image" src="${product.image}" alt="${product.name}">
            <div class="cart-item__information">
                <h3 class="cart-item__name">${product.name}</h3>
                <span class="cart-item__price">${formatPrice(product.price)} за одну</span>
            </div>
            <div class="cart-item__controls">
                ${createQuantityControls(product.id, quantity, "")}
            </div>
            <div class="cart-item__total-block">
                <div class="cart-item__total">${formatPrice(productTotal)}</div>
                <button class="cart-item__remove" type="button" data-action="remove" data-product-id="${product.id}">Удалить</button>
            </div>
        `;

        cartList.appendChild(cartItem);
    }

    cartTotal.textContent = formatPrice(calculateCartTotal());
}

function openModal(modal) {
    if (activeModal !== null) {
        closeModal(false);
    }

    lastFocusedElement = document.activeElement;
    activeModal = modal;
    activeModal.classList.add("modal--open");
    activeModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const closeButton = activeModal.querySelector(".modal__close");

    if (closeButton !== null) {
        closeButton.focus();
    }
}

function closeModal(returnFocus) {
    if (activeModal === null) {
        return;
    }

    activeModal.classList.remove("modal--open");
    activeModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    activeModal = null;

    if (returnFocus === true && lastFocusedElement !== null) {
        lastFocusedElement.focus();
    }
}

function openProductsModal(categoryKey) {
    renderProducts(categoryKey);
    openModal(productsModal);
}

function openCartModal() {
    renderCart();
    openModal(cartModal);
}

for (let index = 0; index < menuCards.length; index = index + 1) {
    menuCards[index].addEventListener("click", function () {
        const categoryButton = this.querySelector("[data-category]");

        if (categoryButton !== null) {
            openProductsModal(categoryButton.dataset.category);
        }
    });
}

for (let index = 0; index < openCartButtons.length; index = index + 1) {
    openCartButtons[index].addEventListener("click", function () {
        openCartModal();
    });
}

for (let index = 0; index < closeModalButtons.length; index = index + 1) {
    closeModalButtons[index].addEventListener("click", function () {
        closeModal(true);
    });
}

productsList.addEventListener("click", function (event) {
    const button = event.target.closest("[data-action]");

    if (button === null) {
        return;
    }

    const productId = button.dataset.productId;
    const action = button.dataset.action;

    if (action === "increase") {
        changeProductQuantity(productId, 1);
    }

    if (action === "decrease") {
        changeProductQuantity(productId, -1);
    }
});

cartList.addEventListener("click", function (event) {
    const button = event.target.closest("[data-action]");

    if (button === null) {
        return;
    }

    const productId = button.dataset.productId;
    const action = button.dataset.action;

    if (action === "increase") {
        changeProductQuantity(productId, 1);
    }

    if (action === "decrease") {
        changeProductQuantity(productId, -1);
    }

    if (action === "remove") {
        delete cart[productId];
        saveCart();
        updateCartCounter();
        renderCart();
    }
});

buyButton.addEventListener("click", function () {
    const total = calculateCartTotal();

    if (total === 0) {
        return;
    }

    cart = {};
    saveCart();
    updateCartCounter();
    renderCart();
    cartMessage.textContent = "Спасибо! Ваш заказ принят.";
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal(true);
    }
});

updateCartCounter();
