import React, { useState, forwardRef } from 'react';
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormControl,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PasswordInput: React.FC<any> = forwardRef(({
  value,
  onChange,
  placeholder = 'Password',
  isCopy = false,
  handleCopy,
  ...props
}, ref) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <OutlinedInput
        inputRef={ref}
        type={isPasswordVisible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
            {isCopy && (
              <IconButton onClick={handleCopy} edge="end">
                <ContentCopyIcon />
              </IconButton>
            )}
          </InputAdornment>
        }
        inputProps={{
          style: {
            fontFamily: 'Fredoka, sans-serif',
            fontSize: '16px',
            height: '15px'
          },
        }}
        {...props}
      />
    </FormControl>
  );
});

export default PasswordInput;
