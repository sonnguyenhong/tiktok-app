import { TitleBar } from "@shopify/app-bridge-react";
import { LegacyCard, Layout, Page, Text, IndexTable, useIndexResourceState } from "@shopify/polaris";
import BarChart from "../../../components/BarChart";
import { useTranslation } from "react-i18next";
import dataBarChart from "../FakeDataBarChart";
import Search from "../../../components/campaigns/Search";
import DateCombobox from "../../../components/campaigns/DateCombobox";
function TargetingRefion() {
    const breadcrumbs = [{ content: "Report", url: "/reports" }];
    const { t } = useTranslation();
    const resourceName = {
        singular: 'order',
        plural: 'orders',
    };
    const orders = [
        {
            id: '1020',
            country: 'Viet Nam',
            name: 'abc',
            impression: 200,
            clicks: 111,
            spend: '100$',
            cpc: '100$',
            cpm: '25$',
            ctr: 0.5,
            conversions: 1,
            results: 3.5
        },
        {
            id: '1354',
            country: 'Viet Nam',
            name: 'abcf',
            impression: 213,
            clicks: 111,
            spend: '100$',
            cpc: '100$',
            cpm: '25$',
            ctr: 0.5,
            conversions: 1,
            results: 3.5
        },
        {
            id: '1345',
            country: 'Viet Nam',
            name: 'abcfwef',
            impression: 213,
            clicks: 111,
            spend: '100$',
            cpc: '100$',
            cpm: '25$',
            ctr: 0.5,
            conversions: 1,
            results: 3.5
        },
    ];
    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(orders);
    const rowMarkup = orders.map(
        (
            { id, country, name, impression, clicks, spend, cpc, cpm, ctr, conversions, results },
            index,
        ) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell >
                    {/* <ToggleSwitch status={status} onToggle={(status) => { console.log(status) }}>

          </ToggleSwitch> */}
                    {country}
                </IndexTable.Cell>
                <IndexTable.Cell>{name}</IndexTable.Cell>
                <IndexTable.Cell>{impression}</IndexTable.Cell>
                <IndexTable.Cell>{clicks}</IndexTable.Cell>
                <IndexTable.Cell>{spend}</IndexTable.Cell>
                <IndexTable.Cell>{cpc}</IndexTable.Cell>
                <IndexTable.Cell>{cpm}</IndexTable.Cell>
                <IndexTable.Cell>{ctr}</IndexTable.Cell>
                <IndexTable.Cell>{conversions}</IndexTable.Cell>
                <IndexTable.Cell>{results}</IndexTable.Cell>
            </IndexTable.Row>
        ),
    );
    return (
        <Page fullWidth>
            <TitleBar title="Targeting Country" breadcrumbs={breadcrumbs} primaryAction={null} />
            <Layout>
                <Layout.Section>
                    <div>
                        <LegacyCard sectioned style={{ height: "300px" }}>
                            <Text variant="headingMd" as="h2">
                                {t("Country/Region")}
                            </Text>

                            <div style={{ height: "400px" }}>
                                <BarChart data={dataBarChart} />
                            </div>
                        </LegacyCard>
                    </div>
                </Layout.Section>
                <Layout.Section >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px' }}>
                        <div style={{ height: '40px', width: '30%', paddingTop: '12px' }}>
                            <Search >
                            </Search>
                        </div>
                        <div style={{ width: '500px', display: 'flex', justifyContent: 'space-between' }}>
                            <div><DateCombobox name="Start"></DateCombobox></div>
                            <div><DateCombobox name="End"></DateCombobox></div>
                        </div>

                    </div>
                    <LegacyCard>
                        <IndexTable
                            resourceName={resourceName}
                            itemCount={orders.length}
                            selectedItemsCount={
                                allResourcesSelected ? 'All' : selectedResources.length
                            }
                            onSelectionChange={handleSelectionChange}
                            headings={[
                                { title: 'Country/Region' },
                                { title: 'Name' },
                                { title: 'Impression' },
                                { title: 'Clicks' },
                                { title: 'Spend' },
                                { title: 'CPC' },
                                { title: 'CPM' },
                                { title: 'CTR' },
                                { title: 'Conversions' },
                                { title: 'Result' },
                            ]}
                        >
                            {rowMarkup}
                        </IndexTable>
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </Page>
    );
}

export default TargetingRefion;
