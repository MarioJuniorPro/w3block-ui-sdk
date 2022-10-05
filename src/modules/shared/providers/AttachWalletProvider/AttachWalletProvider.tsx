import { createContext, ReactNode, useState } from 'react';

import { AttachWalletModal } from '../../components/AttachWalletModal';

interface AttachWalletProviderProps {
  setAttachModal: (bol: boolean) => void;
  attachModal: boolean;
}

export const AttachWalletContext = createContext<AttachWalletProviderProps>({
  attachModal: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAttachModal: () => {},
});

export const AttachWalletProvider = ({ children }: { children: ReactNode }) => {
  const [attachModal, setAttachModal] = useState<boolean>(false);
  return (
    <AttachWalletContext.Provider value={{ setAttachModal, attachModal }}>
      {children}
      <AttachWalletModal />
    </AttachWalletContext.Provider>
  );
};
