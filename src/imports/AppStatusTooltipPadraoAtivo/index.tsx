import svgPaths from "./svg-5pg3vbpve1";

export default function AppStatusTooltipPadraoAtivo() {
  return (
    <div className="relative size-full" data-name="app/status/tooltip-padrão/ativo">
      <div className="absolute inset-[65.56%_13.95%_0_13.95%]" data-name="área_toque">
        <svg className="absolute block inset-0 size-full" fill="none" height="31" preserveAspectRatio="none" viewBox="0 0 31 31" width="31">
          <path d={svgPaths.p3f61f4f0} fill="#707070" fillOpacity="0.75" id="Ã¡rea_toque" />
        </svg>
      </div>
      <div className="absolute inset-[75.56%_34.88%_10%_34.88%]" data-name="thumb">
        <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 13 13" width="13">
          <circle cx="6.5" cy="6.5" fill="#FFCC33" id="thumb" r="6.5" />
        </svg>
      </div>
      <div className="absolute drop-shadow-[0px_4px_3px_rgba(0,0,0,0.35)] inset-[0_0_44.44%_0]" data-name="app/ícone/tooltip">
        <div className="absolute inset-[0_0_-0.1%_0]" data-name="Union">
          <svg className="absolute block inset-0 size-full" fill="none" height="50.0498" preserveAspectRatio="none" viewBox="0 0 43 50.0498" width="43">
            <path d={svgPaths.p66e68f0} fill="#707070" fillOpacity="0.75" id="Union" />
          </svg>
        </div>
      </div>
      <div className="[word-break:break-word] absolute flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold inset-[12.22%_13.95%_65.56%_13.95%] justify-center leading-[0] text-[16px] text-center text-white">
        <p className="leading-[normal]">100</p>
      </div>
    </div>
  );
}