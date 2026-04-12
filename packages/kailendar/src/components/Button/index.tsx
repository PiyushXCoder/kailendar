import styles from "./styles.module.scss";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button className={styles.kailendarBtn} onClick={onClick}>
      {children}
    </button>
  );
}
