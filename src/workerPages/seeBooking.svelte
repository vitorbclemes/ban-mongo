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

  let bookingsPromise = DataStorage.get('appointments');
  let fieldsPromise = DataStorage.get('fields');
  let blocksPromise = DataStorage.get('blocks');

  export let user;

  async function handleApproved(booking){
    let updateBooking = booking;
    updateBooking.status == 'pending' ? updateBooking.status = 'approved' : updateBooking.status = 'pending';
    updateBooking.idFuncionario = user._id;
    updateBooking._id = booking._id;

    await DataStorage.put('appointments',booking._id,updateBooking);
    let bookings = await bookingsPromise;
    bookingsPromise = Promise.resolve(bookings);
  }

</script>

<div class="booking flex-column">
  <h2 class="title" style="text-align: center;">Todas as reservas</h2>
  <table class="table">
    <thead>
      <tr>
        <td>DATA</td>
        <td>HORARIO</td>
        <td>MODALIDADES</td>
        <td>BLOCO</td>
        <td>RECORRÊNCIA</td>
        <td>STATUS</td>
        <td>APROVAÇÃO</td>
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
            <td><button on:click={()=>handleApproved(booked)}>{booked.status == 'approved' ? 'Desaprovar' : 'Aprovar'}</button></td>
          </tr>
          {:else}
          <tr>
            <td colspan="7" style="text-align: center;">Nenhuma reserva disponível</td>
          </tr>
          {/each}
        {/await}
    </tbody>
  </table>
  <!-- <button class="custom-button" style="margin-left:450px;margin-top:30px">Nova Reserva</button> -->
</div>