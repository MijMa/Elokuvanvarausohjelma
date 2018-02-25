// Kaikki javascripti joka liittyy adminsivuun ja redirectaamiseen

// array johon kaikki lisatyt kaytajat tallennetaan
var userArray = [];
userArray[0] = "@ default default"
// sessionstorage asettaa stringin, 
// aluksi muokataan array string-muotoon kayttamalla JSON.stringify jonka jalkeen
//  kaytetaan JSON:ia muokkaamaan asetettavaa stringia takaisin arrayksi muokattavaan muotoon (JSON.parse)
// sessionStorage.setItem("mySharedLoginData", JSON.stringify(userArray));
var error = document.getElementById("RegisterAlertArea");
var loginError = document.getElementById("LoginAlertArea");
var RegisterErrorText = document.getElementById("errorText");
function registerUser(){
    var check = document.getElementById("adminCheckbox").checked;
    var x = document.forms["registerForm"]["givenUsername"].value;
    var y = document.forms["registerForm"]["givenPassword"].value;
    // Tarkistaa onko arvoja annettu ja onko annetuissa arvoissa paallekkaisyyksia
    if (x==null || x == "" || y==null || y==""){
            error.style.display = 'block';
            return;
        } else if (userArray.includes("@ " + x + " " + y) || userArray.includes(x + " " + y)) {
            error.style.display = 'block';
            RegisterErrorText.textContent = "ERROR: User already exists within current instance";
            return;
        } else {
            error.style.display = 'none';
            if (check == true){
            userArray.push("@ " + x + " " + y);
                alert("1");
            } else {
            userArray.push(x + " " + y);
                alert("2");
                alert(JSON.stringify(userArray));
            }
        }
    // /n siis toimii rivinvaihtona inputtien valilla
    (document.getElementById("addedUsersArea")).value = userArray.join("\n")
    sessionStorage.setItem("mySharedLoginData", JSON.stringify(userArray));
    
    // Paivitetaan tietokantaan juuri lisatty kayttaja
    var elokuvaPOST = {
        username: x,
        password: y,
        elokuva: [],
        sali: [],
        aika: [],
        paikka: []
    };
    
    $.ajax({
        type: 'POST',
        url: 'http://rest.learncode.academy/api/elokuvaData/kauttajatTesti',
        data: elokuvaPOST,
        success: function(dataPOST){
            sessionStorage.setItem("mySharedLoginUsername", x);
            sessionStorage.setItem("mySharedLoginPassword", y);
            console.log(sessionStorage.getItem("mySharedLoginUsername") + " & " + sessionStorage.getItem("mySharedLoginPassword"));
            console.log("user registered to database:");
            console.log(dataPOST);
        }
    });
}

// loginarray viittaa siis tamanhetkisiin syoteboxeihin laitettuun kayttajanimeen ja salasanaan
// loginarray ei ole millaan tavalla liitoksissa REST-ohjelmointirajapinnan tietokantaan vaan
// tieto on vain sessionstoragessa.
function loginUser(){
    var loginArray = [];
    
    // Sessionstorage palauttaa Stringin, kaytetaan JSON:in parse-metodia muuttamaan listan string-muotoon
    loginArray = JSON.parse(sessionStorage.getItem("mySharedLoginData"));
    
    // tarkistetaan onko yhtaan kayttajaa kirjattu sisaan tassa sessiossa
    if (loginArray == null || loginArray == undefined){
        loginError.style.display = 'block';
        RegisterErrorText.innerHTML = "ERROR: No readable users registered";
        return;
    }
    var x = document.forms["loginForm"]["loginUsername"].value;
    var y = document.forms["loginForm"]["loginPassword"].value;
    
    // voisi tehda kaksitasosen if-lausekkeen, erikseen tyhjalle kentalle ja kentalle jossa arvot ovat vaaria
    if (x==null || x == "" || y==null || y=="" || (!loginArray.includes("@ " + x + " " + y) && !loginArray.includes(x + " " + y))){
        loginError.style.display = 'block';
        RegisterErrorText.innerHTML = "ERROR: Incorrect username or password";
        alert(loginArray.includes("@ " + x + " " + y) + " " + loginArray.includes(x + " " + y));
        return;
    }
    alert(loginArray.includes("@ " + x + " " + y) + " " + loginArray.includes(x + " " + y));
    // tassa if-lauseessa asetetaan uusin kirjautunut kayttaja instanssin loginiksi, tata kaytetaan jatkossa varauksiin
    var currentUserImput = "@ " + x + " " + y
    if (loginArray.includes("@ " + x + " " + y) && searchStringInArray("@ " + x + " " + y, loginArray) != -1){
        alert("adminuser");
        sessionStorage.setItem("currentLoginIndex", searchStringInArray("@ " + x + " " + y, loginArray));
        sessionStorage.setItem("currentLoginUser", loginArray[searchStringInArray("@ " + x + " " + y, loginArray)]);
        //redirect loginin jalkeen
        window.location.href="index.html"; 
        
    } else if (loginArray.includes(x + " " + y) && searchStringInArray(x + " " + y, loginArray) != -1){
        alert("normaluser");
        sessionStorage.setItem("currentLoginIndex", searchStringInArray(x + " " + y, loginArray));
        sessionStorage.setItem("currentLoginUser", loginArray[searchStringInArray(x + " " + y, loginArray)]);
        //redirect loginin jalkeen
        window.location.href="elokuvaAsiakassivu.html"; 
    } else alert("Unknown login error has occurred");
}

