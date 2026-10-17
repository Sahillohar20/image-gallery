const images = [];

for (let i = 1; i <= 50; i++) {
    images.push({
        src: `https://picsum.photos/seed/lumina-${i}/1000/800`,
        title: `Lumina Photo ${i}`
    });
}

const mainImage = document.getElementById("mainImage");
const caption = document.getElementById("caption");
const counter = document.getElementById("counter");
const thumbnails = document.getElementById("thumbnails");
const viewer = document.querySelector(".viewer");

const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentIndex = 0;

function createThumbnails() {
    thumbnails.innerHTML = "";

    const total = images.length;

    for (let offset = -2; offset <= 2; offset++) {
        const index =
            (currentIndex + offset + total) % total;

        const image = images[index];

        const button = document.createElement("button");

        button.className = "thumbnail";

        if (index === currentIndex) {
            button.classList.add("active");
        }

        button.innerHTML = `
            <img
                src="${image.src}"
                alt="${image.title}"
            >
        `;

        button.addEventListener("click", function () {
            currentIndex = index;
            showImage();
        });

        thumbnails.appendChild(button);
    }
}

function showImage() {
    const currentImage = images[currentIndex];

    mainImage.src = currentImage.src;
    mainImage.alt = currentImage.title;

    caption.textContent = currentImage.title;

    counter.textContent =
        `${currentIndex + 1} / ${images.length}`;

    viewer.style.setProperty(
        "--image",
        `url("${currentImage.src}")`
    );

    createThumbnails();

    mainImage.style.animation = "none";

    requestAnimationFrame(() => {
        mainImage.style.animation =
            "imageChange 0.45s ease";
    });
}

previousButton.addEventListener("click", function () {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    showImage();
});

nextButton.addEventListener("click", function () {
    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    showImage();
});

document.addEventListener("keydown", function (event) {

    if (event.key === "ArrowLeft") {
        previousButton.click();
    }

    if (event.key === "ArrowRight") {
        nextButton.click();
    }
});

mainImage.addEventListener("click", function () {
    window.open(
        images[currentIndex].src,
        "_blank"
    );
});

createThumbnails();
showImage();