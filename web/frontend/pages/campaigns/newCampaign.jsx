import { Card, Page, Layout, TextContainer, Text, TextField, LegacyCard } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import PieChart from "../../components/PieChart";

import { useCallback, useState } from "react";
import NameCampaign from "../../components/campaigns/newCampaign/NameCampaign/NameCampaign";
import CreateCampaign from "../../components/campaigns/newCampaign/CreateCampaign/CreateCampaign";
import OptimizationEvent from "../../components/campaigns/newCampaign/OptimizationEvent/OptimizationEvent";
import TargetingAutomatic from "../../components/campaigns/newCampaign/TargetingAutomatic/TargetingAutomatic";
import BudgetAndSchedule from "../../components/campaigns/newCampaign/BudgetAndSchedule/BudgetAndSchedule";
import TypePromoting from "../../components/campaigns/newCampaign/TypePromoting/TypePromoting";

export default function Campaigns() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const breadcrumbs = [{ content: "Campaigns", url: "/campaigns" }];
    // const [value, setValue] = useState("Jaded Pixel");

    // const handleChange = useCallback((newValue) => setValue(newValue), []);
    const [urlVideo, setUrlVideo] = useState();
    // setUrlVideo(test)
    return (
        <Page>
            <TitleBar
                title={t("New Campaign")}
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
                breadcrumbs={breadcrumbs}
            />
            <Layout>
                <Layout.Section>
                    <LegacyCard sectioned>
                        <Text variant="headingMd" as="h2">
                            {t("Tên quảng cáo")}
                        </Text>
                        <NameCampaign />
                    </LegacyCard>

                    <LegacyCard sectioned>
                        <Text variant="headingMd" as="h2">
                            {t("Bạn đang quảng cáo những sản phẩm gì")}
                        </Text>
                        <TypePromoting/>
                    </LegacyCard>

                    <LegacyCard sectioned>
                        <Text variant="headingMd" as="h2">
                            {t("Tạo quảng cáo")}
                        </Text>
                        <CreateCampaign />
                    </LegacyCard>

                    <LegacyCard sectioned>
                        <Text variant="headingMd" as="h2">
                            {t("Nhắm mục tiêu: Tự động")}
                        </Text>
                        <TargetingAutomatic />
                    </LegacyCard>

                    <LegacyCard sectioned>
                        <Text variant="headingMd" as="h2">
                            {t("Sự kiện tối ưu hóa")}
                        </Text>
                        <OptimizationEvent />
                    </LegacyCard>

                    <LegacyCard sectioned>
                        <Text variant="headingMd" as="h2">
                            {t("Ngân sách và Lịch trình")}
                        </Text>
                        <BudgetAndSchedule />
                    </LegacyCard>
                </Layout.Section>

                <Layout.Section secondary>
                    <LegacyCard sectioned>
                        <Text variant="headingMd" as="h2">
                            {t("Xem trước")}
                        </Text>
                        <div width = "300">
                            {<video src="blob:https://storm-composer-movie-kuwait.trycloudflare.com/84fee4c7-4036-4db1-be83-211cb09b4616" controls width="250px" />}
                        </div>
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
