import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { VictoryChart, VictoryBar, VictoryTheme } from "victory";

function BarChart(props) {
  
  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 15 }}>
      <VictoryBar
        barRatio={0.8}
        style={{
          data: { fill: "#c43a31" }
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

export default BarChart;