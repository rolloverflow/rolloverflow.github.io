var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    deeds = JSON.parse(this.responseText);
  }
};
xmlhttp.open("GET", "js/deeds.json", true);
xmlhttp.send();

//Dropdown Menu


function addOption(selectbox,text,value )
{
  var optn = document.createElement("OPTION");
  optn.text = text;
  optn.value = value;
  selectbox.options.add(optn);
}

function addOption_list(){

    // Define array containing choices for dropdown menus 1 and 2
    var list1 = deeds.byWeapon
    var list2 = deeds.Tables

    for (var i=0; i < list1.length;++i){
        entry = list1[i].weapon
       addOption(document.drop_weapons.Table_list, entry, entry);
    }
    
    for (var i=0; i < list2.length;++i){
        entry = list2[i].name
       addOption(document.drop_deeds.Deeds_list, entry, entry);
    }
}

// Look up Deeds Rolls

var weaponDMG, deedDie

function lookupDeed() {

  let deedPick = deeds.Tables[document.getElementById("Deeds_list").selectedIndex-1];
  weaponDMG = document.getElementById("inputWeaponDMG").value;
  deedDie = document.getElementById("inputDeedDie").value
  let rollDMG = Math.floor(Math.random() * weaponDMG) + 1;
  let rollDeedDie = Math.floor(Math.random() * deedDie) + 1;

  // Check for Mighty Fumbles or Crits 
  if (rollDMG == 1 && rollDeedDie == 1){
    result = "Mighty Fumble: " + deedPick["rolls"]["Mighty Fumble"]
      alert("Tough Luck - Mighty Fumble!");
  } else if (rollDMG == weaponDMG && rollDeedDie == deedDie) {
    result = "Mighty Critical: " + deedPick["rolls"]["Mighty Critical"];
    rollDMG = rollDMG + Number(document.getElementById("inputWeaponDMGMod").value);
      alert("Nice one - Mighty Critical!");
  } else {
  // If none, roll on Deed table with modifiers

  rollDMG = rollDMG + Number(document.getElementById("inputWeaponDMGMod").value);
  rollDeedDie = rollDeedDie + Number(document.getElementById("inputDeedDieMod").value);

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

  document.getElementById("description").innerHTML = deedPick["description"]

  addTableRow(result, rollDMG, rollDeedDie)
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


// Look up Suggested Deeds by Weapon

function lookupWeapon() {
document.getElementById("deedsByWeapon").innerHTML = "Suggestions: " + deeds.byWeapon[document.getElementById("Table_list").selectedIndex-1]["deeds"];
}


