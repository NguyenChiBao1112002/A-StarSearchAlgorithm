import * as data_structure from './data_structure.js';
import * as constant from './constants.js';
import * as helper from './helper_functions.js';

export default class Search {
  constructor(graph, mode) {
    console.log('search created ' + mode);
    this.mode = mode;
    if (mode == 'A*') {
      this.data = {
        graph: graph,
        total_searched: 0,
        total_discovered: 1,
        path_length: 0,
      };
      this.search_algo = new A_Star(this.data);
      console.log('A* Search Created');
    }
    console.log(this.search_algo);
  }

  step() {
    return this.search_algo.step();
  }
}

class A_Star {
  constructor(data) {
    this.data = data;
    this.graph = data.graph;
    this.frontier = new data_structure.MinHeap();
    this.frontier.insert(this.graph.source);
    this.heuristic = helper.manhattanDistance;
    this.graph.initializeA_StarCellCost();
    this.graph.source.g_val = 0;
    this.graph.source.cost = this.heuristic(
      this.graph.source,
      this.graph.target
    );
    this.current_cell = this.graph.source;
    this.discovered_list = [];
    this.explored_list = [];
  }


  step() {
    let lastLength = this.discovered_list.length;

    if (!this.graph.target.found && !this.frontier.isEmpty()) {
      this.current_cell = this.frontier.extractMin();
      if (
        !this.explored_list.includes(this.current_cell) &&
        this.current_cell !== this.graph.source &&
        this.current_cell !== this.graph.target
      ) {
        this.explored_list.push(this.current_cell);
      }

      if (this.current_cell === this.graph.target) {
        this.graph.target.found = true;
        this.frontier.empty();
      } else {
        const cells_around = helper.getCellsAround(
          this.graph,
          this.current_cell
        );
        cells_around.forEach((neighbor) => {
          if (
            neighbor.parent !== this.current_cell &&
            this.current_cell.parent !== neighbor &&
            neighbor.color !== constant.WALL_COLOR
          ) {
            if (
              !this.discovered_list.includes(neighbor) &&
              neighbor !== this.graph.target
            ) {
              this.discovered_list.push(neighbor);

            }

            let tentative_g_val = this.current_cell.g_val + 1;
            if (tentative_g_val < neighbor.g_val) {
              neighbor.g_val = tentative_g_val;
              neighbor.cost =
                neighbor.g_val + this.heuristic(neighbor, this.graph.target);
              neighbor.parent = this.current_cell;
              if (!this.frontier.includes(neighbor)) {
                this.frontier.insert(neighbor);
              }
            }
          }
        });
      }


      for (let i = 0; i < this.discovered_list.length; i++) {
        let isExist = false;
        for (let j = 0; j < this.explored_list.length; j++) {
          if (this.discovered_list[i] === this.explored_list[j]) {
            isExist = true;
            break;
          }
        }
        if (!isExist) {
          console.log(this.discovered_list[i].row + "" + this.discovered_list[i].col);
        }
      }

      this.explored_list.forEach((cell) => {
        console.log(cell.row + "" + cell.col);
      });




      this.colorPath();
    } else {
      this.data.total_discovered = this.discovered_list.length + 2;
      this.data.total_searched = this.explored_list.length + 2;
      this.graph.target.div.innerText = this.data.path_length;
      return true;
    }
    return false;
  }

  colorPath() {
    this.data.path_length = 1;
    this.discovered_list.forEach((cell) => {
      if (cell !== this.graph.source && cell !== this.graph.target) {
        cell.update(constant.DISCOVERED_COLOR);
      }
    });


    let curr_cell = this.current_cell;
    while (curr_cell !== this.graph.source) {
      if (curr_cell !== this.graph.target) {
        curr_cell.update(constant.PATH_COLOR);
        this.data.path_length++;
      }
      curr_cell = curr_cell.parent;
    }

    this.explored_list.forEach((cell) => {
      if (cell.color !== constant.PATH_COLOR) {
        cell.update(constant.EXPLORED_COLOR);
        cell.div.innerText = '';
      }
    });

    curr_cell = this.current_cell;
    let count = this.graph.target.found ? 0 : 1;
    while (curr_cell !== this.graph.source) {
      curr_cell.div.innerText = this.data.path_length - count;
      count++;
      curr_cell = curr_cell.parent;
    }

  }
}

export class Cell {
  constructor(div, row, col) {
    this.row = row;
    this.col = col;
    this.color = constant.UNDISCOVERED_COLOR;
    this.wall = false;
    this.div = div;
    this.cost = 0;
  }

  update(color) {
    this.color = color;
    this.div.style.backgroundColor = this.color;
    if (this.color === constant.UNDISCOVERED_COLOR) {
      this.div.innerText = '';
    }
  }

  clear() {
    this.color = constant.UNDISCOVERED_COLOR;
    this.div.style.backgroundColor = this.color;
    this.div.innerText = '';
  }
}

Cell.prototype.toString = function () {
  let str = '';
  str += 'Row: ' + this.row + '\nColumn: ' + this.col + '\n';
  str += 'Color: ' + this.color + '\n';
  str += 'Cost: ' + this.cost + '\n';
  if (this.parent) {
    str += 'Parent：' + this.parent.toString();
  }
  return str;
};

Cell.prototype.valueOf = function () {
  return this.cost;
};
