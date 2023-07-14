import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./BudgetAndSchedule.module.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// import DateFnsUtils from "@date-io/date-fns"; // choose your lib
// import { DatePicker, TimePicker, DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useState } from "react";

function BudgetAndSchedule() {
    const [selectedDate, handleDateChange] = useState(new Date());

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
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker value={selectedDate} onChange={handleDateChange} />
                        <TimePicker value={selectedDate} onChange={handleDateChange} />
                        <DateTimePicker value={selectedDate} onChange={handleDateChange} />
                    </MuiPickersUtilsProvider> */}
                </div>
            </div>
        </div>
    );
}

export default BudgetAndSchedule;
