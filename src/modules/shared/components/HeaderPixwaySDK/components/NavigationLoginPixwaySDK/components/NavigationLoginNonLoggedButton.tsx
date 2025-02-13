import { useState } from 'react';

import { ReactComponent as ArrowDown } from '../../../../../assets/icons/arrowDown.svg';
import { PixwayAppRoutes } from '../../../../../enums/PixwayAppRoutes';
import useRouter from '../../../../../hooks/useRouter';
import useTranslation from '../../../../../hooks/useTranslation';
import { PixwayButton } from '../../../../PixwayButton';

interface NavigationLoginNonLoggedButtonProps {
  signInRoute?: string;
  signUpRoute?: string;
}

export const NavigationLoginNonLoggedButton = ({
  signInRoute = PixwayAppRoutes.SIGN_IN,
  signUpRoute = PixwayAppRoutes.SIGN_UP,
}: NavigationLoginNonLoggedButtonProps) => {
  const [translate] = useTranslation();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <div className="pw-hidden sm:pw-block">
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className="pw-ml-5 pw-cursor-pointer"
      >
        <p className="pw-font-montserrat pw-font-[400] pw-text-xs">Login</p>
        <div className="pw-flex pw-items-center pw-gap-x-1">
          <p className="pw-text-sm pw-font-[600] pw-font-montserrat">
            {translate('shared>myAcount')}
          </p>
          <ArrowDown />
        </div>
      </div>
      {openMenu ? (
        <div className="pw-relative">
          <div className="pw-absolute pw-mt-6 pw-bg-white pw-w-[140px] pw-z-30 pw-px-[10px] pw-py-3 pw-rounded-b-[20px] pw-shadow-md">
            <PixwayButton
              onClick={() => router.push(signInRoute)}
              fullWidth
              className="!pw-bg-brand-primary !pw-text-white !pw-text-xs !pw-py-[9px] pw-rounded-[48px] pw-shadow-[0px_2px_4px_rgba(0,0,0,0.26)]"
            >
              {translate('shared>login')}
            </PixwayButton>
            <PixwayButton
              onClick={() => router.push(signUpRoute)}
              fullWidth
              className="!pw-bg-[#EFEFEF] !pw-text-black !pw-text-xs !pw-py-[9px] pw-rounded-[48px] !pw-outline-1 !pw-border-[#DCDCDC] !pw-border-1 pw-mt-[6px]"
            >
              {translate('shared>register')}
            </PixwayButton>
          </div>
        </div>
      ) : null}
    </div>
  );
};
