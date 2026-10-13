let sectionRef; //Referens till sektionen som ska innehålla svamplistan

function init(){
    sectionRef = document.getElementById("shroomlist");
    if(sectionRef){
        //funktion exekveras bara om id="shroomlist" finns på HTML-sidan.
        fetchShroomData();
    }
        
}
window.onload = init;

//Funktionen hämtar data från svampar.json. 
//Funktionen skapar console log både om hämtningen lyckas eller misslyckas.
async function fetchShroomData() {
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
        
        sectionRef.appendChild(articleElement); //lägger till tidigare skapad article i sectionRef
    });
}

/*Denna funktion skapar nya HTML-element genom 2 inputvärden:
element = typ av element(h2). 
text = textinnehåll*/
function createElement(element, text){
    const newElement = document.createElement(element);
    newElement.textContent = text;
    return newElement;
}