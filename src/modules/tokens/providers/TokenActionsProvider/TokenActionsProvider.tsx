import { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CertificateIssuanceController } from '../../../shared/components/CertificateIssuanceController';
import { useModalController } from '../../../shared/hooks/useModalController';
import { TokenTransferController } from '../../components/TokenTransferController';
import {
  ITokenActionContext,
  TokenActionsContext,
} from '../../contexts/TokenActionsContext';
import { usePublicTokenData } from '../../hooks/usePublicTokenData';

interface Props {
  children?: ReactNode;
  collectionId: string;
  collectionName: string;
  imageSrc: string;
  contractAddress: string;
  name: string;
  chainId: number;
  tokenId: string;
}

export const TokenActionsProvider = ({
  children,
  collectionId,
  collectionName,
  imageSrc,
  contractAddress,
  name,
  chainId,
  tokenId,
}: Props) => {
  const [translate] = useTranslation();
  const { data: publicTokenResponse } = usePublicTokenData({
    chainId: chainId.toString(),
    tokenId,
    contractAddress,
  });
  const {
    isOpen: isOpenTransferModal,
    openModal: openTransferModal,
    closeModal: closeTransferModal,
  } = useModalController();

  const {
    isOpen: isOpenCertificateModal,
    openModal: openCertificateModal,
    closeModal: closeCertificateModal,
  } = useModalController();

  const value = useMemo<ITokenActionContext>(
    () => [
      {
        id: 'Transferir',
        label: translate('tokens>tokenTransferController>transfer'),
        disabled: true,
        onClick: () => {
          openTransferModal();
        },
      },
      {
        id: 'Certificado',
        label: translate('tokens>tokenCardActions>certificate'),
        disabled: false,
        onClick: () => {
          openCertificateModal();
        },
      },
    ],
    [openTransferModal, openCertificateModal, translate]
  );
  return (
    <TokenActionsContext.Provider value={value}>
      {children}
      <TokenTransferController
        isOpen={isOpenTransferModal}
        onClose={closeTransferModal}
        collectionName={collectionName}
        imageSrc={imageSrc}
        tokens={[
          {
            id: collectionId,
            number: '1',
          },
        ]}
      />
      <CertificateIssuanceController
        isOpen={isOpenCertificateModal}
        onClose={closeCertificateModal}
        transactionHash={publicTokenResponse?.data.edition.mintedHash ?? ''}
        contractAddress={contractAddress}
        name={name}
        image={imageSrc}
        description={publicTokenResponse?.data.information.description ?? ''}
        originalOwnerWalletAddress={
          publicTokenResponse?.data.token?.firstOwnerAddress ?? ''
        }
        chainId={chainId}
        tokenId={tokenId}
      />
    </TokenActionsContext.Provider>
  );
};
