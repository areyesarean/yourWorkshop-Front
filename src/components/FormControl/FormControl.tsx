
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

interface FormControlProps {
  name: string;
  inputType: string;
  labelInput: string;
  labelText: string;
  showError: boolean;
  errorMessage: any;
  register: any;
  autoFocus?: boolean
  children: React.ReactNode;
}

const FormControlInput = ({
  name,
  inputType,
  labelInput,
  labelText,
  errorMessage,
  showError,
  register,
  autoFocus,
  children,
}: FormControlProps) => {
  return (
    <FormControl error={showError} variant="outlined" fullWidth margin="normal">
      <InputLabel htmlFor={name}>{labelText}</InputLabel>
      <OutlinedInput
        id={name}
        type={inputType}
        {...register}
        label={labelInput}
        autoComplete={name}
        autoFocus={autoFocus ?? false}
        aria-describedby={`component-error-${name}-text`}
        endAdornment={children}
      />
      <FormHelperText id={`component-error-${name}-text`}>
        {errorMessage}
      </FormHelperText>
    </FormControl>
  );
};
export default FormControlInput;
