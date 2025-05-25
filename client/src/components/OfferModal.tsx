"use client";

import React, { useState } from "react";
import Modal from "./modal";
import { Currency } from "@/utils/constants";

interface OfferTaskModalProps {
  isOpen: boolean;
  onClose: (fetch?: boolean) => void;
  initialRate?: number;
  initialCurrency?: Currency;
  onSubmit: (rate: number, currency: Currency) => void;
}

const OfferTaskModal: React.FC<OfferTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [rate, setRate] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>(Currency.INR);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Offer for Task"
      showFooter={false}
      height="fit-content"
    >
      <form className="w-full flex flex-col gap-4 px-4 py-2">
        <div>
          <label className="block text-sm font-medium">Hourly Rate</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
            placeholder="Enter hourly rate"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="outline-none mt-1 w-full border rounded px-3 py-2 text-sm"
          >
            {Object.keys(Currency)
              .filter((key) => isNaN(Number(key)))
              .map((key) => (
                <option
                  key={key}
                  value={Currency[key as keyof typeof Currency]}
                >
                  {key}
                </option>
              ))}
          </select>
        </div>
      </form>
      <div className="w-full flex justify-between px-4 pb-3 mt-6">
        <button
          onClick={() => onClose()}
          className="bg-white border rounded px-4 py-1 hover:bg-gray-100 text-sm cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() => onSubmit(rate, currency)}
          className="bg-teal-600 font-bold text-white rounded px-4 py-1 hover:bg-teal-600 text-sm cursor-pointer"
        >
          Offer Task
        </button>
      </div>
    </Modal>
  );
};

export default OfferTaskModal;
