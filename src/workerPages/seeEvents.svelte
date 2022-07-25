<style>
  .events{
    position:relative;
    margin-top: -50px;
  }
  .title{
    padding-bottom: 50px;
  }
</style>
<script>
  import DataStorage from '../../utils/DataStorage.js';

  let eventsPromise = DataStorage.get('events');
  let bookingsPromise = DataStorage.get('appointments');
</script>

<div class="events">
  <h2 class="title" style="text-align: center;">Todos os Eventos</h2>
  <table class="table">
    <thead>
      <tr>
        <td>DATA(S)</td>
        <td>EVENTO</td>
      </tr>
    </thead>
    <tbody>
      {#await eventsPromise then events}
        {#each events as event}
          <tr>
            {#await bookingsPromise then bookings }
              <td>{bookings.filter(book=>book.idEvento == event._id).map(book=>book.data.replace('T',' ').replace('Z','').substr(0,10)).filter((value,index,self)=>self.indexOf(value)===index).length > 0 ? bookings.filter(book=>book.idEvento == event._id).map(book=>book.data.replace('T',' ').replace('Z','').substr(0,10)).filter((value,index,self)=>self.indexOf(value)===index) : 'Nao marcado'}</td>
            {/await}
            <td>{event.nome}</td>
          </tr>
          {:else}
            <tr>
              <td colspan="2" style="text-align: center;">Nenhuma evento disponível</td>
            </tr>
          {/each}
        {/await}
    </tbody>
  </table>
</div>