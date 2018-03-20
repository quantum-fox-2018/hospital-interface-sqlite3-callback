const Table = require('cli-table');

var table = new Table({
    head: ['Nama', 'Position', 'Username', 'Password']
  , colWidths: [15, 15, 15, 15]
});

class View {
  static setupSuccess(result) {
    console.log(result);
  }

  static registerSuccess(data) {
    table.push([
      data.name,
      data.position,
      data.username,
      data.password
    ]);
    console.log(`Register Success!`);
    console.log(table.toString());
  }

  static loginSuccess(data) {
    console.log(data);
  }
}

module.exports = View;
