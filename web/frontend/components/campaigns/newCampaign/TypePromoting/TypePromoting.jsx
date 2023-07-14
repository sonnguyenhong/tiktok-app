import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./TypePromoting.module.css";
import { faBox, faCircleCheck, faLayerGroup, faPager } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@shopify/polaris";
import { useEffect, useRef, useState } from "react";

function TypePromoting() {
    const [value, setValue] = useState("product");
    const productRef = useRef();
    const collectionRef = useRef();
    const homePageRef = useRef();

    let productHandle = () => {
        productRef.current.classList.add(styles.chose);
        collectionRef.current.classList.remove(styles.chose);
        homePageRef.current.classList.remove(styles.chose);
        setValue("product");
    };
    let collectionHandle = () => {
        collectionRef.current.classList.add(styles.chose);
        productRef.current.classList.remove(styles.chose);
        homePageRef.current.classList.remove(styles.chose);
        setValue("collection");
    };
    let homePageHandle = () => {
        homePageRef.current.classList.add(styles.chose);
        productRef.current.classList.remove(styles.chose);
        collectionRef.current.classList.remove(styles.chose);
        setValue("homePage");
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.listType}>
                <div className={`${styles.listTypeItem} ${styles.chose}`} onClick={productHandle} ref={productRef}>
                    <div className={styles.content}>
                        {value == "product" ? (
                            <FontAwesomeIcon className={styles.icon} icon={faCircleCheck} size="lg" />
                        ) : (
                            <FontAwesomeIcon className={styles.icon} icon={faBox} size="lg" />
                        )}
                        <span className={styles.type}>Sản phẩm duy nhất</span>
                    </div>
                </div>
                <div className={styles.listTypeItem} onClick={collectionHandle} ref={collectionRef}>
                    <div className={styles.content}>
                        {value == "collection" ? (
                            <FontAwesomeIcon className={styles.icon} icon={faCircleCheck} size="lg" />
                        ) : (
                            <FontAwesomeIcon className={styles.icon} icon={faLayerGroup} size="lg" />
                        )}
                        <span className={styles.type}>Bộ sưu tập</span>
                    </div>
                </div>
                <div className={styles.listTypeItem} onClick={homePageHandle} ref={homePageRef}>
                    <div className={styles.content}>
                        {value == "homePage" ? (
                            <FontAwesomeIcon className={styles.icon} icon={faCircleCheck} size="lg" />
                        ) : (
                            <FontAwesomeIcon className={styles.icon} icon={faPager} size="lg" />
                        )}
                        <span className={styles.type}>Trang chủ</span>
                    </div>
                </div>
            </div>
            <div className={styles.choseTarget}>
                {value == "product" ? <Button primary>Chọn một sản phẩm</Button> : null}
                {value == "collection" ? <Button primary>Chọn một bộ sưu tập</Button> : null}
                {value == "homePage" ? (
                    <div className={styles.urlHomePage}>
                        <p>quickstart-4a029195</p>
                        <a className={styles.url} href="https://quickstart-4a029195.myshopify.com/" target="_blank">
                            https://quickstart-4a029195.myshopify.com
                        </a>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default TypePromoting;
