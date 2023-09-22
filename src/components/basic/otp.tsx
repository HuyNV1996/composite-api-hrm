import React, { useEffect, useRef, useState } from 'react';
import OtpInput from 'react-otp-input';

type AllowedInputTypes = 'password' | 'text' | 'number' | 'tel';
type OtpInputProps = {
  otp?: string;
  numInputs: number;
  separator: ((index: number) => React.ReactNode) | React.ReactNode;
  inputType?: AllowedInputTypes;
  minLength?: number;
  maxLength?: number;
  clearInput?: boolean;
  setOtpValue?: any;
};

const Otp = (props: OtpInputProps) => {
  const { numInputs, separator, inputType, clearInput, setOtpValue } = props;

  const [{ otp, placeholder }, setConfig] = React.useState({
    otp: '',
    placeholder: '',
  });

  const handleOTPChange = (otp: string) => {
    setConfig(prevConfig => ({ ...prevConfig, otp }));
    setOtpValue(otp);
  };
  useEffect(() => {
    clearOtp();
  }, [clearInput]);
  const clearOtp = () => {
    setConfig(prevConfig => ({ ...prevConfig, otp: '' }));
  };
  return (
    <OtpInput
      value={otp}
      numInputs={numInputs}
      onChange={handleOTPChange}
      renderSeparator={<span>{separator}</span>}
      placeholder={placeholder}
      renderInput={props => <input {...props} />}
      shouldAutoFocus
      inputStyle="inputStyle"
      inputType={inputType}
    />
  );
};

export default Otp;
