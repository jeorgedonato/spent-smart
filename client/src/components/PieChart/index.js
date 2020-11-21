import React from "react";
import { VictoryPie } from "victory";

function PieChart(props) {
  return (
    <VictoryPie 
      data={[
        { x: "Expenses", y: props.expenses },
        { x: "Savings", y: props.savings },
      ]}
    />
  )
}

export default PieChart;