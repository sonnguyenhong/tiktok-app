import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./BudgetAndSchedule.module.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { useCallback, useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Checkbox } from "@shopify/polaris";

function BudgetAndSchedule() {
    const [selectedStartDate, setStartDate] = useState(new Date());
    const [selectedEndDate, setEndDate] = useState(null);
    const [runContinuously, setRunContinuously] = useState(true);
    let isValidSelectionDate;

    const handleRunContinuously = useCallback((newChecked) => {
        if (newChecked) setEndDate(null);
        setRunContinuously(newChecked);
    }, []);

    isValidSelectionDate = selectedStartDate < selectedEndDate;
    return (
        <div className={styles.wrapper}>
            <div className={styles.budget}>
                <p className={styles.title}>Ngân sách</p>
                <p className={styles.description}>
                    Tiktok sẽ tự động phân bổ ngân sách cho các quảng cáo hoạt động tốt nhất
                </p>
                <div className={styles.typeBudget}>
                    <div className={styles.option}>
                        <span className={styles.inner}>Hằng ngày</span>
                        <FontAwesomeIcon icon={faChevronDown} size="sm" />
                    </div>
                    <div className={styles.total}>
                        <label className={styles.inner}>
                            <input className={styles.content} placeholder="Nhập ngân sách" type="number" />
                            VND
                        </label>
                    </div>
                </div>
                <div className={styles.schedule}>
                    <p>Lịch trình</p>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div className={styles.selectSchedule}>
                            <KeyboardDateTimePicker
                                variant="inline"
                                ampm={false}
                                value={selectedStartDate}
                                onChange={setStartDate}
                                onError={console.log}
                                disablePast
                                format="yyyy/MM/dd HH:mm"
                            />
                            {(!runContinuously) && (
                                <>
                                    <span>đến</span>
                                    <KeyboardDateTimePicker
                                        variant="inline"
                                        ampm={false}
                                        value={selectedEndDate}
                                        onChange={setEndDate}
                                        onError={console.log}
                                        disablePast
                                        format="yyyy/MM/dd HH:mm"
                                        placeholder="Chọn ngày kết thúc"
                                    />
                                </>
                            )}
                        </div>
                    </MuiPickersUtilsProvider>
                    {(!isValidSelectionDate && selectedEndDate !== null) && (
                        <p className={styles.validSelectDate}>Ngày bắt đầu không thể sau ngày kết thúc</p>
                    )}
                    <div className={styles.runContinuously}>
                        <Checkbox checked={runContinuously} onChange={handleRunContinuously} label="Chạy liên tục" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BudgetAndSchedule;
