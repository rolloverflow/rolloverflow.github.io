var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    deeds = JSON.parse(this.responseText);
  }
};
xmlhttp.open("GET", "js/deeds.json", true);
xmlhttp.send();


//Dropdown Menues

function addOption(selectbox,text,value)
{
  var optn = document.createElement("OPTION");
  optn.text = text;
  optn.value = value;
  selectbox.options.add(optn);
}


// Onload Dropdown Menus Populator and Dynamic Updater

function addOption_list(refresh){
  switch(refresh) {
    case (true):
      var weaponIndex = document.getElementById("Table_list").selectedIndex;

      // Clear Deeds dropdown menus
      document.querySelector('#Deeds_list').querySelectorAll('OPTION:not([value=""])').forEach(elm => elm.parentNode.removeChild(elm));

      // Populate Deeds dropdown based on selected weapon
      var str = deeds.byWeapon[weaponIndex-1]["deeds"];
      var list2 = new Array();
      var list2 = str.split(", ");
      for (var i=0; i < list2.length;++i){
        entry = list2[i];
        addOption(document.drop_deeds.Deeds_list, entry, entry);
      }
      break;
      
    default:
      
      // Define array containing choices for dropdown menus 1, 2, 3, 4 and 5
      var list1 = deeds.byWeapon
      var list2 = deeds.Tables;

      var list3 = new Array("1: One-Man Army", "2: 'It's Fifty-Fifty'", "3: 'I'll Take My Chances...'");
      var list4 = new Array("Apply Advantage", "Apply Disadvantage");
      var list5 = new Array("d4", "d6","d8","d10","d12");
      var list6 = new Array("d3","d4","d5","d6","d7","d10");
    
      for (var i=0; i < list1.length;++i){
          entry = list1[i].weapon
         addOption(document.drop_weapons.Table_list, entry, entry);
        }
      
      for (var i=0; i < list2.length;++i){
          entry = list2[i].name
          addOption(document.drop_deeds.Deeds_list, entry, entry);
        }

      for (var i=0; i < list3.length;++i){
          entry = list3[i]          // Note the difference - list3 is an array, not an object
          addOption(document.drop_modes.Modes_list, entry, entry);
        }
    
       for (var i=0; i < list4.length;++i){
          entry = list4[i]          // Note the difference - list4 is an array, not an object
          addOption(document.drop_adv.Advan_list, entry, entry);
        }

        for (var i=0; i < list5.length;++i){
          entry = list5[i]          // Note the difference - list5 is an array, not an object
          addOption(document.drop_weapon_die.DMG_list, entry, entry);      
        }

       for (var i=0; i < list6.length;++i){
          entry = list6[i]          // Note the difference - list6 is an array, not an object
          addOption(document.drop_deedDie.Deed_Die_list, entry, entry);      
        }
  }
}

// Look up Deeds Rolls

var weaponDMG, deedDie

function lookupDeed() {
  
  // Check if both Mode and Deed table have been selected
  var modePick = document.querySelector("#Modes_list option:checked").index;
  var deedSelect = document.querySelector("#Deeds_list option:checked").value;
  
  
  switch(true){

    // Terminate function if choices in dropdown menues have not been made
    case(modePick == 0 || deedSelect == 0):
    alert("Select a Mode and a Deeds table above.")
    break;

    default:
    
    // Initiate function  
    // Roll the Dice
    
    let deedPick = deeds.Tables.find(el => el.name === deedSelect);
    weaponDMG = document.getElementById("inputWeaponDMG").value;
    deedDie = document.getElementById("inputDeedDie").value;
    let rollDeedDie = Math.floor(Math.random() * deedDie) + 1;
    
    switch (document.querySelector("#Advan_list option:checked").index) {
      case (0):
        var rollDMG = Math.floor(Math.random() * weaponDMG) + 1;
        var resultAppen = "";
        break;
    
      case (1): // Roll with Advantage
      var rollDMG = Math.max(Math.floor(Math.random() * weaponDMG) + 1, Math.floor(Math.random() * weaponDMG) + 1);
      var resultAppen = " (ADV)";
      break;
      
      case (2): // Roll with Disadvantage
      var rollDMG = Math.min(Math.floor(Math.random() * weaponDMG) + 1, Math.floor(Math.random() * weaponDMG) + 1);
      var resultAppen = " (DIS)";
      break;
    }
    
    // Check for Mighty Fumbles or Crits 
    if (rollDMG == 1 && rollDeedDie == 1){
      result = "Mighty Fumble: " + deedPick["rolls"]["Mighty Fumble"]
        alert("Tough Luck - Mighty Fumble!");
    } else if (rollDMG == weaponDMG && rollDeedDie == deedDie) {
      result = "Mighty Critical: " + deedPick["rolls"]["Mighty Critical"];
      rollDMG = rollDMG + Number(document.getElementById("inputWeaponDMGMod").value);
        alert("Nice one - Mighty Critical!");
    } else {
    
    // If none, roll on Deed table with modifiers and given selected mode
    
    rollDMG = rollDMG + Number(document.getElementById("inputWeaponDMGMod").value);
    rollDeedDie = rollDeedDie + Number(document.getElementById("inputDeedDieMod").value);
    
    switch (true){
    
      // Define failure on "Fifty-Fifty" mode
      case (modePick == 2 && rollDMG < Math.floor(weaponDMG * 0.5)):
        result = "Deed Unsuccessful - Attack deals Weapon DMG roll only.";
        alert("Deed Unsuccessful!");
        break;
      
     // Define failure on "I take my chances" mode   
       case (modePick == 3 && rollDMG < Math.floor(weaponDMG * 0.85)):
          result = "Deed Unsuccessful - Attack deals Weapon DMG roll only.";
          alert("Deed Unsuccessful!");
          break;
      
      default:
        switch(true){
        case (3<=rollDeedDie && rollDeedDie <7):
          result = deedPick["rolls"][String(rollDeedDie)];
          break;
          
          case (7<=rollDeedDie):
            result = deedPick["rolls"]["7"];
            break;
            
            default:
              result = "Deed Unsuccessful - Attack deals Weapon DMG roll only.";
              alert("Deed Unsuccessful!");
            }
          }
        }
    
    
    
    // Output results
    document.getElementById("description").innerHTML = deedPick["description"]
    
    addTableRow(result, rollDMG + resultAppen, rollDeedDie)
    }
}
    
    
//Incremental Output Table

let tableBody, row, cell1, cell2, cell3;

function addTableRow(obj, val1, val2) {
  tableBody = document.getElementById("outputTable");

  row = tableBody.insertRow(0);

  cell1 = row.insertCell(0)
  cell2 = row.insertCell(1);
  cell3 = row.insertCell(2);


  cell1.innerHTML = val1;
  cell2.innerHTML = val2;
  cell3.innerHTML = obj;
}


// Reset Button

function reset() {
  document.getElementById("outputTable").innerHTML = "";
  document.getElementById("description").innerHTML = "";
}