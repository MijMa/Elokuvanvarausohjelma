// Kaikki javascripti joka liittyy asiakassivuun


// funktio joka ottaa index.html -sivulta kalenterin html:n ja kiinnittää siihen uudet funktiot
//  tassa olisi alun perin voinut laittaa suuret HTML-blokit erillisiin moduuleihin mistä niita
//  olisi kutsuttu ja kasitelty.
function fetchKalenteriHTML() {
                //$("#OGtablediv").load('index.html #insertTableDiv > *');
        $.get("index.html", function(data) {
        $("#insertTableDiv").replaceWith($(data).find("#OGtablediv"));
        updateCalendarEvents();
        getUudetSalit();
        toggleShowRoom(0);
    //$("#insertTableDiv").replaceWith($(data).id)
        });
    //jQuery('#insertTableDiv').load('index.html #OGtablediv');
//    var element = document.getElementById("insertTableDiv");
//    var broughtElement = $.get("index.html", null, function(element){
//        var gottenElement = $((element).find(".tablediv"));
//        alert(gottenElement);
//    });
//    element.appendChild(document.createTextNode('The man who mistook his wife for a hat'));
//    document.getElementById("insertTableDiv").appendChild(element);

}
fetchKalenteriHTML();

function getUudetSalit(){
    tablelist = $(".tableTogglet");
}

// Javaskriptilla ei voi viitata korvattuun dataan koska korvattu data ei nay DOM:issa, sen sijaan on kaytettava jquerya
//  joka puolestaan kutsuu javaskriptia.
$(document).ready(function(){
            var checklist = document.getElementsByTagName("td");
            for (var i = 0; i < checklist.length; i++) {
                checklist[i].addEventListener("click", updateSelectedtd)
            }
            updateSeatEvents();
            getUudetSalit();
            toggleShowRoom(0);
//        });
    
    
    });   
getUudetSalit();

// Kaytossa AJAX, yritetaan luoda kalenterisivujen vuorovaikutuksesta sujuvaa--------------------------------------------------------------------
// OBSOLETE4NOW, voidaan viela kayttaa vaihtoehtona elokuvien tallennukselle apin sijaan
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // (TEE TÄMÄ LOKAALIKSI KALENTERIHTML_N KANSSA)
      document.getElementById("addedUsersArea").innerHTML = this.responseText;
    }
 };
  xhttp.open("GET", "xdd.txt", true);
  xhttp.send();
} 

var error = document.getElementById("RegisterAlertArea");
stringElementti1 = '<td class=" has-events" rowspan="';
rowspanElementti = ""+ listanPituusCounter +"";
stringElementti2 = '"><div class="row-fluid elokuvaElementti1" style="width: 99%; height: 100%;"><span class="title">' ;
stringElementti3 = '</span> <span class="sali"><a>' ;
stringElementti4 = '</a></span><span class="aika">' ;
stringElementti5 = '</span></div></td>' ;

//var elokuvaBlokki = stringElementti1 + rowspanElementti + stringElementti2 + elokuvanNimi + stringElementti3 + sali + stringElementti4 + aika + //stringElementti5;

var elokuvanNimi = "asda";
var sali = "sali 1*";
var elokuvanNimiElementti = document.getElementById("ElokuvaNimiImput");

jQuery(".list-group-item").click(function (e) {
    e.preventDefault();
    jQuery(this).addClass('active').siblings().removeClass('active');
});

