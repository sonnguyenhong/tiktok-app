import styles from "./NameCampaign.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@shopify/polaris";
import { faChevronDown, faStar } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";

function NameCampaign() {
    const [nameAd, setNameAd] = useState();

    const handleTextFieldChange = useCallback((value) => setNameAd(value), []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>
                <TextField
                    placeholder = "Nhập tên quảng cáo"
                    value={nameAd}
                    onChange={handleTextFieldChange}
                    maxLength={512}
                    autoComplete="off"
                    showCharacterCount
                />
            </div>
            <div className={styles.description}>Chỉ bạn mới thấy điều này</div>
            <div className={styles.type}>
                <span>Type:</span>
                <div className={styles.typeConversion}>
                    Conversion <FontAwesomeIcon icon={faChevronDown} size="xl"></FontAwesomeIcon>
                </div>
            </div>
        </div>
    );
}

export default NameCampaign;
