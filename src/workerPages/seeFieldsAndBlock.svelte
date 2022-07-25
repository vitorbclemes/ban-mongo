<style>
  .booking{
    position:relative;
    margin-top: -50px;
  }
  .title{
    padding-bottom: 50px;
  }
</style>
<script>
  import DataStorage from '../../utils/DataStorage.js';
  import makeId from '../../utils/makeId.js';

  let fieldsPromise = DataStorage.get('fields');
  let blockPromise = DataStorage.get('blocks');

  let fieldStart = false;

  let sportVariable = '';
  let newField = {
    _id:makeId(),
    modalidade:[],
    idBloco:''
  };

  $:console.log(newField);

  async function handleSport(){
    await DataStorage.post('fields',newField);
    let fields = await fieldsPromise;
    fields = [...fields,newField];
    fieldsPromise = Promise.resolve(fields);

    newField = {
      _id:makeId(),
      modalidade:[],
      idBloco:''
    }
    fieldStart = false;
  }

  async function removeField(field){
    await DataStorage.remove('fields',field._id);
    let fields = await fieldsPromise;
    fields.splice(fields.findIndex(b=>b._id == field._id),1);
    fieldsPromise = Promise.resolve(fields);
  }

</script>

<div class="booking flex-column">
  <h2 class="title" style="text-align: center;">Todos as Quadras</h2>
  <table class="table">
    <thead>
      <tr>
        <td>MODALIDADES</td>
        <td>BLOCO</td>
        <td>REMOVER</td>
      </tr>
    </thead>
    <tbody>
      {#await fieldsPromise then fields}
        {#each fields as field}
          <tr>
            <td>{field.modalidade}</td>
            {#await blockPromise then blocks}
              <td>{blocks.find(block=>block._id == field.idBloco).nome}</td>
            {/await}
            <td><button on:click={()=>removeField(field)}>REMOVER</button></td>
          </tr>
          {:else}
          <tr>
            <td colspan="3" style="text-align: center;">Nenhuma quadra disponível</td>
          </tr>
          {/each}
        {/await}
    </tbody>
  </table>
  <button class="custom-button" style="margin-top:30px" on:click={()=>fieldStart = true}>Nova Quadra</button>
</div>

{#if fieldStart == true}
<div id='login' class="fullscreen-faded" style="z-index:2 ;">
  <div class="dialog-container" style="min-width:1200px; ">
      <div class="dialog-section">
          <div class="left"><span style="color:var(--main-color);font-weight:bold;font-size:18px">RESERVAR</span></div>
          <i class="material-icons right clickable" on:click={()=>fieldStart = false}>highlight_off</i>
        </div>
      <div class="hr"></div>
      <div class="flex-column" style="justify-content: center;align-items:center;padding:60px 0 80px 0">
        <form class="field-form flex-column" on:submit|preventDefault={handleSport}>
          <label class="finput" style="width:350px;">
            <h1>MODALIDADES</h1>
            <input type="text" bind:value={sportVariable} placeholder="FUTSAL" />
            <button on:click={()=>{newField.modalidade.push(sportVariable),newField.modalidade = newField.modalidade,sportVariable = ''}}>Adicionar</button>
          </label>
          <label class="finput" style="width:350px">
            <h1>BLOCO</h1>
            <select required bind:value={newField.idBloco}>
              {#await blockPromise then blocks }
                <option></option>
                {#each blocks as block }
                  <option value={block._id}>{block.nome}</option>
                {/each}
              {/await}
            </select>
          </label>
          <button class="custom-button" type="submit">SALVAR</button>
        </form>
      </div>
  </div>
</div>
{/if}