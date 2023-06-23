import { Card, Page, Layout, TextContainer, Text, Grid, Stack, Box } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { LineChart } from "../components/HomeTabComponent/LineChart";
import { Statistic } from "../components/HomeTabComponent/Statistic";

export default function Home() {
  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar
        title={t("HomeTab.title")}
        primaryAction={{
          content: t("HomeTab.primaryAction"),
          onAction: () => window.open("https://ads.tiktok.com/marketing_api/auth?app_id=7246300422938296321&state=your_custom_params&redirect_uri=https%3A%2F%2Ftapita.io%2F&rid=mnvz73wsqtq"),
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
          {/* First row - Diagram component */}
          <Card title="Diagram Component" sectioned>
            {/* Your diagram component code goes here */}
            <div style={{ width: '100%' }}>
              <LineChart />
            </div>
          </Card>
        </Layout.Section>
        <Layout.Section>
          {/* Second row - Grid layout */}
          <Card title="Grid Layout" sectioned>
            <div style={{heigh: '40px', display: 'flex', justifyContent: 'space-between'}}>
               <div style={{flex: 1, margin: 8, border: '2px solid', borderRadius: 5}}>
                <Statistic name="Impression" isIncrease={true} value={1600} percent={16}/>
               </div>
               <div style={{flex: 1, margin: 8, border: '2px solid', borderRadius: 5}}>
                <Statistic name="Clicks" isIncrease={true} value={2021} percent={16}/>
               </div>
               <div style={{flex: 1, margin: 8, border: '2px solid', borderRadius: 5}}>
                <Statistic name="Spend" isIncrease={false} value={56} percent={16}/>
               </div>
               <div style={{flex: 1, margin: 8, border: '2px solid', borderRadius: 5}}>
                <Statistic name="CPC" isIncrease={true} value={123} percent={16}/>
               </div>
            </div>
            <div style={{heigh: '40px', display: 'flex', justifyContent: 'space-between'}}>
               <div style={{flex: 1, margin: 8, border: '2px solid', borderRadius: 5}}>
                <Statistic name="CPM" isIncrease={true} value={158} percent={16}/>
               </div>
               <div style={{flex: 1, margin: 8, border: '2px solid', borderRadius: 5}}>
                <Statistic name="CTR" isIncrease={false} value={324} percent={16}/>
               </div>
               <div style={{flex: 1, margin: 8, border: '2px solid', borderRadius: 5}}>
                <Statistic name="Conversions" isIncrease={true} value={2006} percent={16}/>
               </div>
               <div style={{flex: 1, margin: 8, border: '2px solid', borderRadius: 5}}>
                <Statistic name="Result" isIncrease={true} value={2512} percent={16}/>
               </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
