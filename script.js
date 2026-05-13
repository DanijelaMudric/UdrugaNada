let selectedSuspiciousPoint = null;

/* INFO PODACI */
const infoData = {
  1:{title:"Lijeva dojka", text:"Pregledaj lijevu dojku kružnim pokretima..."},
  2:{title:"Desna dojka", text:"Pregledaj desnu dojku..."},
  3:{title:"Bradavice", text:"Provjeri bradavice..."},
  4:{title:"Donji dio dojki", text:"Pregledaj donji dio..."},
  5:{title:"Lijevi pazuh", text:"Provjeri pazuh..."},
  6:{title:"Desni pazuh", text:"Provjeri pazuh..."}
};

/* SHOW INFO */
function showInfo(id){
    document.getElementById("infoBox").innerHTML =
    `<h3>${infoData[id].title}</h3><p>${infoData[id].text}</p>`;
}

/* MODAL */
function openModal(){
    document.getElementById("modal").style.display="flex";
}

function closeModal(){
    document.getElementById("modal").style.display="none";
}

/* TOGGLE SUSPICIOUS */
document.addEventListener("DOMContentLoaded",()=>{

    const select = document.getElementById("examStatus");
    const area = document.getElementById("suspiciousArea");

    select.addEventListener("change",(e)=>{
        area.style.display = (e.target.value === "Uredu") ? "none" : "block";
    });

    loadData();
});

/* SELECT POINT */
function selectPoint(id,event){

    selectedSuspiciousPoint = id;

    document.querySelectorAll(".sus-btn")
        .forEach(b=>b.classList.remove("sus-active"));

    event.target.classList.add("sus-active");

    document.getElementById("selectedPointText")
        .innerText = "Odabrana točka: " + id;
}

/* SAVE */
function saveExam(){

    const status = document.getElementById("examStatus").value;

    const date = new Date().toLocaleDateString("hr-HR");

    localStorage.setItem("examDate",date);
    localStorage.setItem("examStatus",status);

    if(status !== "Uredu" && selectedSuspiciousPoint){
        localStorage.setItem("suspiciousPoint",selectedSuspiciousPoint);
    } else {
        localStorage.removeItem("suspiciousPoint");
    }

    document.getElementById("savedDate").innerText = date;

    const box = document.getElementById("statusBox");
    box.style.display="block";

    let text = status;

    if(selectedSuspiciousPoint){
        text += " (točka " + selectedSuspiciousPoint + ")";
    }

    box.innerHTML = text;

    box.className="status-box";

    if(status==="Uredu") box.classList.add("normal");
    else if(status==="Sumnjivo") box.classList.add("warning");
    else box.classList.add("danger");

    closeModal();
}

/* LOAD */
function loadData(){

    const date = localStorage.getItem("examDate");
    const status = localStorage.getItem("examStatus");
    const point = localStorage.getItem("suspiciousPoint");

    if(date) document.getElementById("savedDate").innerText = date;

    if(status){
        const box = document.getElementById("statusBox");
        box.style.display="block";
        box.innerText=status;

        if(status==="Uredu") box.classList.add("normal");
        else if(status==="Sumnjivo") box.classList.add("warning");
        else box.classList.add("danger");
    }

    if(point){
        document.getElementById("selectedPointText").innerText =
            "Sumnjiva točka: " + point;
    }
}