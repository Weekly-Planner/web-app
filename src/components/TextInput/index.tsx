import React, { InputHTMLAttributes, PropsWithChildren } from "react";
import styles from "./index.module.css";
import classnames from "classnames";

interface ITextInput
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  error: string | undefined;
  icon?: React.ReactNode;
  paragraph?: number | undefined;
}

const TextInput: React.FC<PropsWithChildren<ITextInput>> = (props) => {
  return (
    <div>
      <div
        className={classnames(styles.inputContainer, {
          [styles.error]: Boolean(props.error),
        })}
      >
        {props.paragraph && props.paragraph > 0 ? (
          <textarea
            {...props}
            rows={props.paragraph}
            className={styles.multilineTextInput}
          />
        ) : (
          <input {...props} className={styles.input} />
        )}
        {props.icon}
      </div>
      <p className={styles.inputError}>{props.error}</p>
    </div>
  );
};

export default TextInput;
