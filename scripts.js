document.getElementById('fetch-btn').addEventListener('click', async function(event){
    event.preventDefault();

    const loader=document.getElementById('loaderImg');
    loader.style.display='block';

    const scroller= document.getElementById('scroller');
    scroller.style.display='none';

    const type=document.getElementById('pokemon-type').value.toLowerCase();
    const limit=parseInt(document.getElementById('pokemon-number').value);
    const cardWrapper=document.getElementById('card-wrapper');

    cardWrapper.innerHTML='';

    try{
        const typeResponse= await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        if(!typeResponse.ok) throw new Error('type not found');
        const typeData= await typeResponse.json();

        const pokemonList=typeData.pokemon.slice(0,limit);
        const loadCards=async ()=>{
            for(let i=0;i<pokemonList.length;i++){
                const pokemonName=pokemonList[i].pokemon.name;

                const pokemonResponse= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                const pokemonData= await pokemonResponse.json();

                const hp=pokemonData.stats.find(stat => stat.stat.name==='hp').base_stat;
                const attack=pokemonData.stats.find(stat => stat.stat.name==='attack').base_stat;
                const types=pokemonData.types.map(typeInfo=>typeInfo.type.name).join(', ');
                const imageURL=pokemonData.sprites.front_default;

                const card=document.createElement("div");
                card.classList.add('card');
                card.innerHTML=`
                <img id="poke-img" src="${imageURL}">
                <h2 class="poke-name">${pokemonName}</h2>
                <h3 class="poke-type">${types}</h3>
                <div class="poke-info">
                    <div class="hp"> HP: ${hp}</div>
                    <div class="attack"> Attack: ${attack}</div>
                `;
                cardWrapper.appendChild(card);
        }
    }

    setTimeout(async()=>{
        await loadCards();
        loader.style.display='none';
        scroller.style.display='block';
    },2500);
    }
    catch(error){
            console.error('error while fetching pokemon:', error);
            cardWrapper.innerHTML = '<p>Failed to fetch Pokémon. Please check the type or number and try again.</p>';
            loader.style.display='none';
    }
    finally{
        loader.style.display-'none';
    }
});

function go_github(){
    window.location.href="https://github.com/hannah-maria/pokemon-card";
}
