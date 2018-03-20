var Table = require('cli-table');

class View{
  static display(info){
    console.log(info);
  }

  static displayTable(people){
    let table = new Table();
    let header = Object.keys(people[0])
    table.options.head = header
    for (var i = 0; i < people.length; i++) {
      let tmp = []
      for (var j = 0; j < header.length; j++) {
        tmp.push(people[i][header[j]])
      }
      table.push(tmp)
    }
    console.log(table.toString());
  }
}

module.exports = View
