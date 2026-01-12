
import React, { useState } from 'react';

interface SignUpPageProps {
  onSignUp: (method: string, role: 'common_user' | 'participant', code?: string, email?: string, researchDiscussion?: boolean, researchConsent?: boolean) => void;
  onBack: () => void;
}

// --- SECURITY UTILITY ---
async function sha256(message: string) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp, onBack }) => {
  const [step, setStep] = useState<'email' | 'program' | 'consent'>('email');
  const [email, setEmail] = useState('');
  const [programCode, setProgramCode] = useState('');
  const [talkedToResearcher, setTalkedToResearcher] = useState<boolean | null>(null);
  const [researchConsent, setResearchConsent] = useState(false);
  const [error, setError] = useState('');
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // --- CONFIGURATION ---
  
  // 1. SECURE HASH LIST
  // These correspond to the valid access codes. 
  // Even if someone views this code, they cannot easily reverse-engineer the original codes.
  const VALID_HASHES: string[] = [
    "f9dd5ee24b9f41bcd343ed6f54b7e2b9a863801d834faed2e6f72a0aad64d83c",
    "c28b88df3cf309a0b76f8d16df9fbf954c5508451f7171db1cba61702903bcf8",
    "f02e2a2ad58ae46f18a64557cf349425c7a8c4e2c5df0f2225ecd7500436111a",
    "3d1d3dd89c78064a82faca381144500775a88473c72c08e6426feee8deb225c8",
    "04809645e0d204f2dfd744c7c48eade1c7bee883dda51218a1ba0ea08b3a088a",
    "049585c1073b0cbf783e8b7e6ffb8792582ad952b473c7d21ed5b331eefd7ff5",
    "2e440cbfa0c3e68307764841b6fc7386023908b32a7423a0b5c1e6887504c9af",
    "305a0f2c108378ae2a481ef13467d5109510e469e3a67b17064941a292124641",
    "ae29de206c340fe82a1d4be30c5f04883d146bf726143af64b91e5f85398c24a",
    "3d5a539a42c4637ddb8fe39875dfb3069cd3cf5ef288ec0d8ced181055cdbfb8",
    "c4c212c714b655b2059afe5a94c8e7f0803367fcdd470cd440fe3d3a936cb49a",
    "16ff3d3493279b747c16a9565158f1666f719a91543287413597182ce463f15e",
    "be4db7524fd93297c398870117d39422f781aef609bff9e4b2e56ada80f60c4e",
    "cc38c2938444345d7a355871a9c45e0a54df417b568819987c8c715665eff772",
    "77d93ce5e571102f0d22a2780561220be6431ade6ba576b2e3b140a0465be4a7",
    "e1a5e71fcb3201f351e7d7cc9de789157006f93471d4440218bae5eb6b64d7f3",
    "4756bf8d06b98d5429c96e2b3e9506ade39d84ae554485af631c4440e61bb0c1",
    "87d9829fbce6f960d921960d6eff1ba8e882bb7f485f62b4c61f9fbc08e40a54",
    "f9d5b1f2b3834fa24e24277e8ae10a1c3ec5e47367fa71ac4bf4a4f91672268e",
    "45268dd0a18d9aaf3820ba57db679bbb477dd724e96cafd4370547e1a09bc6ac",
    "46d5f1c6fb2993b5cafe0621a1e220bfbe638c0a19044076fac112a4360f6815",
    "ab68a5aa58bb24816f0066100cb090b756eddf13344dc8003be07ba849ffcee5",
    "4ca52321d2bf7ece334de8c2c306f15feaa745a32fd1890b9d3c0193a5f243cd",
    "1743930a7760fddf6441f20f57a1d5d916e86104880c2b13828f57735d2e34d0",
    "742726504ff36181aa9782bfea1121527b248f9df09bc3198bc6e26338cfcad8",
    "71433f47cb5cc034b030317c56f7508145b3135c425fa60e487b44569f0c05e9",
    "f623e7439f1ccf71f371e31ad06bc86858e4a8edd7f5d0dd9e2e1fca7bc493e3",
    "d13bf1031036d7dd692c36968b18633dd51aeca289cb862d1770bf1742620989",
    "23a962cac7f9d4b1ab04a64861ce0d01db4ccf8b90c176feece162e31adaae53",
    "3ac7770f3d8fb9d14ed249db1ddd0e52f3bc1b30ae464f0c0235c9430b72022f",
    "1782ad653b428495c5f70c3191afd9e9a7624c59cd145602367b9bf9987e9459",
    "002736ff3d7ae239fce9b2b4792db1431ca68a6a109b85b75b76bceb24c5caf7",
    "3140a8b220a9ec3635e6018a4053a7dd47f64b9756b7de51b8e80ad0a2803099",
    "84931ac4c9d12297603fc5d295c93e73927edad0a52eb222411b7c0cf78f7142",
    "dcaca3a391282f467e89b4d59c3cc8ddd6a146c885617bf745e52ebdb3f318f1",
    "3703c521491d7fa92cd1ee140a84f20b9bd500b6a85bc7fa01115c2149d3c8c7",
    "9186bae9f529cb923d83a0f7d0b1898bf2aeabc950e2a768eea25bc7a7e403ab",
    "f65e0093cbaad318a51c35bc8a622609b3e857e8658404f738b646c72875d780",
    "7266fba163a8ff9178c95cad6b3afcc03dd9151d69e7870340274aea7442995f",
    "7eda5ca688abff31f84608f409a7622519bbee8963abe0d44cb27c157f8547f7",
    "122f9e790033ea7a72560b0d76456e403949cd000028038a04f36eff022f451a",
    "9f76d7d057b78c4fd9701a54cdb8e242c29e6bd319bb1d81e6095e4534298b6b",
    "8a7df6b46c9792287a1ee97cf41a6b3fa2a666eeb41af888a4bb719f76a6f06f",
    "6493342600182989941dd94fda0375d40e134a9477bf72522f58a26d5074753b",
    "4c8a5dc39cf92bf2301cd266cb1fc4c3016112cd70593cef80bed1186e555357",
    "83009415aec795332ca7cc634932c7a55ac63c846624ba3bbca026d92668c474",
    "9d74bf4f55f9bf76b337e51c35bc8a622609b3e857e8658404f738b646c72875d780",
    "2ad9e954144d80cfabf1147d1ee8e3ee0461b731662949f016132797c960a760",
    "58c9e5afb8262f64770aaaadb00ebfeaee3a1586f04bac447445d5605690d262",
    "09aada0cfb73870aa3b1462f86f4e136bf9060dea62c1d2e47ca259525d5d5ace2"
  ];

  const getEnvCodes = () => {
      // Logic to support environment variables if needed in the future
      const envCodes = (typeof process !== 'undefined' && process.env) 
          ? (process.env.REACT_APP_ACCESS_CODES || process.env.VITE_ACCESS_CODES) 
          : null;
      return envCodes ? envCodes.split(',').map(c => c.trim().toUpperCase()) : [];
  };

  const ENV_CODES = getEnvCodes();

  const handleBack = () => {
      if (step === 'consent') {
          setStep('program');
      } else if (step === 'program') {
          setStep('email');
      } else {
          onBack();
      }
  };

  const handleEmailContinue = () => {
      if (!email.trim() || !email.includes('@')) {
          setError('Please enter a valid email address.');
          return;
      }
      setError('');
      setStep('program');
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const val = raw.slice(0, 9);
    
    let formatted = val;
    if (val.length > 3) {
        formatted = val.slice(0, 3) + '-' + val.slice(3);
    }
    if (val.length > 6) {
        formatted = formatted.slice(0, 7) + '-' + formatted.slice(7);
    }
    
    setProgramCode(formatted);
    setError('');
    setIsVerified(false);
  };

  const handleVerifyCode = async () => {
      if (talkedToResearcher === null) {
          setError('Please answer whether you have spoken to the researcher.');
          return;
      }

      setError('');
      setIsVerifying(true);

      // 1. Calculate Hash of user input
      const inputHash = await sha256(programCode.toUpperCase());

      // Simulate network request delay
      setTimeout(() => {
          // Check: Is Hash in Secure List? OR Is Plain Text in Env Vars?
          // We removed the hardcoded PLAIN_TEXT_CODES array for security.
          const isValid = 
            VALID_HASHES.includes(inputHash) || 
            ENV_CODES.includes(programCode.toUpperCase());

          if (isValid) {
              setIsVerifying(false);
              setIsVerified(true);
              setTimeout(() => {
                  setStep('consent');
              }, 1000);
          } else {
              setIsVerifying(false);
              setError('Invalid Access Code. Please check with your researcher.');
          }
      }, 1500);
  };

  const handleGuestContinue = () => {
      onSignUp('guest', 'common_user');
  };

  const handleSkipToCommon = () => {
      onSignUp('email', 'common_user', undefined, email);
  };

  const handleFinalizeSignUp = () => {
      onSignUp(
          'email', 
          'participant', 
          programCode.toUpperCase(), 
          email, 
          talkedToResearcher ?? false, 
          researchConsent
      );
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-white flex flex-col justify-start items-center" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <div className="max-w-sm w-full animate-fadeIn flex flex-col flex-grow p-6 h-full">
        <div className="flex items-center space-x-4 mb-2 flex-shrink-0">
            <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2" aria-label="Go back">
                <i className="fas fa-arrow-left text-2xl"></i>
                <span className="ml-2 text-lg font-semibold">Back</span>
            </button>
        </div>
        
        {step === 'email' && (
            <div className="flex flex-col flex-grow justify-center items-center animate-fadeIn">
                <div className="text-center mb-8 px-4">
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-envelope text-amber-500 text-3xl"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: "'Source Serif Pro', serif" }}>
                        Enter your Email
                    </h2>
                    <p className="text-gray-500 mt-2">
                        We use this to create your unique username.
                    </p>
                </div>

                <div className="w-full max-w-sm space-y-4">
                    <div className="relative">
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setError(''); }}
                            placeholder="name@example.com"
                            className="w-full px-5 py-4 pl-12 text-lg text-gray-800 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
                        />
                        <i className="fas fa-at absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                    </div>
                    {error && <p className="text-rose-500 text-sm ml-1">{error}</p>}
                    
                    <button 
                        onClick={handleEmailContinue}
                        className="w-full py-4 text-xl font-bold text-white bg-amber-500 rounded-xl shadow-md hover:bg-amber-600 transition-all"
                    >
                        Continue
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <button 
                        onClick={handleGuestContinue}
                        className="text-gray-400 font-semibold hover:text-gray-600 text-sm"
                    >
                        Continue as Guest
                    </button>
                </div>
            </div>
        )}

        {step === 'program' && (
            <div className="flex flex-col h-full animate-fadeIn w-full">
                
                {/* Header Section */}
                <div className="flex-shrink-0 text-center mb-6 pt-2">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-heart text-amber-500 text-3xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 leading-tight" style={{ fontFamily: "'Source Serif Pro', serif" }}>
                        Unlock Family Support Program
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">
                        For University of Auckland research participants.
                    </p>
                </div>

                {/* Form Section */}
                <div className="flex-grow flex flex-col justify-center space-y-6">
                    {/* Code Input */}
                    <div className="bg-amber-50 p-5 rounded-xl border border-amber-200">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Access Code</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={programCode}
                                onChange={handleCodeChange}
                                placeholder="E.G. ZT5-49X-9CV"
                                maxLength={11}
                                className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 uppercase tracking-widest font-mono text-center text-lg placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Researcher Question */}
                    <div className="bg-amber-50 p-5 rounded-xl border border-amber-200">
                        <p className="text-sm font-bold text-gray-700 mb-3 leading-tight">
                            Have you talked to the researcher before signing up for this program?
                        </p>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setTalkedToResearcher(true)}
                                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${talkedToResearcher === true ? 'bg-amber-500 text-white shadow-md' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                            >
                                Yes
                            </button>
                            <button 
                                onClick={() => setTalkedToResearcher(false)}
                                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${talkedToResearcher === false ? 'bg-amber-500 text-white shadow-md' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-rose-500 text-sm font-semibold text-center animate-shake"><i className="fas fa-exclamation-circle mr-1"></i> {error}</p>}
                    
                    {/* Animated Button */}
                    <button 
                        onClick={isVerified ? () => setStep('consent') : handleVerifyCode}
                        disabled={!programCode || talkedToResearcher === null || isVerifying}
                        className={`w-full py-4 font-bold rounded-xl shadow-md transition-all duration-300 flex items-center justify-center
                            ${isVerified 
                                ? 'bg-green-500 text-white hover:bg-green-600' 
                                : 'bg-amber-500 text-white hover:bg-amber-600'} 
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isVerifying ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </>
                        ) : isVerified ? (
                            <>
                                <i className="fas fa-check-circle mr-2 text-xl"></i>
                                Verified (Continue)
                            </>
                        ) : (
                            'Join Program'
                        )}
                    </button>
                </div>

                {/* Footer Section */}
                <div className="flex-shrink-0 w-full text-center mt-4 pb-4">
                    <p className="text-sm text-gray-500 mb-4">- OR -</p>
                    <button 
                        onClick={handleSkipToCommon}
                        className="text-gray-400 font-semibold hover:text-gray-600 text-sm"
                    >
                        Continue as Guest
                    </button>
                </div>
            </div>
        )}

        {step === 'consent' && (
            <div className="flex flex-col h-full animate-fadeIn w-full">
                {/* Header Section */}
                <div className="flex-shrink-0 text-center mb-2 pt-0">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <i className="fas fa-shield-alt text-amber-500 text-2xl"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 leading-tight" style={{ fontFamily: "'Source Serif Pro', serif" }}>
                        Research Consent
                    </h2>
                </div>

                {/* Content Section - Compacted for Viewport Fit */}
                <div className="flex-grow flex flex-col justify-center">
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm">
                        <p className="text-sm md:text-base text-gray-700 leading-snug mb-4 text-justify" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                            I agree to share my demographic information with University of Auckland researchers via email after completing the program to help improve speech and language support for children with hearing loss. I agree to actively interact with my child during selected activities and spend quality time with them. I understand that I must provide accurate timepoint data, as inaccurate data may affect the research results. All information will be kept confidential and used only for research purposes.
                        </p>
                        
                        <div 
                            className="flex items-center p-3 bg-white rounded-lg border border-amber-100 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm" 
                            onClick={() => setResearchConsent(!researchConsent)}
                        >
                            <div className={`w-5 h-5 flex-shrink-0 rounded border mr-3 flex items-center justify-center transition-colors ${researchConsent ? 'bg-amber-500 border-amber-500' : 'border-gray-300'}`}>
                                {researchConsent && <i className="fas fa-check text-white text-xs"></i>}
                            </div>
                            <span className="text-sm md:text-base font-bold text-gray-700 select-none" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>I agree to participate</span>
                        </div>
                    </div>
                    
                    {/* Action Button */}
                    <button 
                        onClick={handleFinalizeSignUp}
                        disabled={!researchConsent}
                        className={`w-full mt-6 py-3.5 font-bold text-lg rounded-xl shadow-md transition-all duration-300 flex items-center justify-center
                            ${researchConsent 
                                ? 'bg-amber-500 text-white hover:bg-amber-600' 
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'} 
                        `}
                        style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                    >
                        Complete Registration
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
