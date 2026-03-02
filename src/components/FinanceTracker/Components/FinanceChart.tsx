import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const FinanceChart = () => {
  return (
    <LineChart
      data={{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            data: [2000, 4500, 3000, 8000, 6000, 10000],
          },
        ],
      }}
      width={screenWidth - 30}
      height={220}
      yAxisSuffix="₹"
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
        labelColor: () => '#999',
        propsForDots: {
          r: '5',
          strokeWidth: '2',
          stroke: '#6C63FF',
        },
      }}
      bezier
      style={{
        marginVertical: 20,
        borderRadius: 16,
      }}
    />
  );
};

export default FinanceChart;
