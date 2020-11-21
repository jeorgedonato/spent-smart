import React from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

function LineChart(props) {
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc"}
        }}
        data={[
          { x: "Income", y: props.income },
          { x: "Expenses", y: props.expenses },
          { x: "Savings", y: props.savings }
        ]}
      />
    </VictoryChart> 
  )
}

export default LineChart;