var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    items = JSON.parse(this.responseText);
  }
};
xmlhttp.open("GET", "js/items.json", true);
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
var list = new Array("Petty Items", "Minor Magic Items", "Potions", "Starting Arcana");
for (var i=0; i < list.length;++i){
addOption(document.drop_list.Table_list, list[i], list[i]);
 }
}
  
 //Rolling Function

var pick, roll, result



function lookupItem() {

  let pick = document.getElementById("Table_list").value

  switch (pick) {

case "Petty Items":
    roll = Math.floor(Math.random() * items.PettyItems.length)
    result = items.PettyItems[roll];
    break

case "Minor Magic Items":
    roll = Math.floor(Math.random() * items.MinorMagicItems.length)
    result = items.MinorMagicItems[roll];
    break

case "Potions":
    roll = Math.floor(Math.random() * items.Potions.length)
    result = items.Potions[roll];
    document.getElementById("potionEffect").innerHTML = "Effects: " + result.effect;
    document.getElementById("potionProps").innerHTML = "Properties: " + result.properties;
    result = result.name;
    break

case "Starting Arcana":
    roll = Math.floor(Math.random() * items.StartingArcana.length)
    result = items.StartingArcana[roll];
    break

    default :
    alert("Select Table in Dropdown Table")
  }
  
  addTableRow(pick)
  
}

//Incremental Output Table

let tableBody, row, cell1, cell2, cell3;

function addTableRow(pick) {
  tableBody = document.getElementById("outputTable");

  row = tableBody.insertRow(0);

  cell1 = row.insertCell(0)
  cell2 = row.insertCell(1);
  cell3 = row.insertCell(2);


  cell1.innerHTML = roll;
  cell2.innerHTML = pick;
  cell3.innerHTML = result;
}