// loginuserin tamanhetkisen kirjautujan etsiminen rekisteroityjen kayttajien listasta,
// palauttaa indeksin jossa kauttaja on mikali annettu parametri on listassa
function searchStringInArray (searchString, searchStringArray) {
    for ( var i = 0 ; i < searchStringArray.length ; i++ ) {
        if (searchStringArray[i] == searchString) 
            return i;
    }
    return -1;
}

// funktio jolla paivitetaan html-osiot jotka ovat riippuvaisia annetusta kauttajasta
function paivitaKayttajaElementit(kayttajaElementti){
    kayttajaElementti.innerHTML = sessionStorage.getItem("currentLoginUser");
    alert(sessionStorage.getItem("currentLoginUser"));
    
}

stringElementti1 = '<td class=" has-events" rowspan="';
rowspanElementti = ""+ listanPituusCounter +"";
stringElementti2 = '"><div class="row-fluid elokuvaElementti1" style="width: 99%; height: 100%;"><span class="title">' ;
stringElementti3 = '</span> <span class="sali"><a>' ;
stringElementti4 = '</a></span><span class="aika">' ;
stringElementti5 = '</span></div></td>' ;

perusStringElementti = '<td class=" no-events" rowspan="1"></td>';

var elokuvaBlokki = stringElementti1 + rowspanElementti + stringElementti2 + elokuvanNimi + stringElementti3 + sali + stringElementti4 + aika + stringElementti5;

var elokuvanNimi = "asda";
var sali = "sali 1*";
var aika = changeFunc() || "00:31";

jQuery(".list-group-item").click(function (e) {
    jQuery(this).addClass('active').siblings().removeClass('active');
});
jQuery("#sel1").click(function (ee) {
    jQuery(this).addClass('selected').siblings().removeClass('active');
});

// Eventlistenerit hyllytetty silla tarkistuksen voi asettaa submittausmetodin alkuun
var elokuvanNimiElementti = document.getElementById("ElokuvaNimiImput");
var selectBox = document.getElementById("sel2");
var selectedValue = selectBox.options[selectBox.selectedIndex].value;
var selectedTimeIndex = selectBox.options[selectBox.selectedIndex].index;
var selectedTimeIndex2 = selectedTimeIndex;
elokuvanNimiElementti.addEventListener("", changeFunc)
selectBox.addEventListener("", changeFunc)
function changeFunc() {
    var selectBox = document.getElementById("sel2");
    selectedValue = selectBox.options[selectBox.selectedIndex].innerHTML;
    selectedTimeIndex = selectBox.options[selectBox.selectedIndex].index;
    selectedTimeIndex2 = selectedTimeIndex;
    aika = selectedValue;
    
    elokuvanNimi = document.getElementById("usrInputNimi").value;
    
    updateHTMLBlock();
    }
$("td").change(function() {
    alert($(this).find("option:selected").text()+' clicked!');
});

$("#myElement").click(function() {
    $(this).siblings(":last").hide();
});
$("a").click(function(event){
    event.preventDefault();
});
// updates all the clickevents for the td tags of the calendar
var checklist = document.getElementsByTagName("td");
function updateCalendarEvents(){
    var checklist = document.getElementsByTagName("td");
    for (var i = 0; i < checklist.length; i++) {
    checklist[i].addEventListener("click", updateSelectedtd)
    }
}

// var tdlista = checklist.querySelectorAll("td");
for (var i = 0; i < checklist.length; i++) {
    checklist[i].addEventListener("click", updateSelectedtd)
}
function updateSelectedtd(){
    for (var k = 0; k < checklist.length; k++) {
        checklist[k].style.backgroundColor = "#492079";
        if ($(checklist[k]).hasClass('selected')){
            checklist[k].classList.remove("selected");
        }
        else if ($(checklist[k]).hasClass('selectedForAnnihilation')){
            checklist[k].classList.remove("selectedForAnnihilation");
        }
    }
    if($(this).hasClass('noselect')){
        return;
        } else if($(this).hasClass('has-events')){
            $(this).addClass('selectedForAnnihilation')
            this.style.backgroundColor = "#e20a0a";
        }
        else {
            this.classList.add("selected");
            $(this).addClass('selected')
            this.style.backgroundColor = "green";
        }
}
function updateHTMLBlock(){
    elokuvaBlokki = stringElementti1 + rowspanElementti + stringElementti2 + elokuvanNimi + stringElementti3 + sali + stringElementti4 + aika + stringElementti5;
}

