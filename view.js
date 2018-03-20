var Table = require('cli-table');

var table = new Table();

class View {
  static view(str) {
    console.log(str);
  }

  static viewTable(data) {
    let judul = Object.keys(data[0]);
    table.options.head = judul;
    for(let i in data) {
      let tmp = [];
      for(let j = 0; j < judul.length; j++) {
        tmp.push(data[i][table.options.head[j]]);
      }
      table.push(tmp);
    }
    console.log(table.toString());
  }
}

module.exports = {
  View
}
