import React from "react";

function CreditCard({ values, handleInput, errors }) {
  const formatCreditCardNumber = (input) => {
    const numericValue = input.replace(/\D/g, "");

    return numericValue.replace(/(\d{4})/g, "$1 ").trim();
  };

  const formatExpiryDate = (input) => {
    return input.replace(/\D/g, "").replace(/(\d{2})(\d{2})/, "$1/$2");
  };

  const formatCvcCvv = (input) => {
    return input.replace(/\D/g, "").substring(0, 3);
  };

  return (
    <div>
      <div>
        <div className="xl:flex w-full mt-[40px] gap-[8px]">
          <div className="w-full">
            <div className="h-[24px] my-[12px] xl:my-auto text-[12px] md:text-[16px] font-[500] leading-[24px]">
              Card Number*
            </div>
            <div
              className={
                errors.cardNumber
                  ? "bg-white my-[8px] p-[4px] xl:w-full flex items-center border border-red-400 rounded-[8px]"
                  : "bg-white my-[8px] p-[4px] xl:w-full flex items-center border order-x-slate-400 rounded-[8px]"
              }
            >
              <input
                onChange={handleInput}
                value={formatCreditCardNumber(values.cardNumber)}
                id="cardNumber"
                name="cardNumber"
                type="text"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                maxLength="19"
                className="p-[4px] px-[8px] w-full text-[12px] md:text-[16px] font-[500] leading-[24px] border-none focus:ring-0"
              />
              {errors.cardNumber && (
                <span className="flex flex-col justify-start items-center text-[13px] text-white bg-red-600 w-[18px] h-[18px] rounded-full">
                  &#33;
                </span>
              )}
            </div>
            {errors.cardNumber && (
              <small className="text-[#e74c3c]">{errors.cardNumber}</small>
            )}
          </div>

          <div className="w-full">
            <div className="h-[24px] mt-[40px] my-[12px] xl:my-auto text-[12px] md:text-[16px] font-[500] leading-[24px] ">
              Card Owner*
            </div>
            <div
              className={
                errors.cardNumber
                  ? "bg-white my-[8px] p-[4px] xl:w-full flex items-center border border-red-400 rounded-[8px]"
                  : "bg-white my-[8px] p-[4px] xl:w-full flex items-center border order-x-slate-400 rounded-[8px]"
              }
            >
              <input
                onChange={handleInput}
                value={values.cardOwner}
                id="cardOwner"
                name="cardOwner"
                type="text"
                placeholder="Card ownder name"
                className="p-[4px] px-[8px] w-full text-[12px] md:text-[16px] font-[500] leading-[24px] border-none focus:ring-0"
              />
              {errors.cardNumber && (
                <span className="flex flex-col justify-start items-center text-[13px] text-white bg-red-600 w-[18px] h-[18px] rounded-full">
                  &#33;
                </span>
              )}
            </div>
            {errors.cardOwner && (
              <small className="text-[#e74c3c]">{errors.cardOwner}</small>
            )}
          </div>
        </div>

        <div className="xl:flex w-full mt-[40px] gap-[8px]">
          <div className="w-full">
            <div className="h-[24px] my-[12px] xl:my-auto text-[12px] md:text-[16px] font-[500] leading-[24px]">
              Expiry Date*
            </div>
            <div
              className={
                errors.cardNumber
                  ? "bg-white my-[8px] p-[4px] xl:w-full flex items-center border border-red-400 rounded-[8px]"
                  : "bg-white my-[8px] p-[4px] xl:w-full flex items-center border order-x-slate-400 rounded-[8px]"
              }
            >
              <input
                onChange={handleInput}
                value={formatExpiryDate(values.expiryDate)}
                id="expiryDate"
                name="expiryDate"
                type="text"
                placeholder="MM/YY"
                maxLength="5"
                className="p-[4px] px-[8px] w-full text-[12px] md:text-[16px] font-[500] leading-[24px] border-none focus:ring-0"
              />
              {errors.cardNumber && (
                <span className="flex flex-col justify-start items-center text-[13px] text-white bg-red-600 w-[18px] h-[18px] rounded-full">
                  &#33;
                </span>
              )}
            </div>
            {errors.expiryDate && (
              <small className="text-[#e74c3c]">{errors.expiryDate}</small>
            )}
          </div>

          <div className="w-full">
            <div className="h-[24px] mt-[40px] my-[12px] xl:my-auto text-[12px] md:text-[16px] font-[500] leading-[24px] ">
              CVC/CVV*
            </div>
            <div
              className={
                errors.cardNumber
                  ? "bg-white my-[8px] p-[4px] xl:w-full flex items-center border border-red-400 rounded-[8px]"
                  : "bg-white my-[8px] p-[4px] xl:w-full flex items-center border order-x-slate-400 rounded-[8px]"
              }
            >
              <input
                onChange={handleInput}
                value={formatCvcCvv(values.cvccvv)}
                id="cvccvv"
                name="cvccvv"
                type="text"
                placeholder="xxx"
                className="p-[4px] px-[8px] w-full text-[12px] md:text-[16px] font-[500] leading-[24px] border-none focus:ring-0"
              />
              {errors.cardNumber && (
                <span className="flex flex-col justify-start items-center text-[13px] text-white bg-red-600 w-[18px] h-[18px] rounded-full">
                  &#33;
                </span>
              )}
            </div>
            {errors.cvccvv && (
              <small className="text-[#e74c3c]">{errors.cvccvv}</small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditCard;
