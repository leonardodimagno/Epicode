"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;

class Persona {
    constructor(nome, cognome) {
        this._nome = nome;
        this._cognome = cognome;
    }
}

class User extends Persona {
    constructor(id, _nome, _cognome, credito, numeroChiamate) {
        super(_nome, _cognome);
        this.id = id;
        this.credito = credito;
        this.numeroChiamate = numeroChiamate;
    }
    ricarica(valoreRicarica) {
        this.credito += valoreRicarica;
    }
    chiamata(minDurata) {
        this.numeroChiamate += 1;
        this.credito = +Number.parseFloat(this.credito - (0.22 + 0.24 * minDurata) + "").toFixed(2);
    }
    tel119() {
        return this.credito;
    }
    getNumeroChiamate() {
        return this.numeroChiamate;
    }
    azzeraChiamte() {
        this.numeroChiamate = 0;
    }
    get nome() {
        return this._nome;
    }
    get cognome() {
        return this._cognome;
    }
}

let user1 = new User(0, "Nicola", "Morini", 25, 0);
let user2 = new User(1, "Gabriele", "Cestra", 30, 1);
let user3 = new User(2, "Franco", "Losi", 10, 2);

let arr = [user1, user2, user3];
let selectedUser;
let durata;
let interval;
let tester = document.querySelector("#tester");
let display = document.querySelector("#display");
let userSelector = document.querySelector("#userSelector");
let closeCall = document.querySelector("#closeCall");

userSelector.addEventListener("change", selectUser);
(_a = document.querySelector("#btn1")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", infoCredito);
(_b = document.querySelector("#btn2")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", infoChiamate);
(_c = document.querySelector("#btn3")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", ricarica1);
(_d = document.querySelector("#btn4")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", ricarica2);
(_e = document.querySelector("#btn5")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", ricarica3);
(_f = document.querySelector("#btn6")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", ricarica4);
(_g = document.querySelector("#btn7")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", azzeramentoCalls);
(_h = document.querySelector("#btn8")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", telefonata);
(_j = document.querySelector("#newUser")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", aggiungiUtente);
(_k = document.querySelector("#callBtn")) === null || _k === void 0 ? void 0 : _k.addEventListener("click", stopTelefonata);

for (let i = 0; i < arr.length; i++) {
    
    let id = arr[i].id;
    let name = arr[i].nome;
    let surname = arr[i].cognome;
    let credit = arr[i].credito;
    let call = arr[i].numeroChiamate;
    
    let newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${id}</td>
                        <td>${name}</td>
                        <td>${surname}</td>
                        <td id="credito${id}">${credit}&euro;</td>
                        <td id="call${id}">${call}</td>`;
    (_l = document.querySelector("#tb")) === null || _l === void 0 ? void 0 : _l.appendChild(newRow);
    
    let newOption = document.createElement("option");
    newOption.value = id + "";
    newOption.innerText = id + " " + name + " " + surname;
    userSelector.appendChild(newOption);
}

function aggiungiUtente() {
    var _a;
    
    let input1 = document.querySelector("#name");
    let input2 = document.querySelector("#surname");
    let input3 = document.querySelector("#credit");
   
    let id = arr.length;
    let name = input1.value.trim();
    let surname = input2.value.trim();
    let credit = Number(input3.value);
   
    if (name == "" || surname == "") {
        return alert("Scrivi nome e cognome per aggiungere un nuovo user");
    }
    else {
        arr.push(new User(id, name, surname, credit, 0));
        
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${id}</td>
                            <td>${name}</td>
                            <td>${surname}</td>
                            <td id="credito${id}">${credit}&euro;</td>
                            <td id="call${id}">0</td>`;
        (_a = document.querySelector("#tb")) === null || _a === void 0 ? void 0 : _a.appendChild(newRow);
       
        let newOption = document.createElement("option");
        newOption.value = id + "";
        newOption.innerText = id + " " + name + " " + surname;
        userSelector.appendChild(newOption);
    }
}

function selectUser() {
    if (userSelector.value === "null") {
        display.innerText = "Seleziona un user";
    }
    else {
        let sel = Number(userSelector.value);
        selectedUser = arr[sel];
        display.innerText = selectedUser.nome;
    }
}

function infoCredito() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un user";
    }
    else {
        display.innerText = "Credito attuale: " + selectedUser.tel119() + "€";
    }
}
function ricarica1() {
    ricarica(5);
}
function ricarica2() {
    ricarica(15);
}
function ricarica3() {
    ricarica(25);
}
function ricarica4() {
    ricarica(50);
}
function ricarica(val) {
    if (selectedUser == null) {
        display.innerText = "Seleziona un user";
    }
    else {
        selectedUser.ricarica(val);
        let aggiornaCredito = document.querySelector("#credito" + selectedUser.id);
        aggiornaCredito.innerText = selectedUser.credito + "€";
        display.innerText = "Ricarica effettuata";
    }
}

function infoChiamate() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un user";
    }
    else {
        display.innerText = "N. chiamate: " + selectedUser.getNumeroChiamate();
    }
}
function azzeramentoCalls() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un user";
    }
    else {
        selectedUser.azzeraChiamte();
        let aggiornaChiamate = document.querySelector("#call" + selectedUser.id);
        aggiornaChiamate.innerText = selectedUser.getNumeroChiamate() + "";
        display.innerText = "Chiamate azzerate";
    }
}

function telefonata() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un user";
    }
    else if (selectedUser.credito < 0.25) {
        display.innerText = "Credito insufficiente";
    }
    else {
        startTelefonata();
    }
}
function startTelefonata() {
    
    let creditCounter = selectedUser.credito - 0.22;
    let s = 0, m = 0;
    
    tester.style.display = "none";
    closeCall.style.display = "flex";
    userSelector.disabled = true;
    display.innerText = "squilla......";
   
    interval = setInterval(function () {
        display.innerText = m + ":" + s;
        s++;
        if (s == 60) {
            m++;
            s = 0;
        }
        durata = m + s / 60;
        creditCounter -= 0.004;
        let aggiornaCredito = document.querySelector("#credito" + selectedUser.id + "");
        aggiornaCredito.innerText = creditCounter.toFixed(2) + "€";
       
        if (creditCounter <= 0.01) {
            stopTelefonata();
            display.innerText = "Credito esaurito";
        }
    }, 1000);
}
function stopTelefonata() {

    tester.style.display = "flex";
    closeCall.style.display = "none";
    userSelector.disabled = false;
    display.innerText = "Chiamata terminata";
    
    clearInterval(interval);
    selectedUser.chiamata(durata);
    
    let aggiornaCredito = document.querySelector("#credito" + selectedUser.id);
    aggiornaCredito.innerText = selectedUser.credito + "€";
    let aggiornaChiamate = document.querySelector("#call" + selectedUser.id);
    aggiornaChiamate.innerText = selectedUser.getNumeroChiamate() + "";
}
