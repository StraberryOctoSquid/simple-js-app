let pokemonRepository=function(){let t=[];function e(){return t}return{getAll:e,loadList:function e(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(e){e.results.forEach(function(e){var n;let o={name:e.name.charAt(0).toUpperCase()+e.name.slice(1),height:e.height,types:e.types,weight:e.weight,detailsUrl:e.url};"object"==typeof(n=o)?t.push(n):console.log("pokemon input is not correct")})}).catch(function(t){console.error(t)})},addListItem:function t(e){let n=document.querySelector(".pokemon-list"),o=document.createElement("li"),i=document.createElement("button");i.setAttribute("data-toggle","modal"),i.setAttribute("data-target","#modal-container"),i.innerText=e.name,i.classList.add("button-class","show-modal","btn","btn-outline-info"),o.classList.add("col"),o.appendChild(i),n.appendChild(o),i.addEventListener("click",()=>{(function t(e){pokemonRepository.loadDetails(e).then(function(){var t;let n,o;t=e,$(".modal-text").html("<p> </p>"),$(".modal-title").html(t.name),t.types[1]?(n=t.types[0].type.name,o=t.types[1].type.name,$(".modal-body").html("<p>Height: "+t.height/10+"m</p><p>Type: "+n+", "+o+"</p><p>Weight: "+t.weight+'lbs.</p><img src="'+t.sprite+'"/><img src="'+t.sprite2+'"/>')):(n=t.types[0].type.name,$(".modal-body").html("<p>Height: "+t.height/10+"m</p><p>Type: "+n+"</p><p>Weight: "+t.weight+'lbs.</p><img src="'+t.sprite+'"/><img src="'+t.sprite2+'"/>')),console.log(e)})})(e)})},loadDetails:function t(e){let n=e.detailsUrl;return fetch(n).then(function(t){return t.json()}).then(function(t){e.height=t.height,e.types=t.types,e.sprite=t.sprites.front_default,e.sprite2=t.sprites.back_default,e.weight=t.weight}).catch(function(t){console.error(t)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t,e){pokemonRepository.addListItem(t,e)})});