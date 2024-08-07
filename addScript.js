let tbody = document.getElementById('tbody');
let addBtn = document.getElementById('.addBtn');
let form = document.getElementById('.form-wrapper');
let saveBtn = document.getElementById('.save');
let cancelBtn =  document.getElementById('.cancel');
let ownernameEle =  document.getElementById('#PokemonOwnerName');
let nameEle =  document.getElementById('#PokemonName');
let abilityEle =  document.getElementById('#PokemonAbility');
let positionXEle =  document.getElementById('#InitialPositionX');
let positionYEle =  document.getElementById('#InitialPositionY');
let speedEle =  document.getElementById('#Speed');
let directionEle =  document.getElementById('#Direction');

let httpm =null;

let url ='https://pokeapi.co/api/v2/pokemon-species/1/';

let pokemon=[];

let id=null;

let data={};

//ADDING INFORMATION OF POKEMON
addBtn.onclick = function ()
{
    httpm = "POST";
    clearForm();
    form.classList.add('active');
}
  cancelBtn.onclick = function(){
    form.classList.remove('active')
  }
    saveBtn.onclick= function()
    {
    data.PokemonOwnerName= ownernameEle.value;
    data.PokemonName= nameEle.value;
    data.PokemonAbility = abilityEle.value;
    data.InitialPositionX= positionXEle.value;
    data.InitialPositionY= positionYEle.value;
    data.Speed= speedEle.value;
    data.Direction= directionEle.value;
    if(httpm=="PUT")
    {
        data.id= id
    }
    
    fetch(url,
        { 
            method: httpm, 
            body: JSON.stringify(data), 
            headers: { "Content-type": "application/json" } 
        })
    .then(()=>{
        clearForm();
        form.classList.remove('active');
        getpokemon();
    })
}
function clearForm()
{
        ownernameEle.value =null;
        nameEle.value =null;
        abilityEle.value=null;
        positionXEle.value= null;
        positionYEle.value =null;
        speedEle.value =null;
        directionEle.value =null;
    }
    
function getpokemon(){
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        pokemon= data;
        updateTable();

    })

    
}

getpokemon();

function updateTable(){
    let data='';

    if(pokemon.length>0){
        for(i= 0;i<pokemon.length;i++){

            data+=  `<tr id="${pokemon[i]['Pokemon OwnerName']}">
                        <td>${pokemon[i]['Pokemon Name']}</td>
                        <td>${pokemon[i]['Pokemon Ability']}</td>
                        <td>${pokemon[i]['Intial Position X']}</td>
                        <td>${pokemon[i]['Intial Position Y']}</td>
                        <td>${pokemon[i]['Speed']}</td>
                        <td>${pokemon[i]['Direction']}</td>
                        <td>
                       td><button onclick="editpokemon(event)">Edit</button></td>
                        <td><button onclick="deletepokemon(event)">Delete All</button></td> 
                        </td>   
                     </tr>`
        }

     tbody.innerHTML=data;
    }

}

function editpokemon(e){
    form.classList.add('active');
   httpm="PUT"
   id= e.target.parentElement.parentElement.id;
  let selectedpokemon= pokemon.filter((p)=>{return p['id'] ==id})[0];
 
  ownernameEle.value= selectedpokemon.PokemonOwnerName;
  nameEle.value = selectedpokemon.PokemonName;
  abilityEle.value = selectedpokemon.PokemonAbility;
  positionXEle.value = selectedpokemon.InitialPositionX;
  positionYEle.value = selectedpokemon.InitialPositionY; 
  speedEle.value = selectedpokemon.Speed;
  directionEle.value = selectedpokemon.Direction;
}

function deletepokemon(e){
    id= e.target.parentElement.parentElement.id;
     fetch(url+"/"+id, {method:'DELETE'})
     .then(
        ()=>{
            getpokemon()
        }
     )

}
