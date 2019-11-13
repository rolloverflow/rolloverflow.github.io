var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    char = JSON.parse(this.responseText);
  }
};
xmlhttp.open("GET", "js/char.json", true);
xmlhttp.send();

//Dropdown Menu

function addOption(selectbox,text,value ){
  var optn = document.createElement("OPTION");
  optn.text = text;
  optn.value = value;
  selectbox.options.add(optn);
}

function addOption_list(){
  var list = new Array("Mutations");
  for (var i=0; i < list.length;++i){
    addOption(document.drop_list.Table_list, list[i], list[i]);
  }
}
  
 //Rolling Function

var pick, roll, result

function lookupItem() {
  // Check if any table has been selected.
  if(document.querySelector("#Table_list option:checked").index == 0){
    // Terminate function if a choice in the dropdown menu has not been made.
    alert("Select Table in Dropdown Table");
  
  } else {
    // Run the lookup 
    pick = document.getElementById("Table_list").value;
    
    switch (pick) {

      case "Mutations":
      roll = Math.floor(Math.random() * char.Mutations.length)
      result = char.Mutations[roll];
      document.getElementById("name").innerHTML = "Name: " + result.name;
      document.getElementById("effect").innerHTML = "Effect: " + result.effect;
      break;
  
      default :
      alert("Table not recognised. Check reference variable.");
    }
    addTableRow();
  }
  }
    

//Incremental Output Table

let tableBody, row, cell1, cell2, cell3, cell4;

function addTableRow() {
  tableBody = document.getElementById("outputTable");

  row = tableBody.insertRow(0);

  cell1 = row.insertCell(0);
  cell2 = row.insertCell(1);
  cell3 = row.insertCell(2);
  cell4 = row.insertCell(3);

  cell1.innerHTML = roll;
  cell2.innerHTML = pick;
  cell3.innerHTML = result.name;
  cell4.innerHTML = result.effect;
}

// Reset Button

function reset() {
  document.getElementById("outputTable").innerHTML = "";
  document.getElementById("name").innerHTML = "";
  document.getElementById("effect").innerHTML = "";
}


