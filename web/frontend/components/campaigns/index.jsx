import { Badge } from "@shopify/polaris";
import React from "react";

function CampaignsStatus(props) {
  const { param } = props;
  return (
    <Badge
      //status="success"
      status={param === 1 ? "success" : ""}
      progress="complete"
      statusAndProgressLabelOverride={
        param === 1 ? "Status: On. Your campaing is On." : ""
      }
    >
      {param === 1 ? "On" : "Off"}
    </Badge>
  );
}

export default CampaignsStatus;
