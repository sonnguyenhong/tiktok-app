import {
    TextField,
    IndexFilters,
    useSetIndexFiltersMode,
    useIndexResourceState,
    Text,
    ChoiceList,
    RangeSlider,

} from '@shopify/polaris';
//import type { IndexFiltersProps, TabProps } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function Filters() {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const [itemStrings, setItemStrings] = useState([
        'All',
        'Unpaid',
        'Open',
        'Closed',
        'Local delivery',
        'Local pickup',
    ]);
    const deleteView = (index) => {
        const newItemStrings = [...itemStrings];
        newItemStrings.splice(index, 1);
        setItemStrings(newItemStrings);
        setSelected(0);
    };

    const duplicateView = async (name) => {
        setItemStrings([...itemStrings, name]);
        setSelected(itemStrings.length);
        await sleep(1);
        return true;
    };

    const tabs = itemStrings.map((item, index) => ({
        content: item,
        index,
        onAction: () => { },
        id: `${item}-${index}`,
        isLocked: index === 0,
        actions:
            index === 0
                ? []
                : [
                    {
                        type: 'rename',
                        onAction: () => { },
                        onPrimaryAction: async (value) => {
                            const newItemsStrings = tabs.map((item, idx) => {
                                if (idx === index) {
                                    return value;
                                }
                                return item.content;
                            });
                            await sleep(1);
                            setItemStrings(newItemsStrings);
                            return true;
                        },
                    },
                    {
                        type: 'duplicate',
                        onPrimaryAction: async (value) => {
                            await sleep(1);
                            duplicateView(value);
                            return true;
                        },
                    },
                    {
                        type: 'edit',
                    },
                    {
                        type: 'delete',
                        onPrimaryAction: async () => {
                            await sleep(1);
                            deleteView(index);
                            return true;
                        },
                    },
                ],
    }));

    const [selected, setSelected] = useState(0);
    const onCreateNewView = async (value) => {
        await sleep(500);
        setItemStrings([...itemStrings, value]);
        setSelected(itemStrings.length);
        return true;
    };

    const sortOptions = [
        { label: 'Order', value: 'order asc', directionLabel: 'Ascending' },
        { label: 'Order', value: 'order desc', directionLabel: 'Descending' },
        { label: 'Customer', value: 'customer asc', directionLabel: 'A-Z' },
        { label: 'Customer', value: 'customer desc', directionLabel: 'Z-A' },
        { label: 'Date', value: 'date asc', directionLabel: 'A-Z' },
        { label: 'Date', value: 'date desc', directionLabel: 'Z-A' },
        { label: 'Total', value: 'total asc', directionLabel: 'Ascending' },
        { label: 'Total', value: 'total desc', directionLabel: 'Descending' },
    ];

    const [sortSelected, setSortSelected] = useState(['order asc']);
    const { mode, setMode } = useSetIndexFiltersMode();
    const onHandleCancel = () => { };

    const onHandleSave = async () => {
        await sleep(1);
        return true;
    };

    const primaryAction =
        (selected === 0)
            ? {
                type: 'save-as',
                onAction: onCreateNewView,
                disabled: false,
                loading: false,
            }
            : {
                type: 'save',
                onAction: onHandleSave,
                disabled: false,
                loading: false,
            };

    return (
        <IndexFilters
            sortOptions={sortOptions}
            sortSelected={sortSelected}
            queryValue=""
            queryPlaceholder="Searching in all"
            onQueryChange={() => { }}
            onQueryClear={() => { }}
            onSort={setSortSelected}
            primaryAction={primaryAction}
            cancelAction={{
                onAction: onHandleCancel,
                disabled: false,
                loading: false,
            }}
            tabs={tabs}
            selected={selected}
            onSelect={setSelected}
            canCreateNewView
            onCreateNewView={onCreateNewView}
            filters={[]}
            appliedFilters={[]}
            onClearAll={() => { }}
            mode={mode}
            setMode={setMode}
            hideFilters
            hideQueryField
        />
    );
}

export default Filters;