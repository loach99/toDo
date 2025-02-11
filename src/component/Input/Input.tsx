import styles from './styles/Input.module.scss';

interface InputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  projectName: string;
  name: string;
  maxLength?: number;
  required?: boolean;
  placeholder?: string;
  label?: string;
  type?: string;
  textarea?: boolean;
}
const Input = ({
  handleChange,
  projectName,
  name,
  maxLength,
  required,
  placeholder,
  label,
  type,
  textarea
}: InputProps) => {
  if (textarea) {
    return (
      <div className={styles.input}>
        <label>{label}</label>
        <textarea
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          value={projectName ?? ''}
          onChange={handleChange}
          required></textarea>
      </div>
    );
  }
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <input
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        value={projectName ?? ''}
        onChange={handleChange}
        name={name}
        type={type ?? 'text'}
      />
    </div>
  );
};

export default Input;
