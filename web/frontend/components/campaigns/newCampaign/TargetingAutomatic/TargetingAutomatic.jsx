import styles from "./TargetingAutomatic.module.css";

import { LegacyStack, Tag, Autocomplete, Checkbox } from "@shopify/polaris";
import { useState, useCallback, useMemo, useRef } from "react";

function TargetingAutomatic() {
    const deselectedOptions = useMemo(
        () => [
            { value: "Cambodia", label: "Cambodia" },
            { value: "Egypt", label: "Egypt" },
            { value: "Indonesia", label: "Indonesia" },
            { value: "Kuwait", label: "Kuwait" },
            { value: "Malaysia", label: "Malaysia" },
            { value: "Morocco", label: "Morocco" },
            { value: "Philippines", label: "Philippines" },
            { value: "Quatar", label: "Quatar" },
            { value: "Saudi Arabia", label: "Saudi Arabia" },
            { value: "Singapore", label: "Singapore" },
            { value: "South Africa", label: "South Africa" },
            { value: "South Korea", label: "South Korea" },
            { value: "Thaiand", label: "Thaiand" },
            { value: "Turkey", label: "Turkey" },
            { value: "United Arab Emirates", label: "United Arab Emirates" },
            { value: "Vietnam", label: "Vietnam" },
        ],
        []
    );
    const originOptions = [
        "Cambodia",
        "Egypt",
        "Indonesia",
        "Kuwait",
        "Malaysia",
        "Morocco",
        "Philippines",
        "Quatar",
        "Saudi Arabia",
        "Singapore",
        "South Africa",
        "South Korea",
        "Thaiand",
        "Turkey",
        "United Arab Emirates",
        "Vietnam",
    ];
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState(deselectedOptions);

    const [checkedAll, setCheckedAll] = useState(false);
    const handleCheckAll = useCallback((newChecked) => {
        if (newChecked) setSelectedOptions(originOptions);
        else setSelectedOptions([]);
        setCheckedAll(newChecked);
    }, []);

    const [checkedAbove18, setCheckedAbove18] = useState(false);
    const handleCheckedAbove18 = useCallback((newChecked) => {
        setCheckedAbove18(newChecked);
    }, []);

    const updateText = useCallback(
        (value) => {
            setInputValue(value);

            if (value === "") {
                setOptions(deselectedOptions);
                return;
            }

            const filterRegex = new RegExp(value, "i");
            const resultOptions = deselectedOptions.filter((option) => option.label.match(filterRegex));

            setOptions(resultOptions);
        },
        [deselectedOptions]
    );

    const removeTag = useCallback(
        (tag) => () => {
            const options = [...selectedOptions];
            options.splice(options.indexOf(tag), 1);
            setSelectedOptions(options);
            //If removeTag
            setCheckedAll(false);
        },
        [selectedOptions]
    );

    const verticalContentMarkup =
        selectedOptions.length > 0 ? (
            <LegacyStack spacing="extraTight" alignment="center">
                {selectedOptions.map((option) => {
                    let tagLabel = "";
                    tagLabel = option.replace("_", " ");
                    tagLabel = titleCase(tagLabel);
                    return (
                        <Tag key={`option${option}`} onRemove={removeTag(option)}>
                            {tagLabel}
                        </Tag>
                    );
                })}
            </LegacyStack>
        ) : null;

    const textField = (
        <Autocomplete.TextField
            onChange={updateText}
            value={inputValue}
            placeholder="Tìm kiếm địa điểm"
            verticalContent={verticalContentMarkup}
            autoComplete="off"
        />
    );

    return (
        <div className={styles.wrapper}>
            <p className={styles.description}>
                "Nhắm mục tiêu: Tự động" giúp bạn tiếp cận những khách hàng phù hợp nhất bằng cách tối ưu hóa đối tượng
                của campaign một cách tự động và linh hoạt. Nó sẽ xem xét mục tiêu, phân phối quảng cáo, nội dung quảng
                cáo của bạn, dữ liệu campaign trong quá khứ, v.v.
            </p>
            <div className={styles.selectAll}>
                <span className={styles.title}>Chọn tất cả</span>
                <Checkbox checked={selectedOptions.length == 16 ? true : false} onChange={handleCheckAll} />
            </div>
            <Autocomplete
                textField={textField}
                allowMultiple
                options={options}
                selected={selectedOptions}
                onSelect={setSelectedOptions}
                listTitle="Địa điểm"
            />
            <div className={styles.above18}>
                <div className={styles.checkBoxArea}>
                    <Checkbox checked={checkedAbove18} onChange={handleCheckedAbove18} label = "Chỉ nhắm mục tiêu độ tuổi trên 18"/>
                </div>
                <div className={styles.explanation}>
                    Theo mặc định quảng cáo có thể nhắm mục tiêu đến tất cả các độ tuổi. Chọn tùy chọn này nếu khu vực
                    của bạn có giới hạn về độ tuổi.
                </div>
            </div>
        </div>
    );

    function titleCase(string) {
        return string
            .toLowerCase()
            .split(" ")
            .map((word) => word.replace(word[0], word[0].toUpperCase()))
            .join("");
    }
}

export default TargetingAutomatic;
