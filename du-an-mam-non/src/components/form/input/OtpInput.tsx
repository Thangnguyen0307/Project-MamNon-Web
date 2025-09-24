import { useState, FC } from "react";

interface OTPInputProps {
  onChange?: (value: string) => void;
}

const OTPInput: FC<OTPInputProps> = ({ onChange }) => {
  const [otpArray, setOtpArray] = useState<string[]>(Array(6).fill(""));
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);
    const joined = newOtp.join("");
    onChange?.(joined);
  };

  return (
    <div className="flex gap-2 justify-center">
      {otpArray.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          className="w-12 h-12 text-center text-xl border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OTPInput;
