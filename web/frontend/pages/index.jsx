import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

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

  if(tiktokSession) {
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
            <Card sectioned>
              <Stack
                wrap={false}
                spacing="extraTight"
                distribution="trailing"
                alignment="center"
              >
                <Stack.Item fill>
                  <TextContainer spacing="loose">
                    <Text as="h2" variant="headingMd">
                      {t("HomePage.heading")}
                    </Text>
                    <p>
                      <Trans
                        i18nKey="HomePage.yourAppIsReadyToExplore"
                        components={{
                          PolarisLink: (
                            <Link url="https://polaris.shopify.com/" external />
                          ),
                          AdminApiLink: (
                            <Link
                              url="https://shopify.dev/api/admin-graphql"
                              external
                            />
                          ),
                          AppBridgeLink: (
                            <Link
                              url="https://shopify.dev/apps/tools/app-bridge"
                              external
                            />
                          ),
                        }}
                      />
                    </p>
                    <p>{t("HomePage.startPopulatingYourApp")}</p>
                    <p>
                      <Trans
                        i18nKey="HomePage.learnMore"
                        components={{
                          ShopifyTutorialLink: (
                            <Link
                              url="https://shopify.dev/apps/getting-started/add-functionality"
                              external
                            />
                          ),
                        }}
                      />
                    </p>
                  </TextContainer>
                </Stack.Item>
                <Stack.Item>
                  <div style={{ padding: "0 20px" }}>
                    <Image
                      source={trophyImage}
                      alt={t("HomePage.trophyAltText")}
                      width={120}
                    />
                  </div>
                </Stack.Item>
              </Stack>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <ProductsCard />
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

}
