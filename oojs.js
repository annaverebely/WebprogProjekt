
const appDiv = document.createElement("div");
appDiv.id = "app";
appDiv.className = "card-container";

document.body.appendChild(appDiv);

class AllatKartya {
    constructor(name, imageSrc) {
        this.name = name;
        this.imageSrc = imageSrc;

        // létrehozom a kártyát
        this.container = document.createElement("div");
        this.container.className = "card";

        // kép
        this.img = document.createElement("img");
        this.img.src = this.imageSrc;

        // cím
        this.title = document.createElement("h3");
        this.title.innerText = this.name;

        this.container.appendChild(this.img);
        this.container.appendChild(this.title);

        document.getElementById("app").appendChild(this.container);
    }

    show() {
        this.container.style.display = "block";
    }

    hide() {
        this.container.style.display = "none";
    }
}

class VedettAllatKartya extends AllatKartya {
    constructor(name, imageSrc, category, value, description) {
        super(name, imageSrc);

        this.category = category;
        this.value = value;
        this.description = description;

        this.categoryText = document.createElement("p");
        this.categoryText.innerText = "Kategória: " + this.category;

        this.valueText = document.createElement("p");
        this.valueText.innerText = "Eszmei érték: " + this.value + " Ft";

        this.descriptionText = document.createElement("p");
        this.descriptionText.innerText = this.description;

        this.container.appendChild(this.categoryText);
        this.container.appendChild(this.valueText);
        this.container.appendChild(this.descriptionText);
    }

    highlight() {
        this.container.style.border = "3px solid darkgreen";
        this.container.style.backgroundColor = "#e8f5e9";
    }

    resetHighlight() {
        this.container.style.border = "1px solid #cfd8cf";
        this.container.style.backgroundColor = "white";
    }
}

let allatok = [
    new VedettAllatKartya(
        "Gyurgyalag",
        "assetsoojs/gyurgyalag.jpg",
        "madár",
        100000,
        "(ciconia nigra) Kedveli a meleg, napsütötte domboldalakat, a déli fekvésű homokbányákat. Nagyobb folyók partfalaiban költ."
    ),

    new VedettAllatKartya(
        "Gyöngybagoly",
        "assetsoojs/gyongybagoly.jpg",
        "madár",
        100000,
        "(Tyto alba) Templomtornyok, padlások, állattartó telepek, magtárak rejtett életű madara. Leginkább a nyílt mezőgazdasági területeket kedveli."
    ),

    new VedettAllatKartya(
        "Nagy fülemüle",
        "assetsoojs/nagyfulemule.jpg",
        "madár",
        100000,
        "(Luscinia luscinia) Kedveli a folyópartokat, a sűrű aljnövényzetű ártéri füzeseket."
    ),

    new VedettAllatKartya(
        "Csíkos szöcskeegér",
        "assetsoojs/csikosszocskeeger.jpg",
        "emlős",
        250000,
        "(Sicista subtilis) Az ország egyik legritkább gerincese."
    ),

    new VedettAllatKartya(
        "Pisze denevér",
        "assetsoojs/piszedenever.jpg",
        "emlős",
        50000,
        "(Barbastella barbastellus) Hegyvidéki és dombsági összefüggő erdőkben él."
    )
];

function showAll() {
    allatok.forEach(allat => {
        allat.show();
    });
}

function hideAll() {
    allatok.forEach(allat => {
        allat.hide();
    });
}

function showCategory(category) {
    allatok.forEach(allat => {
        if (allat.category === category) {
            allat.show();
        } else {
            allat.hide();
        }
    });
}


const footer = document.querySelector("footer");
document.body.appendChild(footer);