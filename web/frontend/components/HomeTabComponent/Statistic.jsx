import { useState } from "react";
import { Card, TextContainer, Text, LegacyCard } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export function Statistic(props) {

  if(props.isIncrease) {
    var StatisticText = <div style={{ paddingBottom: 16, paddingTop: 8, fontSize: 16, paddingLeft: 8, paddingRight: 8,
                                      display: 'flex', justifyContent: 'space-between' }}>
      <p>{props.name}</p>
      <p style={{ color: 'green' }}>+{props.percent}%</p>
    </div>
  } else {
    var StatisticText = <div style={{ paddingBottom: 16, paddingTop: 8, fontSize: 16, paddingLeft: 8, paddingRight: 8,
                                      display: 'flex', justifyContent: 'space-between' }}>
      <p>{props.name}</p>
      <p style={{ color: 'red' }}>-{props.percent}%</p>
      </div>
  }

  return (
    <Card>
      <Text as="h2" variant="bodyMd" alignment="center">
        {StatisticText}
        <p style={{ paddingBottom: 16, fontSize: 20 }}>{props.value}</p>
      </Text>
    </Card>
  );
}
