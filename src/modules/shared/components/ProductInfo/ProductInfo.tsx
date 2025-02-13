import { CheckoutStatus } from '../../../checkout';
import { ReactComponent as Loading } from '../../assets/icons/loading.svg';
import useTranslation from '../../hooks/useTranslation';
import { Shimmer } from '../Shimmer';
interface ProductInfoProps {
  status?: CheckoutStatus;
  image: string;
  name: string;
  id: string;
  price: string;
  className?: string;
  loading?: boolean;
}

export const ProductInfo = ({
  image,
  name,
  id,
  status,
  price,
  className,
  loading = false,
}: ProductInfoProps) => {
  const [translate] = useTranslation();
  const StatusToShow = () => {
    switch (status) {
      case CheckoutStatus.FINISHED:
        return (
          <div className="pw-flex pw-items-center pw-justify-end pw-gap-x-2 -pw-mb-[2px]">
            <p className="pw-text-sm pw-text-[#295BA6] pw-font-[600]">
              {translate('shared>processing')}
            </p>
            <Loading className="pw-animate-spin" />
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div
      className={`pw-w-full pw-px-2 pw-py-3 pw-flex pw-justify-between pw-items-center pw-border pw-border-[rgba(0,0,0,0.2)] pw-rounded-2xl ${className}`}
    >
      <div className="pw-flex pw-items-center">
        {loading ? (
          <Shimmer className="!pw-w-[48px] !pw-h-[48px] pw-rounded-lg " />
        ) : (
          <div className="pw-w-[48px] pw-h-[48px] pw-rounded-lg pw-overflow-hidden">
            <img
              className="pw-w-[48px] pw-h-[48px] pw-rounded-lg pw-object-cover"
              src={image}
            />
          </div>
        )}

        <div className="pw-ml-3 pw-flex pw-w-full pw-flex-col pw-flex-1 pw-overflow-hidden">
          {loading ? (
            <>
              <Shimmer className="pw-mb-1 pw-w-[120px]" />{' '}
              <Shimmer className="pw-mb-1 pw-w-[190px]" />
            </>
          ) : (
            <>
              <p className="pw-font-[600] pw-text-sm pw-text-[#353945]">
                {name}
              </p>
              <p className="pw-font-[600] pw-max-w-[130px] sm:pw-max-w-full pw-text-xs pw-text-[#353945] pw-truncate">
                {id}
              </p>
            </>
          )}
        </div>
      </div>
      {loading ? (
        <Shimmer className="pw-w-[80px] pw-h-6" />
      ) : (
        <div className="pw-fle pw-flex-col">
          <StatusToShow />
          <p className="pw-font-[700] pw-text-[#35394C] pw-text-lg pw-text-right">
            R${price}
          </p>
        </div>
      )}
    </div>
  );
};