var asda = document.getElementsByName
function tarkistaKoko(){
    if (parseInt(rowspanKokoSallija, 10) < (selectedTimeIndex +1)) {
        return false;
        } else {
        return true;
    }
}
function tarkistaKokoKonfliktit(){
while(selectedTimeIndex2 > 0) {
    if (!$(seuraavanLapsitdt2[rowspanKohta]).hasClass('no-events')){
        alert("Asettamasi aika on konfliktissa toisen ajan kanssa");
        return false;
    }
    seuraavanLapsitdt2 = seuraavanLapsitdt2[0].parentElement.nextElementSibling.children;
    selectedTimeIndex2--;
    }
}


var rowspanKokoSallija = 0;
var seuraavaIsantatd;
var seuraavanLapsitdt;
var tdosoitin;
var listanPituusCounter;
// Kaytetaan uuden elokuvablokin sijoittamiseen kalenteriin adminin toimesta.
// Kutsuu tarkistakonfliktit() ja poistaa tyhjät blokit elokuvablokin alta.
function asetaAika(){
    changeFunc();
    rowspanElementti = selectedTimeIndex +1;
    updateHTMLBlock();
    
    if (elokuvanNimi == ""){
        alert("Et antanut nimea");
        return;
        }
    for (var u = 0; u < checklist.length; u++) {
        if ($(checklist[u]).hasClass('selected')){
            
            var whileLoopControlElement = checklist[u];
            seuraavanLapsitdt = whileLoopControlElement.parentElement.nextElementSibling.children;
            seuraavanLapsitdt2 = whileLoopControlElement.parentElement.nextElementSibling.children;
            rowspanKohta = $(checklist[u]).index();
            rowspanKokoSallija = parseInt(checklist[u].parentElement.children[0].className.split(' ')[1]);
            
            if (tarkistaKoko() == false){
                alert("Elokuvan aika yli aukiolajan");
                return;
            } 
            if (tarkistaKokoKonfliktit() != false){
                while(selectedTimeIndex > 0) {
                    //HAIKKAAA Indeksi arvo rowspankohta on vaarin silla koodi ei ota huomioon
                    // elokuvablokkien alla olevia puuttuvia gridin elementteja,
                    // koodi pitaisi uudelleenkirjoittaa niin etta elokuvablokeissa olisi 
                    // mukana placeholderblokkeja.
                    if ($(seuraavanLapsitdt[rowspanKohta]).hasClass('no-events')){
                        $(seuraavanLapsitdt[rowspanKohta]).remove();
                    }
                    seuraavanLapsitdt = seuraavanLapsitdt[0].parentElement.nextElementSibling.children;
                    selectedTimeIndex--;
                }
            } else return;
            $(checklist[u]).replaceWith( elokuvaBlokki );

    //        while(selectedTimeIndex > 0) {
    //        $(seuraavanLapsitdt).last("td").remove();
                /**
                * tassa voisi nyt olla jaaneen undefined arvon poisto, unefined on automaattisesti listan lopussa
                */
    //        listanPituusCounter = seuraavanLapsitdt.length;
    //        seuraavanLapsitdt = seuraavanLapsitdt[0].parentElement.nextElementSibling.children;
                
    //        selectedTimeIndex--;
    //        }
            
        }
    }
    updateCalendarEvents();
    tablelist = $(".tableTogglet");
    sessionStorage.setItem("GlobalTableArray", tablelist);
}

