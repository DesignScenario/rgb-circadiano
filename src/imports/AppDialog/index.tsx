export default function AppDialog() {
  return (
    <div className="bg-[#252525] relative rounded-[9px] size-full" data-name="app/dialog">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[28px] items-center px-[24px] py-[36px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white w-[247px]">
            <p className="leading-[normal]">Ao ativar a iluminação circadiana, defina a tonalidade mais quente e a mais fria</p>
          </div>
          <div className="cursor-pointer h-[32px] relative rounded-[4px] shrink-0 w-[161px]" data-name="app/botão/médio">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center justify-center px-[12px] relative size-full">
                <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] min-w-px overflow-hidden relative text-[14px] text-center text-ellipsis text-white">
                  <p className="leading-[normal]">OK</p>
                </div>
              </div>
            </div>
            <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[4px]" />
          </div>
        </div>
      </div>
    </div>
  );
}