import { TitleBar } from "@shopify/app-bridge-react";
import { Card, Layout, Page, SkeletonBodyText } from "@shopify/polaris";

function TargetingAge() {
    const breadcrumbs = [{ content: "Report", url: "/reports" }];
    return (
        <Page>
            <TitleBar title="Targeting Age" breadcrumbs={breadcrumbs} primaryAction={null} />
            <Layout>
                <Layout.Section>
                    <Card sectioned title="Title">
                        <SkeletonBodyText />
                    </Card>
                    <Card title="Product">
                        <Card.Section>
                            <SkeletonBodyText lines={1} />
                        </Card.Section>
                        <Card.Section>
                            <SkeletonBodyText lines={3} />
                        </Card.Section>
                    </Card>
                    <Card sectioned title="Discount">
                        <SkeletonBodyText lines={2} />
                    </Card>
                </Layout.Section>
                <Layout.Section secondary>
                    <Card sectioned title="QR code" />
                </Layout.Section>
            </Layout>
        </Page>
    );
}

export default TargetingAge;