var para = document.createElement("td");
function poistaAika(){
    for (var u = 0; u < checklist.length; u++) {
//        if ($(checklist[u]).hasClass('selectedForAnnihilation') && $(checklist[u]).hasClass('no-events')) {
//            $(checklist[u]).replaceWith( perusStringElementti );
//            }
        if ($(checklist[u]).hasClass('selectedForAnnihilation')){
            var lisaajaCounterArvo = checklist[u].rowSpan;
            var whileLoopControlElement = checklist[u];
            seuraavanLapsitdt = whileLoopControlElement.parentElement.children;
            var seuraavanParenttd = whileLoopControlElement.parentElement.nextElementSibling;
            rowspanKohta = $(checklist[u]).index();
            
            while(lisaajaCounterArvo > 1) {
            //    if ($(seuraavanLapsitdt[rowspanKohta]).hasClass('no-events')){
            //        seuraavanParenttd.insertBefore(para, lapsitdtNode[rowspanKohta]);
                    seuraavanParenttd.children[rowspanKohta].insertAdjacentHTML("beforebegin", perusStringElementti);
                    alert("used");
            //    }
            //    var seuraavanParenttd = seuraavanLapsitdt[0].parentElement.nextElementSibling;
        //        $( seuraavanParenttd.previousElementSibling ).append( perusStringElementti );
            //    listanPituusCounter = seuraavanLapsitdt.length;
                seuraavanParenttd = seuraavanParenttd.children[0].parentElement.nextElementSibling;
                
                lisaajaCounterArvo--;
                }

            alert(checklist[u].rowSpan);
            $(checklist[u]).replaceWith( perusStringElementti );
            updateCalendarEvents();
        }
        tablelist = $(".tableTogglet");
        sessionStorage.setItem("GlobalTableArray", tablelist);
}
}

var modiviedtime = document.lastModified;
var ataglist = document.getElementsByClassName("saliTogglet");
//ataglist = fillArray(ataglist, 3);
//ataglist[0] = document.getElementById("original");
var tablelist = $(".tableTogglet");
sessionStorage.setItem("GlobalTableArray", tablelist);
//var tableArray = document.getElementsByClassName("tableTogglet");
//tableArray = fillArray(tableArray, 4);
//tableArray[0] = document.getElementById("theTable");
//var nappilist = document.getElementsByClassName("nappiSetit");
var nappilist = $(".nappiSetit");
//nappilist = fillArray(nappilist, 3);
//nappilist[0] = document.getElementById("nappiSetti");
var teatteriNappilist = document.getElementsByClassName("teatteriTogglet");

function toggleTeatteri(sali){
//    for (var i = 0; i < ataglist.length; i++){
//        $(ataglist[i]).removeClass("active");
//    }
    $( nappilist[sali] ).toggle(true);
    $(nappilist[sali]).siblings().toggle( false );
}
toggleTeatteri("0")
$(ataglist[0]).addClass("active");

function toggleShowRoom(room){
    for (var i = 0; i < ataglist.length; i++){
        $( ataglist[i] ).removeClass("active");
    }
    $( tablelist[room] ).toggle(true);
    $(tablelist[room]).siblings().toggle( false );
};
toggleShowRoom(0);

function toggleTable(indexsi) {
    for (var i = 0; i < ataglist.length; i++) {
        var x = ataglist[i];
        if (x.style.display === 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
    }
}
    //var lTable = document.getElementById(""+table1+"");
    //lTable.style.display = (lTable.style.display == "table1") ? "none" : "table1";

// Elokuvateatterinappien salinvaihto klikattaessa elokuvateatterinappeja 
jQuery(".list-group-item").click(function (e) {
    jQuery(this).addClass('active').siblings().removeClass('active');
});

//for (var i = 0; i < teatteriNappilist.length; i++) {
//    teatteriNappilist[i].addEventListener("click", toggleShowRoom())
//}
//arraykokeilu----------------------------------------------------------------------------------------------------------------------------
function fillArray(elementti, arvo) {
  var arr = [];
  for (var i = 0; i < arvo; i++) {
    arr.push(elementti);
  }
  return arr;
}

//function getIndexAndWorkFromThere(){
//for (var i = 0, neljanNappiSetit = aNapit.children.length; i < len; i++){
//    var aNapit = document.getElementById('nappiSetti');
//    for (var i = 0, len = aNapit.children.length; i < len; i++){
//
//        (function(index){
//            aNapit.children[i].onclick = function(){
//                alert(index)  ;
//                toggleTable(index);
//                
//            }
//               
//        })(i); //TAAVAYTBRHTHEFUCKISTHISMARKINGANDWHYDOESREMOVINGITBREAKTHECODE
//
//    }
//}

//var Hienotapatehdapuuttuvialukuja = clickOnButtonList || 0;
// koska variableen ei voi tallentaa clickonbuttonlistia koska sita ei viela ole olemassa, siihen tallennetaan 0.

//var clickOnButtonList = document.getElementsByClassName("list-group-item");
//for (i = 0; i < clickOnButtonList.length; i++ ){
//    clickOnButtonList[i].addEventListener("click", clickOnButton)
//}
//function clickOnButton(){
//    //Looppi toimii!
//}
//piece of code that does actions
//minimoi funktioiden toistokäyttö
//function go(name, age) {
//    "use strict";
//    if (age < 20) {
//        return name + "!";
//        } else {
//            return name;
//        }
// alert(go("will",34));
//}

