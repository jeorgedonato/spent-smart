import React from "react";
import { VictoryChart, VictoryBar, VictoryTheme } from "victory";

function BarChart() {
  
  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 15 }}>
      <VictoryBar
        barRatio={0.8}
        style={{
          data: { fill: "#c43a31" }
        }}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 }
        ]}
      />
    </VictoryChart>
  )
}

export default BarChart;