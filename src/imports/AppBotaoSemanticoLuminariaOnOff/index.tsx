type AppBotaoSemanticoLuminariaOnOffProps = {
  className?: string;
  estado?: boolean;
};

export default function AppBotaoSemanticoLuminariaOnOff({ className, estado = false }: AppBotaoSemanticoLuminariaOnOffProps) {
  const isEstado = estado;
  return (
    <button className={className || "h-[23px] relative w-[331px]"}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center py-[5px] relative size-full">
          <div className={`flex-[1_0_0] h-[13px] min-w-px relative rounded-[4px] ${isEstado ? "bg-[#fc3]" : ""}`} data-name="app/botão/extra-pequeno">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center justify-center px-[12px] relative size-full">
                <div className={`[word-break:break-word] flex flex-[1_0_0] flex-col font-["Montserrat:SemiBold",sans-serif] font-semibold justify-center leading-[0] min-w-px overflow-hidden relative text-[10px] text-center text-ellipsis ${isEstado ? "text-black" : "text-white"}`}>
                  <p className="leading-[normal]">{isEstado ? "ON" : "OFF"}</p>
                </div>
              </div>
            </div>
            <div aria-hidden className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${isEstado ? "border-[#fc3]" : "border-white"}`} />
          </div>
        </div>
      </div>
    </button>
  );
}