import React from 'react'

const Choose = () => {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-[calc(50%+53px)] flex flex-col items-start justify-start gap-[2px]">
    <div className="flex flex-col items-start justify-start py-[6px] px-[19px] bg-[#fff] rounded-tl-[6px] rounded-tr-[6px] rounded-br-0 rounded-bl-0 overflow-hidden">
      <div className="flex flex-row items-start justify-start gap-[13px]">
        <div className="flex flex-col items-center justify-center">
          <div className="text-[10px] font-['Poppins'] font-semibold text-[#060606] whitespace-nowrap">Buy</div>
        </div>
        <div className="flex flex-col items-center justify-center gap-[3px]">
          <div className="text-[10px] font-['Poppins'] font-semibold text-[#0c8ce9] whitespace-nowrap">Rent</div>
          <div className="w-[19px] h-0 shrink-0 border-[1px] border-dashed border-[#0c8ce9]"></div>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-start justify-start py-[11px] px-[22px] bg-[#fff] rounded-tl-0 rounded-tr-[6px] rounded-br-[6px] overflow-hidden">
      <div className="flex flex-row items-center justify-start gap-[55px]">
        <div className="flex flex-col items-start justify-start gap-[4px]">
          <div className="text-[16px] font-['Poppins'] font-semibold text-[#060606] whitespace-nowrap">Property</div>
          <div className="flex flex-row items-center justify-center gap-[6px]">
            <div className="text-[10px] font-['Poppins'] text-[#8f8f8f] whitespace-nowrap">Select your city</div>
            <img width="9" height="9" src="chevron-downI15_2258;1_38.png"></img>
          </div>
        </div>
        <img width="0" height="46" src="Line 115_2259.png"></img>
        <div className="flex flex-col items-start justify-start gap-[4px]">
          <div className="text-[16px] font-['Poppins'] font-semibold text-[#060606] whitespace-nowrap">Property Type</div>
          <div className="flex flex-row items-center justify-center gap-[6px]">
            <div className="text-[10px] font-['Poppins'] text-[#8f8f8f] whitespace-nowrap">Select property type</div>
            <img width="9" height="9" src="chevron-downI15_2260;1_38.png"></img>
          </div>
        </div>
        <img width="0" height="46" src="Line 415_2261.png"></img>
        <div className="flex flex-col items-start justify-start gap-[4px]">
          <div className="text-[16px] font-['Poppins'] font-semibold text-[#060606] whitespace-nowrap">Budget</div>
          <div className="flex flex-row items-center justify-center gap-[6px]">
            <div className="text-[10px] font-['Poppins'] text-[#8f8f8f] whitespace-nowrap">Select price range</div>
            <img width="9" height="9" src="chevron-downI15_2262;1_38.png"></img>
          </div>
        </div>
        <img width="0" height="46" src="Line 515_2263.png"></img>
        <div className="flex flex-row items-center justify-center py-[9px] px-[28px] bg-[#0c8ce9] rounded-[6px] overflow-hidden">
          <div className="text-[12px] font-['Poppins'] text-[#fff] whitespace-nowrap">Get Started</div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Choose