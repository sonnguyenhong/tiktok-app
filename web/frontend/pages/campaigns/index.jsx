import {
  Page, Layout, IndexTable, LegacyCard, Popover, ActionList,
  Text, ButtonGroup, Button, Icon, useIndexResourceState, Badge
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { DropdownMinor } from "@shopify/polaris-icons";
import React, { useState, useCallback, useEffect } from 'react';
import ToggleSwitch from "../../components/campaigns/toggle";

import Search from "../../components/campaigns/Search";
import DateCombobox from "../../components/campaigns/DateCombobox";
import CampaignsStatus from "../../components/campaigns";

export default function Campaigns() {
  const { t } = useTranslation();

  const orders = [
    {
      id: '1020',
      status: 1,
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
      status: 1,
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
      status: 0,
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
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  // const CampaignsStatus = (props) => {

  // };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);
  const rowMarkup = orders.map(
    (
      { id, status, name, impression, clicks, spend, cpc, cpm, ctr, conversions, results },
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

          <CampaignsStatus param={parseInt(status)} />
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

  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const handleImportedAction = useCallback(
    () => console.log('Imported action'),
    [],
  );

  const handleExportedAction = useCallback(
    () => console.log('Exported action'),
    [],
  );

  const activator = (
    <Button onClick={toggleActive} disclosure>
      Edit
    </Button>
  );

  const handleDeleteAction = useCallback(
    () => console.log("Delete"),
    [],
  );


  return (
    <Page fullWidth>
      <TitleBar
        title={t("Campaigns")}
      />
      <Layout>
        <Layout.Section>
          <ButtonGroup>
            <Button primary> Create</Button>

            <div >
              <Popover
                active={active}
                activator={activator}
                autofocusTarget="first-node"
                onClose={toggleActive}
              >
                <ActionList
                  actionRole="menuitem"
                  items={[
                    {
                      content: 'Paused',
                      onAction: handleImportedAction,
                    },
                    {
                      content: 'Enabled',
                      onAction: handleExportedAction,
                    },
                    {
                      content: 'Delete',
                      onAction: handleDeleteAction,
                    },
                  ]}
                />
              </Popover>
            </div>
          </ButtonGroup>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ height: '40px', width: '30%', paddingTop: '12px' }}>
              <Search >
              </Search>
            </div>
            <div style={{ width: '500px', display: 'flex', justifyContent: 'space-between' }}>
              <div><DateCombobox name="Start"></DateCombobox></div>
              <div><DateCombobox name="End"></DateCombobox></div>
            </div>

          </div>
        </Layout.Section>
        <Layout.Section >

          <LegacyCard>
            <IndexTable
              resourceName={resourceName}
              itemCount={orders.length}
              selectedItemsCount={
                allResourcesSelected ? 'All' : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                { title: 'On/Off' },
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
