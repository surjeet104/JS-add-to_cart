import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSettings = {
    databaseURL: "https://realtime-database-785c2-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputField = document.querySelector("#input-field");
const addButton = document.querySelector("#add-button");
const shoppingList = document.querySelector("#shopping-list");

addButton.addEventListener("click", function () {
    let inputValue = inputField.value;
    push(shoppingListInDB, inputValue);
    clearInputField();
});

onValue(shoppingListInDB, function (snapshot) {
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val());
        clearShoppingList();
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];
            appendItemsToShoppingList(currentItem);
        }
    }else{
        shoppingList.innerHTML=`No items here... yet`
    }
});

function clearShoppingList() {
    shoppingList.innerHTML = "";
}

function clearInputField() {
    inputField.value = "";
}

function appendItemsToShoppingList(item) {
    let itemID = item[0];
    let itemValue = item[1];
    let li = document.createElement("li");
    li.textContent = itemValue;
    li.addEventListener("click", function () {
        let locationOfItemInDB = ref(database, `shoppingList/${itemID}`);
        remove(locationOfItemInDB);
    })
    shoppingList.append(li);
}