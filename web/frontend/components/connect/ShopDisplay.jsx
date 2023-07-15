import React from 'react';
import { AlphaCard, Button, Avatar, Text } from "@shopify/polaris";

export default function ShopDisplay(props) {
    const placeShop = {

    }
    return (
        <div style={{ borderWidth: "1px", borderStyle: "solid", borderRadius: "4px", borderColor: "#E7E9EB" }}>
            <AlphaCard padding={"6"} >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ alignItems: "center" }}>
                        <div><Text>thanh-lam-development.myshopify.com Shopify0506</Text> </div>
                        <div><Text>ID: 7231079433715630082</Text> </div>
                    </div>
                    <div><Button primary >Connect</Button> </div>
                </div>
            </AlphaCard>
        </div>
    );
}