import { Card, Page, Layout, TextContainer, Text } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import BarChart from "../../components/CapaignTabComponent/BarChart";
import LineChart from "../../components/CapaignTabComponent/LineChart";
import PieChart from "../../components/CapaignTabComponent/PieChart";

//fakedata
import dataBarChart from "./FakeDataBarChart";
import dataLineChart from "./FakeDataLineChart";
import dataPieChart from "./FakeDatePieChart";

export default function Campaigns() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <Page fullWidth>
            <TitleBar
                title={t("PageName.title")}
                primaryAction={{
                    content: t("PageName.primaryAction"),
                    onAction: async () => {
                        const response = await fetch("/api/authorization", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                        });
                        const data = await response.json();
                        console.log(data);
                    },
                }}
                secondaryActions={[
                    {
                        content: t("PageName.secondaryAction"),
                        onAction: () => console.log("Secondary action"),
                    },
                ]}
            />
            <Layout>
                <Layout.Section>
                    <Text variant="headingMd" as="h2">
                        {t("Targeting")}
                    </Text>
                </Layout.Section>
                <Layout.Section>
                    <div onMouseOver = {(event) => event.target.style.cursor = 'pointer'} onClick={() => navigate("/reports/TargetingAge")}>
                        <Card sectioned style={{ height: "300px" }}>
                            <Text variant="headingMd" as="h2">
                                {t("Age")}
                            </Text>
                            {/* <TextContainer>
                            <p>{t("PageName.1")}</p>
                        </TextContainer> */}
                            <div style={{ height: "400px" }}>
                                <BarChart data={dataBarChart} />
                            </div>
                        </Card>
                        </div>
                </Layout.Section>
                <Layout.Section secondary>
                    <Card sectioned>
                        <Text variant="headingMd" as="h2">
                            {t("Gender")}
                        </Text>
                        {/* <TextContainer>
                            <p>{t("PageName.why")}</p>
                        </TextContainer> */}
                        <div style={{ height: "400px" }}>
                            <PieChart data={dataPieChart} />
                        </div>
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card sectioned>
                        <Text variant="headingMd" as="h2">
                            {t("Country/Region")}
                        </Text>
                        {/* <TextContainer>
                            <p>{t("PageName.why")}</p>
                        </TextContainer> */}
                        <div style={{ height: "450px" }}>
                            <BarChart data={dataBarChart} />
                        </div>
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Text variant="headingMd" as="h2">
                        {t("Product")}
                    </Text>
                </Layout.Section>
                <Layout.Section>
                    <Card sectioned>
                        {/* <Text variant="headingMd" as="h2">
                            {t("Product")}
                        </Text> */}
                        {/* <TextContainer>
                            <p>{t("PageName.why")}</p>
                        </TextContainer> */}
                        <div style={{ height: "300px" }}>
                            <LineChart data={dataLineChart} />
                        </div>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
