import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';

import { ReactComponent as CircleCheck } from '../../../shared/assets/icons/checkCircledOutlined.svg';
import { ReactComponent as CopyIcon } from '../../../shared/assets/icons/copyIcon.svg';
import { HelpCircleOutlinedSVG } from '../../../shared/assets/icons/HelpCircleOutlined';
import { UploadIconSVG } from '../../../shared/assets/icons/UploadIcon';
import { Alert } from '../../../shared/components/Alert';
import { WeblockButton } from '../../../shared/components/WeblockButton/WeblockButton';
import { PixwayAppRoutes } from '../../../shared/enums/PixwayAppRoutes';
import useRouter from '../../../shared/hooks/useRouter';
import useTranslation from '../../../shared/hooks/useTranslation';
import { useUserWallet } from '../../../shared/hooks/useUserWallet';
export const AddFundsManualContainer = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [translate] = useTranslation();
  const { wallet } = useUserWallet();
  const router = useRouter();
  const [_, setCopy] = useCopyToClipboard();

  const copyAddress = () => {
    setCopied(true);
    setCopy(wallet?.address || '');
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <div className="pw-flex pw-justify-center">
      <div className="lg:pw-max-w-[550px]">
        <p className="pw-font-montserrat pw-font-[700] pw-text-[18px]">
          {translate('wallet>page>addFunds')}
        </p>
        <div className="pw-flex pw-items-center pw-gap-x-2 pw-mt-4">
          <UploadIconSVG color="#383857" />
          <p className="pw-font-[700] pw-font-montserrat pw-text-[18px] pw-text-[#35394C]">
            {translate('checkout>components>checkoutInfo>payment')}
          </p>
        </div>
        <p className="pw-font-[700] pw-text-[24px] pw-font-montserrat">
          {translate('addFunds>type>manualType')}
        </p>
        <p className="pw-text-[#353945] pw-text-[15px] pw-mt-4 pw-font-montserrat pw-font-[600]">
          {translate('addFunds>type>manual>instruction')}
        </p>
        <div className="pw-flex pw-items-center pw-mt-4">
          <p className="pw-text-[#353945] pw-text-sm pw-font-montserrat pw-font-[600]">
            {translate('addFunds>type>manual>walletAddress')}
          </p>
          <HelpCircleOutlinedSVG />
        </div>
        <div className="pw-border pw-border-brand-primary pw-flex pw-items-center pw-justify-between pw-rounded-xl pw-px-3 pw-py-4 pw-mt-2">
          <p className="pw-font-montserrat pw-text-[13px] pw-text-[#353945]">
            {wallet?.address || ''}
          </p>
          <CopyIcon className="cursor-pointer" onClick={copyAddress} />
        </div>
        {copied ? (
          <div className="pw-flex pw-items-center pw-mt-2 pw-gap-x-2">
            <CircleCheck className="pw-stroke-brand-primary pw-w-[14px] pw-h-[14px]" />
            <p className="pw-font-montserrat pw-text-sm pw-text-[#353945]">
              {translate('addFunds>type>manual>successCopy')}
            </p>
          </div>
        ) : null}
        <Alert className="pw-mt-4" variant="atention">
          <div className="pw-flex pw-gap-x-3 w-full">
            <Alert.Icon></Alert.Icon>
            <div className="pw-flex-1">
              <p>{translate('addFunds>type>manual>atention')}!</p>
              <p>{translate('addFunds>type>manual>onlyETHOrMatic')}</p>
              <p className="pw-font-montserrat pw-font-[400] pw-text-sm pw-text-[#353945]">
                {translate('addFunds>type>manual>loseFunds')}
              </p>
            </div>

            <div className="pw-rounded-full pw-flex pw-justify-center pw-items-center pw-w-[18px] pw-h-[18px] pw-text-xs pw-text-[#ED4971] pw-border pw-border-[#ED4971]">
              x
            </div>
          </div>
        </Alert>
        <WeblockButton
          onClick={() => router.push(PixwayAppRoutes.ADD_FUNDS_TYPE)}
          className="pw-text-white pw-mt-4"
        >
          {translate('shared>back')}
        </WeblockButton>
      </div>
    </div>
  );
};