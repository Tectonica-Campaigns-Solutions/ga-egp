import React, { createContext, useState } from 'react';

const HUBSPOT_STEPS_EMPTY = {
  step: 0,
  email: null,
  handleChangeEmail: (newEmail) => {},
  handleChangeStep: (newStep) => {},
  resetState: () => {},
};

export const HubspotStepsContext = createContext(HUBSPOT_STEPS_EMPTY);

const HubspotStepsProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState(null);

  const handleChangeEmail = (newEmail) => setEmail(newEmail);
  const handleChangeStep = (newStep) => setStep(newStep);

  const resetState = () => {
    setStep(0);
    setEmail(null);
  };

  return (
    <HubspotStepsContext.Provider value={{ step, email, handleChangeEmail, handleChangeStep, resetState }}>
      {children}
    </HubspotStepsContext.Provider>
  );
};

export default HubspotStepsProvider;