$("#myElement").click(function() {
    $(this).siblings(":last").hide();
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
//for (var i = 0; i < checklist.length; i++) {
//    checklist[i].addEventListener("click", updateSelectedtd)
//}

// elokuvaelementtejen valinta klikkaamalla ja valinnan yllapito, myos paikkavalinnan esilletuonti
var seatDivider = document.getElementById("seatDiv");
var seatselectionHidden = true;
function updateSelectedtd(){
    for (var k = 0; k < checklist.length; k++) {
        checklist[k].style.backgroundColor = "#492079";
        if ($(checklist[k]).hasClass('selectedForSelection')){
            checklist[k].classList.remove("selectedForSelection");
        }
    }
    if($(this).hasClass('noselect')){
        return;
        } else if($(this).hasClass('has-events')){
            $(this).addClass('selectedForSelection')
            this.style.backgroundColor = "green"; // tasoittaa myos varityksen tdn oikealta puolelta klikattaessa
            if (seatselectionHidden) {
                $(seatDivider).removeClass("elementToHide");
                seatselectionHidden = false;
            }
        }
}
function updateHTMLBlock(){
    elokuvaBlokki = stringElementti1 + rowspanElementti + stringElementti2 + elokuvanNimi + stringElementti3 + sali + stringElementti4 + aika + stringElementti5;
}

// updates all the clickevents for the Seats of the calendar selection
var seatList = $('.seatNumber');
function updateSeatEvents(){
    seatList = $('.seatNumber');
    for (var i = 0; i < seatList.length; i++) {
    seatList[i].addEventListener("click", updateSelectedSeat);
    }
}
// elokuvaelementtejen valinta klikkaamalla ja valinnan yllapito
function updateSelectedSeat(){
    for (var k = 0; k < seatList.length; k++) {
        if ($(seatList[k]).hasClass('selectedForSeatSelection')){
            seatList[k].classList.remove("selectedForSeatSelection");
        }
    }
    if($(this).hasClass('seatUnavailable')){
        return;
        } else {
            $(this).addClass('selectedForSeatSelection')
        }
}


function reserveSeat() {
    if ( $( "td" ).hasClass("selectedForSelection") && $( "div" ).hasClass("selectedForSeatSelection") ) {
        var optionArea = document.getElementById("optionsSelect");
        var selectedMovie = document.getElementsByClassName("selectedForSelection");
        var selectedSeat = document.getElementsByClassName("selectedForSeatSelection");
        
        var currentSeat = $("div .selectedForSeatSelection").first().text();
        var currentMovieTitle = (selectedMovie[0].firstElementChild).children[0].textContent;
        var currentMovieVenue = (selectedMovie[0].firstElementChild).children[1].textContent;
        var rcurrentMovieTime = (selectedMovie[0].firstElementChild).children[2].textContent;
        var option = document.createElement("option");
        var optionGroup = document.createElement("optgroup");
        option.text = currentSeat;
        
        // tehdaan if-lause joka tarkastaa onko optionslistassa jo samaa elokuvaa jonka alle paikkavalinta voitaisiin asettaa
        var optGroupElemetit = optionArea.children;
        for (var i = 0; i < optGroupElemetit.length; i++) {
            if (optGroupElemetit[i].label == currentMovieTitle + currentMovieVenue + rcurrentMovieTime){
                console.log(optGroupElemetit[i]);
                var replacementOption = optGroupElemetit[i].appendChild(option); // ysysysy
                //optGroupElemetit[i].add(option);
                console.log(optGroupElemetit[i]);
            }
        }
        
        optionGroup.label = currentMovieTitle + currentMovieVenue + rcurrentMovieTime;
        optionGroup.appendChild(option);
        optionArea.add(optionGroup);
    }
}

var rowspanKokoSallija = 0;
var seuraavaIsantatd;
var seuraavanLapsitdt;
var tdosoitin;
var listanPituusCounter;

currentUsername = sessionStorage.getItem("mySharedLoginUsername");
currentPassword = sessionStorage.getItem("mySharedLoginPassword");
var varausElokuva = [];
var varausSali = [];
var varausAika = [];
var varausPaikka = [];
var elokuvaPUT;
// funktio joka varaa ajan tamanhetkiselle kayttajalle, ottaa talteen varauksen paivan, kellonajan ja elokuvan nimen
// HUOMIO: checklist.length palauttaa 2269, saattaa tarkoittaa etta se palauttaa kaikki tagit sisallaan eroteltuina listassa
// HUOMIO: Luokkapohjainen rakenne huomattavasti parempi tehukkuuden(muisti), turvallisuuden ja selkeyden kannalta
function varaaAika(){
    //rowspanElementti = selectedTimeIndex +1;
    //updateHTMLBlock();
    checklist = document.getElementsByTagName("td");
    
    for (var u = 0; u < checklist.length; u++) {
        if ($(checklist[u]).hasClass('selectedForSelection')){
            elokuvanNimi = document.getElementById("usrInputNimi").value;
            // eka childnodes() palauttaa <span> tagit ja toinen arvon johon muuttujanimi viittaa
            varausElokuva = checklist[u].childNodes[1].childNodes[1].textContent;
            varausSali = checklist[u].childNodes[1].childNodes[3].textContent;
            varausAika = checklist[u].childNodes[1].childNodes[5].textContent;
            alert(varausElokuva + varausSali + varausAika);
            
            rowspanKohta = $(checklist[u]).index();
            rowspanKokoSallija = parseInt(checklist[u].parentElement.children[0].className.split(' ')[1]);
            
            $.ajax({
                type: 'GET',
                url: 'http://rest.learncode.academy/api/elokuvaData/kauttajatTesti',
                success: function(gottenData){
                    console.log(gottenData);
                    postMovieDataToBackend(gottenData);
                    //clearAPI(gottenData);
                }
            });
        }
    }
    updateCalendarEvents();
}

// Kaytossa jquery AJAX, postataan backendin JSONiin ja asetetaan sinne varattu elokuva henkilolle
// JAvascriptilla ei voida kirjoittaa JSON:ia tiedostoon, sen sijaan kaytetaan jQuery:a
// Kaytossa on learncodeAcademyn ilmainen RESTful Api johon tallennetut tiedot poistetaan vuorokauden valein
// tama julkinen api on tehty juuri AJAXin harjoittelua varten.
function postMovieDataToBackend(givenData) {
    
    if (typeof currentUsername === 'undefined' || currentUsername == "" || typeof currentPassword === 'undefined' || currentPassword == "") {
        console.log("Username could not be fetched from sessionstorage");
        console.log("currentUser: " + currentUsername);
        return;
    }
    
    // for looppi kay lapi kaikki kayttajat JSON-listassa ja kun tamanhetkinen kayttaja loytyy,
    // hanelle asetetaan uusi elokuvavaraus uusien rinnalle
    for (var i = 0;  i < givenData.length; i++){
        if (givenData[i].username == currentUsername && givenData[i].password == currentPassword ){
            
        // paivitukset muuttujille jotka kuuluvat tamanhetkiselle kayttajalle
        currentUsername = sessionStorage.getItem("mySharedLoginUsername");
        currentPassword = sessionStorage.getItem("mySharedLoginPassword");
        //varausElokuva = givenData[i].elokuva.push(varausElokuva);
        console.log(typeof givenData[i].elokuva)
        console.log(givenData[i].elokuva)
//        varausElokuva = JSON.parse(givenData[i].elokuva.push(varausElokuva));
//        varausSali = varausSali;
//        varausAika = varausAika;
//        varausPaikka = "ei viela ole";
        testArrayStructure(givenData, i);
            
        elokuvaPUT = {
            username: currentUsername,
            elokuva: varausElokuva,
            sali: varausSali,
            aika: varausAika,
            paikka: varausPaikka
        };
        console.log(elokuvaPUT);
        $.ajax({
            type: 'PUT',
            url: 'http://rest.learncode.academy/api/elokuvaData/kauttajatTesti/' + givenData[i].id,
            data: elokuvaPUT,
            success: function(){
                console.log("Update succesful");
            }
        });
        // lista paivittaa vain ensimmaisen sopivan arvon, eika kay lapi duplikaatteja
        return;
        }
    }
    console.log("The update the client requested is not properly formatted")
    
    
}
// funktio joka asettaa Apiin kayttajien arrayt mikali niita ei jo ole,
//  ja lisaa arrayyn uusia arvoja
function testArrayStructure(gottenData2, i){
    console.log(gottenData2[i])
    console.log(gottenData2[i].elokuva)
    if(gottenData2[i].elokuva == null || gottenData2[i].elokuva == undefined) {
        varausElokuva = [varausElokuva];
    } else {
        gottenData2[i].elokuva.push(varausElokuva);
        varausElokuva = gottenData2[i].elokuva;
    }
    if(gottenData2[i].sali == null || gottenData2[i].sali == undefined) {
        varausSali = [varausSali];
    } else {
       gottenData2[i].sali.push(varausSali);
        varausSali = gottenData2[i].sali;
    }
    if(gottenData2[i].aika == null || gottenData2[i].aika == undefined) {
        varausAika = [varausAika];
    } else {
        gottenData2[i].aika.push(varausAika);
        varausAika = gottenData2[i].aika;
    }
    if(gottenData2[i].paikka == null || gottenData2[i].paikka == undefined) {
        varausPaikka = [varausPaikka];
    } else {
        gottenData2[i].paikka.push(varausPaikka);
        varausPaikka = gottenData2[i].paikka;
    }

}
//funktio kaikkien rajapinnan kayttajatietojen poistamiseksi
function clearAPI(givenToDeleteData){
    
    for (var i = 0;  i < givenToDeleteData.length; i++){
            
            $.ajax({
                type: 'DELETE',
                url: 'http://rest.learncode.academy/api/elokuvaData/kauttajatTesti/' + givenToDeleteData[i].id,
                success: function(){
                    console.log("Deletion succesful");
                }
            });
    }
    
}

var modifiedtime = document.lastModified;
var ataglist = document.getElementsByClassName("saliTogglet");
var tablelist = $(".tableTogglet");
var nappilist = $(".nappiSetit");
var teatteriNappilist = document.getElementsByClassName("teatteriTogglet");

// Elokuvateatterin valinta ja toggle kutsumalla
function toggleTeatteri(sali){
//    for (var i = 0; i < ataglist.length; i++){
//        $(ataglist[i]).removeClass("active");
//    }
    $( nappilist[sali] ).toggle(true);
    $(nappilist[sali]).siblings().toggle( false );
}
toggleTeatteri(0)
$(ataglist[0]).addClass("active");

// Elokuvasalin valinta ja toggle kutsumalla
function toggleShowRoom(room){
    for (var i = 0; i < ataglist.length; i++){
        $( ataglist[i] ).removeClass("active");
    }
    $( tablelist[room] ).toggle(true);
    $(tablelist[room]).siblings().toggle( false );
}
getUudetSalit();
toggleShowRoom(0);

// Elokuvateatterinappien salinvaihto klikattaessa elokuvateatterinappeja 
jQuery(".list-group-item").click(function (e) {
    e.preventDefault();
    jQuery(this).addClass('active').siblings().removeClass('active');
});

function fillArray(elementti, arvo) {
  var arr = [];
  for (var i = 0; i < arvo; i++) {
    arr.push(elementti);
  }
  return arr;
}
