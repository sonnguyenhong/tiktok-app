import {
  Page,
  Layout,
  TextContainer,
  Text,
  LegacyCard,
  AlphaCard,
  Avatar,
  Button,
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText,
  Select
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import { Redirect } from "@shopify/app-bridge/actions";

import { useCallback, useEffect, useState } from "react";
import { useAppQuery } from "../hooks";
import { useAppBridge } from "@shopify/app-bridge-react";
import { TIKTOK_AUTH_HEADER } from "../../constants/header.constants";
import axios from "axios";

export default function HomePage() {
  const { t } = useTranslation();
  const tiktokAuthUrl = "https://ads.tiktok.com/marketing_api/auth?app_id=7246300422938296321&state=your_custom_params&redirect_uri=https%3A%2F%2Fsender-motorcycles-arise-winds.trycloudflare.com%2Fapi%2Fcallback&rid=deew2fu5w4"
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
    localStorage.setItem(TIKTOK_AUTH_HEADER, data.tiktokAccessToken.access_token);
    console.log('accesstoken in local storage: ', localStorage.getItem(TIKTOK_AUTH_HEADER));
    setTiktokSession({
      ...data,
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
    );
  }

  return (
    <Page narrowWidth>
      <TitleBar
        title={t("HomePage.title")}
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
                    <div style={{ paddingRight: "15px" }}><Avatar customer source={data && data?.userInfor?.avatar_url}></Avatar></div>
                    <div><Text>{data && data?.userInfor ? data?.userInfor?.display_name : 'Connect TikTok for business'}</Text> </div>
                  </div>
                  <div><Button primary 
                    onClick={async () => {
                      if(localStorage.getItem(TIKTOK_AUTH_HEADER)) {
                        const logoutResponse = await axios.post('/api/logout-tiktok', {}, {
                          headers: {
                            [TIKTOK_AUTH_HEADER]: localStorage.getItem(TIKTOK_AUTH_HEADER)
                          }
                        })
                        console.log(logoutResponse);
                        localStorage.removeItem(TIKTOK_AUTH_HEADER);
                        location.reload();
                      } else {
                        redirect.dispatch(Redirect.Action.REMOTE, tiktokAuthUrl);
                      }
                    }}
                  >{data && data?.userInfor ? 'Disconnect' : 'Connect'}</Button> </div>
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
                data && data?.adsListInfor ? (
                  data.adsListInfor.list.map((ads, index) => {
                    return (
                      <div style={{ borderWidth: "1px", borderStyle: "solid", borderRadius: "4px", borderColor: "#E7E9EB", marginTop: "8px" }}>
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
                                              
                                              const mappedPixel = pixelsList.data.data.pixels.map((pixel, index) => {
                                                return {
                                                  label: pixel.pixel_id,
                                                  value: pixel.pixel_id
                                                }
                                              })
                                              console.log('mappedPixel: ', mappedPixel);
                                              setPixels(mappedPixel)
                                            }}
                                            >
                                              Connect
                                      </Button> 
                                  </div>
                              </div>
                          </AlphaCard>
                      </div>
                    )
                  })
                ) : (
                  <Text>You are not connected to a Business Account</Text>
                )
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
                  <div style={{ width: '100%', marginRight: '16px' }}> 
                    <Select
                        options={pixels}
                        onChange={handleSelectChange}
                        value={selectedPixel}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <div style={{ paddingRight: "20px" }}><Button plain> Create pixel</Button></div>
                    <div><Button primary>Connect</Button></div>
                  </div>
                </div>
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}