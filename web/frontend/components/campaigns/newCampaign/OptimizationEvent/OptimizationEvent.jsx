import styles from "./OptimizationEvent.module.css";

import { Select } from "@shopify/polaris";
import { useState, useCallback } from "react";

function OptimizationEvent() {
    const [selected, setSelected] = useState();

    const handleSelectChange = useCallback((value) => setSelected(value), []);
    
    const options = [
        { label: "Hoàn tất thanh toán", value: "Hoàn tất thanh toán" },
        { label: "Xem nội dung", value: "Xem nội dung" },
        { label: "Thêm vào giỏ", value: "Thêm vào giỏ" },
        { label: "Thêm thông tin thanh toán", value: "Thêm thông tin thanh toán" },
        { label: "Bắt đầu thanh toán", value: "Bắt đầu thanh toán" },
        { label: "Tìm kiếm", value: "Tìm kiếm" },
    ];

    return (
        <div className = {styles.wrapper}>
            <p className = {styles.title}>Chọn loại kết quả bạn muốn xem từ quảng cáo này</p>
            <Select options={options} onChange={handleSelectChange} value={selected} />
        </div>
    );
}

export default OptimizationEvent;
