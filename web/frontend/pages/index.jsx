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
  HorizontalStack,
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText,
  Select
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { InlineLayout, View } from "@shopify/checkout-ui-extensions-react";
import { useTranslation, Trans } from "react-i18next";
import ShopDisplay from "../components/connect/ShopDisplay";
import UserPixel from "../components/connect/UserPixel";
import createApp from "@shopify/app-bridge";
import { Redirect } from "@shopify/app-bridge/actions";
import { trophyImage } from "../assets";

import { ProductsCard } from "../components";
import { useCallback, useEffect, useState } from "react";
import { useAppQuery } from "../hooks";
import { useAppBridge } from "@shopify/app-bridge-react";
import { TIKTOK_AUTH_HEADER } from "../../constants/header.constants";
import axios from "axios";

export default function HomePage() {
  const { t } = useTranslation();
  const tiktokAuthUrl = "https://ads.tiktok.com/marketing_api/auth?app_id=7246300422938296321&state=your_custom_params&redirect_uri=https%3A%2F%2Fnurses-sydney-digit-opens.trycloudflare.com%2Fapi%2Fcallback&rid=6wd6z891wee"
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const [tiktokSession, setTiktokSession] = useState(null);
  const [pixels, setPixels] = useState([]);
  const [selectedPixel, setSelectedPixel] = useState([]);

  const handleSelectChange = useCallback(
    (value) => setSelectedPixel(value),
    [],
  )

  const {
    data,
    isLoading,
    isRefetching,
  } = useAppQuery({
    url: '/api/get-ads-profile',
    reactQueryOptions: {
      /* Disable refetching because the QRCodeForm component ignores changes to its props */
      refetchOnReconnect: false,
    }
  })

  useEffect(async () => {
    console.log(data);
    const advertiser_ids = data.advertiser_ids.split(',');
    const accessToken = data.access_token;
    localStorage.setItem(TIKTOK_AUTH_HEADER, accessToken);
    setTiktokSession({
      ...data,
      advertiser_ids: advertiser_ids
    })
  }, [data]);

  if(isLoading || isRefetching) {
    return (
      <SkeletonPage primaryAction>
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <SkeletonBodyText />
            </LegacyCard>
            <LegacyCard sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText />
              </TextContainer>
            </LegacyCard>
            <LegacyCard sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText />
              </TextContainer>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
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
                      <div style={{ paddingRight: "15px" }}><Avatar customer source={data.userInfor.avatar_url || ''}></Avatar></div>
                      <div><Text>{data.userInfor.display_name || 'Connect TikTok for business'}</Text> </div>
                    </div>
                    <div><Button primary 
                      onClick={() => {
                        console.log('storage', localStorage.getItem(TIKTOK_AUTH_HEADER))
                        // window.top.location.href = tiktokAuthUrl
                        if(localStorage.getItem(TIKTOK_AUTH_HEADER)) {
                          console.log('Logout');
                        } else {
                          redirect.dispatch(Redirect.Action.REMOTE, tiktokAuthUrl);
                        }
                      }}
                    >{localStorage.getItem(TIKTOK_AUTH_HEADER) ? 'Disconnect' : 'Connect'}</Button> </div>
                  </div>
                </AlphaCard>
              </LegacyCard.Section>
            </LegacyCard>
  
            <LegacyCard>
              <LegacyCard.Header title={"Tiktok Ads Manager"}>
              </LegacyCard.Header>
              <LegacyCard.Section>
                <Text as="p">You can access and manage all of your TikTok ads here</Text>
                {
                  data && data?.adsListInfor.list.map((ads, index) => {
                    console.log('ads: ', ads.advertiser_id)
                    return (
                      <div key={index} style={{ borderWidth: "1px", borderStyle: "solid", borderRadius: "4px", borderColor: "#E7E9EB", marginTop: "8px" }}>
                          <AlphaCard padding={"6"} >
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <div style={{ alignItems: "center" }}>
                                      <div><Text>{ads.advertiser_name}</Text> </div>
                                      <div><Text>ID: {ads.advertiser_id}</Text> </div>
                                  </div>
                                  <div>
                                      <Button 
                                          primary 
                                          onClick={async () => {
                                              console.log(`Connect ${index} ${localStorage.getItem(TIKTOK_AUTH_HEADER)}`)
                                              const pixelsList = await axios.get(`/api/pixels?advertiser_id=${ads.advertiser_id}`, {
                                                headers: {
                                                  [TIKTOK_AUTH_HEADER]: localStorage.getItem(TIKTOK_AUTH_HEADER)
                                                }
                                              })
                                              console.log(pixelsList);
                                          }}>
                                              Connect
                                      </Button> 
                                  </div>
                              </div>
                          </AlphaCard>
                      </div>
                      // <ShopDisplay key={index} advertiser_id={ads.advertiser_id} advertiser_name={ads.advertiser_name} />
                    )
                  })
                }
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
                  <Select
                      options={pixels}
                      onChange={handleSelectChange}
                      value={selectedPixel}
                  />
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