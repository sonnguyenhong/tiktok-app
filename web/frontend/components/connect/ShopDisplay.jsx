import React from 'react';
import { AlphaCard, Button, Avatar, Text } from "@shopify/polaris";

export default function ShopDisplay(props) {
    return (
        <div style={{ borderWidth: "1px", borderStyle: "solid", borderRadius: "4px", borderColor: "#E7E9EB", marginTop: "8px" }}>
            <AlphaCard padding={"6"} >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ alignItems: "center" }}>
                        <div><Text>{props.advertiser_name}</Text> </div>
                        <div><Text>ID: {props.advertiser_id}</Text> </div>
                    </div>
                    <div>
                        <Button 
                            primary 
                            onClick={() => {
                                
                            }}>
                                Connect
                        </Button> 
                    </div>
                </div>
            </AlphaCard>
        </div>
    );
}