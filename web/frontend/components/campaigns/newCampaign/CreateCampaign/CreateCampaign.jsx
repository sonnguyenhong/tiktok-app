import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CreateCampaign.module.css";
import { faAngleUp, faAnglesDown, faAnglesUp, faLink, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextField } from "@shopify/polaris";

function CreateCampaign() {
    const [videoURL, setVideoURL] = useState("");
    const [isAvancedSetting, setAvancedSetting] = useState(false);

    let handleInputChange = (event) => {
        let file = event.target.files[0];
        let videoURL = URL.createObjectURL(file);
        setVideoURL(videoURL);
    };

    let handleToggle = () => {
        setAvancedSetting(!isAvancedSetting);
    };

    let advancedSetting = useRef();

    useEffect(() => {
        if (isAvancedSetting) {
            advancedSetting.current.style.display = "initial";
        } else {
            advancedSetting.current.style.display = "none";
        }
    }, [isAvancedSetting]);

    const [value, setValue] = useState();
    const handleChange = useCallback((newValue) => {
        if (newValue.length > 100) {
            newValue = newValue.slice(0, 99);
        }
        setValue(newValue);
    }, []);
    return (
        <div className={styles.wrapper}>
            <div className={styles.video}>
                <p>Video</p>
                <label className={styles.customInputVideo}>
                    <div className={styles.heading}>
                        <FontAwesomeIcon icon={faUpload} size="xl" />
                        <span className={styles.title}>Tải video lên</span>
                    </div>
                    <div className={styles.description}>Tải lên tệp video hiện có</div>
                    <input onChange={handleInputChange} className={styles.inputVideo} type="file" accept="video/*" />
                </label>
            </div>
            {videoURL && (
                <div className={styles.previewVideo}>
                    <p>Tất cả video</p>
                    <div className={styles.videosUpload}>
                        <video src={videoURL} controls height="108px" />
                    </div>
                </div>
            )}
            <div className={styles.creativeText}>
                <TextField
                    maxLength={100}
                    placeholder="Nhập nội dung sáng tạo cho quản cáo của bạn"
                    label="Văn bản quảng cáo"
                    value={value}
                    onChange={handleChange}
                    multiline={3}
                    autoComplete="off"
                    showCharacterCount
                />
            </div>
            <div className={styles.toggle} onClick={handleToggle}>
                {isAvancedSetting && <FontAwesomeIcon icon={faAnglesUp} />}
                {!isAvancedSetting && <FontAwesomeIcon icon={faAnglesDown} />}
                <span className={styles.title}>Cài đặt nâng cao</span>
            </div>
            <div ref={advancedSetting} className={styles.advancedSetting}>
                <div className={styles.displayName}>
                    <p>Tên hiển thị</p>
                    <input className={styles.inputName} type="text" />
                </div>
                <div className={styles.profileImage}>
                    <p>Ảnh hồ sơ</p>
                    <label className={styles.customInputProfile}>
                        +
                        <input className={styles.inputProfile} type="file" accept="image/*" />
                    </label>
                </div>
            </div>
        </div>
    );
}

export default CreateCampaign;
