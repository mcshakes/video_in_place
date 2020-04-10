import React from "react";

const TwilioContext = React.createContext(null);

const TwilioVideoProvider = ({ children, value }) => {
    return <TwilioContext.Provider value={value}>{children}</TwilioContext.Provider>;
}

const TwilioVideoConsumer = TwilioContext.Consumer

export { TwilioVideoProvider, TwilioVideoConsumer }