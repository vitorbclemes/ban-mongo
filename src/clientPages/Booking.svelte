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
  export let user;

  let bookingsPromise = DataStorage.getById('appointments',user._id);
  let eventsPromise = DataStorage.get('events');
  let fieldsPromise = DataStorage.get('fields');
  let blocksPromise = DataStorage.get('blocks');

  let newBooking = {
    _id:makeId(),
    idEvento:null,
    idQuadra:'',
    idCliente:user._id,
    idFuncionario:null,
    data:'',
    horario:6,
    recorrente:false,
    antecedencia:'',
    status:'pending'
  }


  let bookingStart = false;
  $:console.log(newBooking);

  async function handleBooking(){
    newBooking.horario = "0"+newBooking.horario.toString() + ":00";
    let res = await DataStorage.post('appointments',newBooking);
    console.log(res);

    if(res.answer != 'Taken'){
      let bookings = await bookingsPromise;
      bookings = [...bookings,newBooking];
      bookingsPromise = Promise.resolve(bookings);
      bookingStart = false;
      newBooking = {
        _id:makeId(),
        idEvento:null,
        idCliente:user._id,
        idQuadra:'',
        idFuncionario:null,
        data:'2022-06-28',
        horario:6,
        recorrente:false,
        antecedencia:'',
        status:'pending'
    }
    }
    else{
      alert('Esta quadra já está reservada para este dia e horário');
    }
  }


  async function deleteBooking(booking){
    await DataStorage.remove('appointments',booking._id);
    let bookings = await bookingsPromise;
    bookings.splice(bookings.findIndex(b=>b._id == booking._id),1);
    bookingsPromise = Promise.resolve(bookings);
  }

</script>

<div class="booking">
  <h2 class="title" style="text-align: center;">Minhas reservas</h2>
  <table class="table">
    <thead>
      <tr>
        <td>DATA</td>
        <td>HORARIO</td>
        <td>MODALIDADES</td>
        <td>BLOCO</td>
        <td>RECORRÊNCIA</td>
        <td>STATUS</td>
        <td>EXCLUIR</td>
      </tr>
    </thead>
    <tbody>
      {#await bookingsPromise then booking}
        {#each booking as booked}
          <tr>
            <td>{booked.data.replace('T',' ').replace('Z','').substr(0,10)}</td>
            <td>{booked.horario}</td>
            {#await fieldsPromise then fields }
              <td>{fields.find(field=> field._id == booked.idQuadra).modalidade}</td>
            {/await}
            {#await blocksPromise then blocks}
              <td>{blocks.find(async (block)=>await fieldsPromise.then(fields=>fields.find(field=>field._id == booked.idQuadra)).idBloco == block._id).nome}</td>
            {/await}
            <td>{booked.recorrente == false ? 'Não' : 'Sim'}</td>
            <td>{booked.status == 'approved' ? 'Aprovado' : 'Pendente'}</td>
            <td><button on:click={()=>deleteBooking(booked)}>EXCLUIR</button></td>
          </tr>
          {:else}
          <tr>
            <td colspan="8" style="text-align: center;">Nenhuma reserva disponível</td>
          </tr>
          {/each}
        {/await}
    </tbody>
  </table>
  <button class="custom-button" style="margin-left:450px;margin-top:30px" on:click={()=>bookingStart = true}>Nova Reserva</button>
</div>

{#if bookingStart == true}
<div id='login' class="fullscreen-faded" style="z-index:2 ;">
  <div class="dialog-container" style="min-width:1200px; ">
      <div class="dialog-section">
          <div class="left"><span style="color:var(--main-color);font-weight:bold;font-size:18px">RESERVAR</span></div>
          <i class="material-icons right clickable" on:click={()=>bookingStart = false}>highlight_off</i>
        </div>
      <div class="hr"></div>
      <div class="flex-column" style="justify-content: center;align-items:center;padding:60px 0 80px 0">
        <form class="field-form flex-column" on:submit|preventDefault={handleBooking}>
          <label class="finput" style="width:350px">
            <h1>DATA</h1>
            <input type="date" bind:value={newBooking.data} placeholder="000.000.000-00" required />
          </label>
          <label class="finput" style="width:350px">
            <h1>HORÁRIO</h1>
            <input type="number" bind:value={newBooking.horario} placeholder="HH:MM" min=06 max=22 step=1 required />
          </label>
          <label class="finput" style="width:350px">
            <h1>ESPORTE</h1>
            <select required bind:value={newBooking.idQuadra}>
              {#await fieldsPromise then fields }
                <option></option>
                {#each fields as field }
                  <option value={field._id}>{field.modalidade}</option>
                {:else}
                  SEM OPÇÕES NESSE HORARIO
                {/each}
              {/await}
            </select>
          </label>
          <label class="finput" style="width:350px">
            <h1>RECORRENTE</h1>
            <select required bind:value={newBooking.recorrente}>
                  <option value={true}>SIM</option>
                  <option value={false}>NÃO</option>
            </select>
          </label>
          <label class="finput" style="width:350px">
            <h1>EVENTO</h1>
            <select required bind:value={newBooking.idEvento}>
              {#await eventsPromise then events }
              <option value={null}>Nenhum</option>
                {#each events.filter(event=>event.idCliente == user._id) as event }
                  <option value={event._id}>{event.nome}</option>
                {/each}
              {/await}
            </select>
          </label>
          <button class="custom-button" style="margin-top: 30px;" type="submit">RESERVAR</button>
        </form>
      </div>
  </div>
 </div>
{/if}