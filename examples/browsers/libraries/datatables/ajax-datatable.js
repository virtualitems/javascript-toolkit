import $ from 'https://esm.sh/jquery';
import 'https://esm.sh/datatables.net-dt';

document.getElementById('root').innerHTML = `
  <table id="table" width="100%">
    <thead>
      <tr>
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
    <tfoot>
      <tr>
        <th><input type="text" placeholder="Search Email"></th>
        <th><input type="text" placeholder="Search First Name"></th>
        <th><input type="text" placeholder="Search Last Name"></th>
      </tr>
    </tfoot>
  </table>
`;

const table = $('#table').DataTable({
  serverSide: true,
  processing: true,
  paging: true,
  searching: true,
  ordering: true,
  ajax: function (data, callback) {
    const page = Math.floor(data.start / data.length) + 1;
    const perPage = data.length;

    const url = new URL('https://reqres.in/api/users');
    url.searchParams.append('page', page);
    url.searchParams.append('per_page', perPage);

    if (data.search.value) {
      url.searchParams.append('q', data.search.value);
    }

    for (const column of data.columns) {
      if (column.search.value) {
        url.searchParams.append(`column.${column.data}`, column.search.value);
      }
    }

    fetch(url)
      .then(response => response.json())
      .then(json => {
        callback({
          draw: data.draw,
          recordsTotal: json.total,
          recordsFiltered: json.total,
          data: json.data.map(user => [
            user.email,
            user.first_name,
            user.last_name,
          ])
        });
      });
  }
});

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

$('#table tfoot tr th input').each(function (index) {
  $(this).on('keyup change', debounce(function () {
    table
      .column(index)
      .search(this.value)
      .draw();
  }, 300));
});