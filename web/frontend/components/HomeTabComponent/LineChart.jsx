import { useEffect, useRef, useState } from "react";
import { Card, TextContainer, Text } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { Chart } from 'chart.js/auto';

export function LineChart() {

  useEffect(() => {
    (async function() {
      const data = [
        { month: 'Jan', count: 1068 },
        { month: 'Feb', count: 1859 },
        { month: 'Mar', count: 1525 },
        { month: 'Apr', count: 1632 },
        { month: 'May', count: 1666 },
        { month: 'Jun', count: 1589 },
        { month: 'Jul', count: 1587 },
        { month: 'Aug', count: 1752 },
        { month: 'Sep', count: 1686 },
        { month: 'Oct', count: 1668 },
        { month: 'Nov', count: 1744 },
        { month: 'Dec', count: 1800 },
      ];
    
      new Chart(
        document.getElementById('lineChart'),
        {
          type: 'line',
          data: {
            labels: data.map(row => row.month),
            datasets: [
              {
                label: 'Acquisitions by month',
                data: data.map(row => row.count)
              }
            ]
          }
        }
      );
    })();
  }, []);

  return (
    <>
      <canvas id="lineChart" width={'100%'}/>
    </>
  );
}
