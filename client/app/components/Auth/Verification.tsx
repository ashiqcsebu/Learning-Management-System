import React, { FC, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { VscWorkspaceTrusted } from 'react-icons/vsc';

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const [invalidError, setInvalidError] = useState<boolean>(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    "0": "",
    "1": "",
    "2": "",
    "3": ""
  });

  const handleInputChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return; // Optional: only digits
    setInvalidError(false);

    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !verifyNumber[index.toString() as keyof VerifyNumber] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verificationHandler = async () => {
    const code = Object.values(verifyNumber).join("");
    if (code.length < 4) {
      setInvalidError(true);
      toast.error("Please enter the full code");
      return;
    }
    console.log("Verification code:", code);
    // Proceed with API call or logic
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-4">Enter Verification Code</h1>
      <div className="flex space-x-3">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            // 
            className={`w-12 h-12 border border-gray-300 rounded text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500
             ${invalidError ? "shake border-red-500" : " dark:border-white border-gray-300"}`

            }
          />
        ))}
      </div>
      {invalidError && <p className="text-red-500 mt-2">Invalid code, please try again.</p>}
      <button
        onClick={verificationHandler}
        className="mt-5 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 rounded-full"
      >
        Verify OTP
      </button>

      <h5 className='text-center font-poppins pt-4'>Go Back to Sign In ?
        <span
          className="text-blue-400 cursor-pointer ml-2"
          onClick={() => setRoute('Login')}
        >Sign In
        </span>
      </h5>
    </div>
  );
};

export default Verification;








// Orginal code

// import React, { FC, useRef, useState } from 'react';
// import toast from 'react-hot-toast';
// import { VscWorkspaceTrusted } from 'react-icons/vsc';

// type Props = {
//     setRoute: (route: string) => void;
// };

// type VerifyNumber = {
//     "0": string;
//     "1": string;
//     "2": string;
//     "3": string;
// };

// const Verification: FC<Props> = ({ setRoute }) => {
//     const [invalidError, setInvalidError] = useState<boolean>(false);

//     const inputRefs = [
//         useRef<HTMLInputElement>(null),
//         useRef<HTMLInputElement>(null),
//         useRef<HTMLInputElement>(null),
//         useRef<HTMLInputElement>(null)
//     ];

//     const verificationHandler = async () => {
//         console.log("test");
//     };

//     const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
//         "0": "",
//         "1": "",
//         "2": "",
//         "3": ""
//     });

//     const handleInputChange = (index: number, value: string) => {
//         setInvalidError(false);
//         const newVerifyNumber = { ...verifyNumber, [index]: value };
//         setVerifyNumber(newVerifyNumber);

//         if (value === "" && index > 0) {
//             inputRefs[index - 1].current?.focus();
//         } else if (value.length === 1 && index < 3) {
//             inputRefs[index + 1].current?.focus();
//         }
//     };

//     return (
//         <div>Verification</div>
//     );
// };

// export default Verification;
