import styles from "./DashboardMain.module.css"
import ListUser from "./ListUser"

export default function Main(){
    return <div className={styles.container}>
        <ListUser />
    </div>
}