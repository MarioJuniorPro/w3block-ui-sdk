import { WalletTokenCard } from '../WalletTokenCard';

export const TokenListTemplateSkeleton = () => (
  <div className="pw-flex-1">
    <ul className="pw-grid pw-grid-cols-1 sm:pw-grid-cols-3 pw-gap-x-[41px] pw-gap-y-[30px]">
      {new Array(6).fill(undefined).map((_, index) => (
        <li className="pw-flex pw-items-stretch pw-w-full" key={index}>
          <WalletTokenCard.Skeleton />
        </li>
      ))}
    </ul>
  </div>
);
