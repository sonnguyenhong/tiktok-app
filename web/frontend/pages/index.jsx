import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
  LegacyCard,
  AlphaCard,
  Avatar,
  Button,
  HorizontalStack
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { InlineLayout, View } from "@shopify/checkout-ui-extensions-react";
import { useTranslation, Trans } from "react-i18next";
import ShopDisplay from "../components/connect/ShopDisplay";
import UserPixel from "../components/connect/UserPixel";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";
import { useEffect, useState } from "react";
import { useAppQuery } from "../hooks";

export default function HomePage() {
  const { t } = useTranslation();

  const [tiktokSession, setTiktokSession] = useState(null);

  const {
    data,
    isLoading,
    isRefetching,
  } = useAppQuery({
    url: '/api/check-tiktok-auth',
    reactQueryOptions: {
      /* Disable refetching because the QRCodeForm component ignores changes to its props */
      refetchOnReconnect: false,
    }
  })

  useEffect(async () => {
    console.log(data);
    const advertiser_ids = data.advertiser_ids.split(',');
    setTiktokSession({
      ...data,
      advertiser_ids: advertiser_ids
    })
  }, [data])

  if (tiktokSession) {
    return (
      <Page narrowWidth>
        {tiktokSession.advertiser_ids.map(i => <p>{i}</p>)}
      </Page>
    )
  } else {

    return (
      <Page narrowWidth>
        <TitleBar
          title={t("HomePage.title")}
          primaryAction={{
            content: t("HomeTab.primaryAction"),
            onAction: () => {
              // window.open("https://ads.tiktok.com/marketing_api/auth?app_id=7246300422938296321&state=your_custom_params&redirect_uri=https%3A%2F%2Fnative-fairy-posing-quantity.trycloudflare.com%2Fapi%2Fcallback&rid=sgoqhnr0x0l", 
              // "", "height=800,width=600")
              window.top.location.href = "https://ads.tiktok.com/marketing_api/auth?app_id=7246300422938296321&state=your_custom_params&redirect_uri=https%3A%2F%2Fretain-frequencies-olive-fares.trycloudflare.com%2Fapi%2Fcallback&rid=rbedd2bdf8"
            },
          }}
          secondaryActions={[
            {
              content: t("HomeTab.secondaryAction"),
              onAction: () => console.log("Secondary action"),
            },
          ]}
        />
        <Layout>
          <Layout.Section>

            <LegacyCard >
              <LegacyCard.Header
                title={"Tiktok for business"}
              >
              </LegacyCard.Header>
              <LegacyCard.Section>
                <Text as="p" >Having trouble connecting account?</Text>
                <AlphaCard padding={"6"} >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ paddingRight: "15px" }}><Avatar customer></Avatar></div>
                      <div><Text>Connect TikTok for business</Text> </div>
                    </div>
                    <div><Button primary >Connect</Button> </div>
                  </div>
                </AlphaCard>
              </LegacyCard.Section>
            </LegacyCard>

            <LegacyCard>
              <LegacyCard.Header title={"Tiktok Ads Manager"}>
              </LegacyCard.Header>
              <LegacyCard.Section>
                <Text as="p">You can access and manage all of your TikTok ads here</Text>

                <ShopDisplay></ShopDisplay>
                <ShopDisplay></ShopDisplay>
              </LegacyCard.Section>
            </LegacyCard>

            <LegacyCard>
              <LegacyCard.Header title={"Sharing data"}>
              </LegacyCard.Header>
              <LegacyCard.Section>
                <Text as="h3">TikTok Pixels use first-party and third -party cookies to measure events, maximize campaign performance and personalize ads.</Text>
              </LegacyCard.Section>
              <LegacyCard.Section>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div><UserPixel></UserPixel> </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <div style={{ paddingRight: "20px" }}><Button plain> Create pixel</Button></div>
                    <div><Button primary>Connect</Button></div>
                  </div>
                </div>
              </LegacyCard.Section>
            </LegacyCard>
          </Layout.Section>
          <Layout.Section>

          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}