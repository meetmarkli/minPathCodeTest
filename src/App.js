import "./App.css";
import React, { useState } from "react";
import { DijkstraCalculator } from "dijkstra-calculator";

function App() {
  // The function for generate a random matix
  const randArray = (row, col, min, max) => {
    return Array.from({ length: row }, (v) =>
      Array.from(
        { length: col },
        (v) => Math.floor(Math.random() * (max - min)) + min
      )
    );
  };

  const [grid, setGrid] = useState(randArray(6, 6, 0, 0));
  const [route, setRoute] = useState([]);

  const graph = new DijkstraCalculator();
  const m = grid.length;
  const n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      graph.addVertex(`${i}${j}`);
    }
  }

  // Add edge to the 4 vertices of the matrix
  graph.addEdge("00", "01", grid[0][0]);
  graph.addEdge("00", "10", grid[0][0]);
  graph.addEdge("50", "40", grid[5][0]);
  graph.addEdge("50", "51", grid[5][0]);
  graph.addEdge("05", "04", grid[0][5]);
  graph.addEdge("05", "15", grid[0][5]);
  graph.addEdge("55", "45", grid[5][5]);
  graph.addEdge("55", "54", grid[5][5]);

 // Add edges to the two vertical sides of the matrix
  for (let i = 1; i < m - 1; i++) {
    graph.addEdge(`${i}0`, `${i}1`, grid[i][0]);
    graph.addEdge(`${i}0`, `${i + 1}0`, grid[i][0]);
    graph.addEdge(`${i}0`, `${i - 1}0`, grid[i][0]);
    graph.addEdge(`${i}5`, `${i}4`, grid[i][5]);
    graph.addEdge(`${i}5`, `${i + 1}5`, grid[i][5]);
    graph.addEdge(`${i}5`, `${i - 1}5`, grid[i][5]);
  }
 // Add edges to the two horizontal sides of the matrix
  for (let j = 1; j < n - 1; j++) {
    graph.addEdge(`0${j}`, `1${j}`, grid[0][j]);
    graph.addEdge(`0${j}`, `0${j + 1}`, grid[0][j]);
    graph.addEdge(`0${j}`, `0${j - 1}`, grid[0][j]);
    graph.addEdge(`5${j}`, `4${j}`, grid[5][j]);
    graph.addEdge(`5${j}`, `5${j + 1}`, grid[5][j]);
    graph.addEdge(`5${j}`, `5${j - 1}`, grid[5][j]);
  }
  // Add edges to the remaining points in the matrix
  for (let i = 1; i < m - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      graph.addEdge(`${i}${j}`, `${i + 1}${j}`, grid[i][j]);
      graph.addEdge(`${i}${j}`, `${i - 1}${j}`, grid[i][j]);
      graph.addEdge(`${i}${j}`, `${i}${j + 1}`, grid[i][j]);
      graph.addEdge(`${i}${j}`, `${i}${j - 1}`, grid[i][j]);
    }
  }
  const path = graph.calculateShortestPath("00", "55");
  const bestPath = () => {
    const route = [];
    for (let i = 1; i < path.length; i++) {
      path[i][0] === path[i - 1][0]
        ? path[i][1] / 1 - path[i - 1][1] / 1 > 0
          ? route.push("R→")
          : route.push("L←")
        : path[i][0] / 1 - path[i - 1][0] / 1 > 0
        ? route.push("D↓")
        : route.push("U↑");
    }
    return route.join(",");
  };

  const minPathSum = (path) => {
    const pathNode = path.map(([x, y]) => grid[x][y]);
    return pathNode.reduce((a, b) => a + b, 0);
  };

  const handleClick = () => {
    setGrid(randArray(6, 6, 1, 1000));
    setRoute(bestPath());
  };

  const minPath = minPathSum(path);
  

  return (
    <div className="root">
      <h1>Zimu Li CodeTest</h1>
      <div className="Matrix">
        {grid.map((items) =>
          items.map((item) => <div key={item.index}>{item.toString(16)}</div>)
        )}
      </div>
      <div className='button'>
        <button onClick={handleClick}>Generate Matrix</button>
      </div>
      <h3>The MinPathSum is {minPath}</h3>
      <h3>Path with lowest cost: {route}</h3>
    </div>
  );
}

export default App;
