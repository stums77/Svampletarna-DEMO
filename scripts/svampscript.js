let sectionRef; //Referens till sektionen som ska innehålla svamplistan

function init(){
    sectionRef = document.getElementById("svamplista");
    fetchShroomData();
}

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

function createArticles(){
    //Foreachloop för att gå igenom hela listan utan att behöva en räknare.
    data.array.forEach(svampar => {
        
    });
}

init();