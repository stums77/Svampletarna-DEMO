
//Scriptet innehåller funktionaliteten för sidorna "svampförteckning" och "mina svampar".

let sectionRef; //Referens till sektionen som ska innehålla svamplistan
let myListRef; //Referens till sektionen som ska innehålla "min lista"

let myShrooms = JSON.parse(localStorage.getItem("myShrooms")) || []; //Skapar array med localstorage. Om det inte finns något i localStorage skapas en tom array.

function init(){
    sectionRef = document.getElementById("shroomlist");
    myListRef = document.getElementById("myShroomList");
    if(sectionRef){
        //funktion exekveras bara om id="shroomlist" finns på HTML-sidan.
        fetchData();
    }

    if(myListRef) {
        showMyShrooms(myShrooms); //Funktion som visar svampar i "mina svampar"
    }

    const clearButton = document.getElementById("clearButton"); //Referens till knappen som ska rensa listan

    if(clearButton){ //Koden körs bara om clearbutton finns på html-sidan
        clearButton.addEventListener("click", function() {
        localStorage.removeItem("myShrooms"); //rensar localstorage
        myShrooms = []; //tömmer array
        myListRef.innerHTML = ""; //tömmer section från svampartiklar
        });
    }
}

window.onload = init;

/* Funktionen hämtar data från svampar.json. 
Console.log skapas vare sig hämtning lyckas/misslyckas */
async function fetchData() {
    try{
        const response = await fetch('../data/svampar.json');
        console.log(response);
        const data = await response.json(); // data hämtar innehåll från svampar.json
        console.log(data);
        createArticles(data); //Funktion som skapar artiklar
    } catch (error){
        console.error("Fel vid hämtning av data: ", error);
    }
}

/*Skapar nya HTML-element genom 2 inputvärden:
element = typ av element(ex: h2 eller p). 
text = textinnehåll*/
function createElement(element, text){
    const newElement = document.createElement(element);
    newElement.textContent = text;
    return newElement;
}

//////////////////////////////////////////////////////
//Skapar en button som kan lägga till svampar i array//
//////////////////////////////////////////////////////
function createButton(svamp){ //tar emot argumentet svamp från creatArticles-funktionen.
    const button = document.createElement("button"); //skapar en button.
    button.textContent = "Lägg till";
    button.type = "button";

    const isOnList = myShrooms.some(function(shroom) { // Kollar om svampen redan finns i myShrooms.
        return shroom.svenskt_namn === svamp.svenskt_namn;
    });

    if (isOnList) { // Om svampen redan finns i myShrooms, ta bort knappen och ändra texten.
        button.disabled = true;
        button.textContent = "Redan tillagd";       
    }

    button.addEventListener("click", function() { //knappens funktion.
    myShrooms.push(svamp); //Lägger till svampen i arrayen myShrooms.

    localStorage.setItem("myShrooms", JSON.stringify(myShrooms)); //Lagrar svampen i localStorage. Görs om till JSON sträng för array ska funka.

    button.disabled = true;
    button.textContent = "Redan tillagd";

    });
    return button; //Skickar till article 
}

////////////////////////////////////////////////////////////////////
//Funktion som skriver ut artiklar från JSON på sidan svampar.html//
////////////////////////////////////////////////////////////////////
function createArticles(data){
    //Foreachloop för att gå igenom hela listan utan att behöva en räknare.
    data.svampar.forEach(svamp => {
        const articleElement = document.createElement("article"); //skapar article
        
        //element skapar först och lägger sedan till html-element till sidan
        let element = createElement("h3", svamp.svenskt_namn + " - " + svamp.latinskt_namn);
        articleElement.appendChild(element);

        element = createElement("p", svamp.beskrivning);
        articleElement.appendChild(element);

        element = createElement("p", svamp.ätlig);
        articleElement.appendChild(element);
        
        //Bild har egen hantering --> Resten sköts med createElement()
        const imageElement = document.createElement("img");
        imageElement.src = "../images/" + svamp.bild;
        imageElement.alt = "Bild på " + svamp.svenskt_namn;
        articleElement.appendChild(imageElement);

        element = createElement("p", svamp.fyndplats);
        articleElement.appendChild(element);

        const button = createButton(svamp); //"svamp" skickas med som argument för att kunna använda den i knappen.
        articleElement.appendChild(button);
        
        sectionRef.appendChild(articleElement); //lägger till tidigare skapad article i sectionRef
    });
}

/////////////////////////////////////////////////////////////////////////
//Funktion som skriver ut artiklar från array på sidan myShrooms.html//
/////////////////////////////////////////////////////////////////////////
function showMyShrooms(myShrooms) {

        console.log("Svamplista: ", myShrooms); //För felsökning

        //Foreachloop för att gå igenom hela listan utan att behöva en räknare.
        myShrooms.forEach(svamp => {
        const articleElement = document.createElement("article"); //skapar article
        
        //element skapar först och lägger sedan till html-element till sidan
        let element = createElement("h3", svamp.svenskt_namn + " - " + svamp.latinskt_namn);
        articleElement.appendChild(element);

        element = createElement("p", svamp.beskrivning);
        articleElement.appendChild(element);

        element = createElement("p", svamp.ätlig);
        articleElement.appendChild(element);
        
        //Bild har egen hantering --> Resten sköts med createElement()
        const imageElement = document.createElement("img");
        imageElement.src = "../images/" + svamp.bild;
        imageElement.alt = "Bild på " + svamp.svenskt_namn;
        articleElement.appendChild(imageElement);

        element = createElement("p", svamp.fyndplats);
        articleElement.appendChild(element);

        const button = document.createElement("button"); //skapar en button.
        button.textContent = "Ta bort";
        button.type = "button";

        button.addEventListener("click", function() { //knappens funktion.
            removeShroom(svamp); //Funktion som tar bort svamp från myShrooms och uppdaterar localStorage
        });

        articleElement.appendChild(button);
        
        myListRef.appendChild(articleElement); //lägger till tidigare skapad article i myListRef
    });
}
//////////////////////////////////////////////////////////////////////////
//Funktion som tar bort svamp från myShrooms och uppdaterar localStorage//
//////////////////////////////////////////////////////////////////////////
function removeShroom(svamp) { //Funktion som tar bort svamp från myShrooms och uppdaterar localStorage
    myShrooms = myShrooms.filter(function(shroom) { //går igenom myShrooms och tar bort svampen som matchar svamp.svenskt_namn
        return shroom.svenskt_namn !== svamp.svenskt_namn;
    });

    localStorage.setItem("myShrooms", JSON.stringify(myShrooms)); //Uppdaterar localStorage

    myListRef.innerHTML = ""; //Tömmer listan innan den uppdateras
    showMyShrooms(myShrooms); //Uppdaterar listan med de kvarvarande svamparna
}

