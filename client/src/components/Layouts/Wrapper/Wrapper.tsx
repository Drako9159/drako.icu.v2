import styles from "./Wrapper.module.css";
export default function Wrapper({ children }: any) {
  return <div className={styles.containerWrapper}>{children}</div>;
}
