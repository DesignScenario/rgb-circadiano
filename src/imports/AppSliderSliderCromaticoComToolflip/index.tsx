import svgPaths from "./svg-mfat5fkc79";
type AppSliderSliderCromaticoComToolflipProps = {
  className?: string;
  cor?: "branco" | "cor-de-rosa-1" | "magenta-1" | "violeta-1" | "azul-1" | "azul-celeste-1" | "ciano-1" | "verde-azulado-1" | "verde-1" | "verde-limão-1" | "amarelo-1" | "laranja-1" | "vermelho" | "laranja-2" | "amarelo-2" | "verde-limão-2" | "verde-2" | "verde-azulado-2" | "cinao-2" | "azul-celeste-2" | "azul-2" | "violeta-2" | "magenta-2" | "cor-de-rosa-2";
};

export default function AppSliderSliderCromaticoComToolflip({ className, cor = "branco" }: AppSliderSliderCromaticoComToolflipProps) {
  const isAmarelo1OrAmarelo2 = ["amarelo-1", "amarelo-2"].includes(cor);
  const isAzul1OrAzul2 = ["azul-1", "azul-2"].includes(cor);
  const isAzulCeleste1OrAzulCeleste2 = ["azul-celeste-1", "azul-celeste-2"].includes(cor);
  const isCiano1OrCinao2 = ["ciano-1", "cinao-2"].includes(cor);
  const isCorDeRosa1OrCorDeRosa2 = ["cor-de-rosa-1", "cor-de-rosa-2"].includes(cor);
  const isLaranja1OrLaranja2 = ["laranja-1", "laranja-2"].includes(cor);
  const isMagenta1OrMagenta2 = ["magenta-1", "magenta-2"].includes(cor);
  const isVerde1OrVerde2 = ["verde-1", "verde-2"].includes(cor);
  const isVerdeAzulado1OrVerdeAzulado2 = ["verde-azulado-1", "verde-azulado-2"].includes(cor);
  const isVerdeLimao1OrVerdeLimao2 = ["verde-limão-1", "verde-limão-2"].includes(cor);
  const isVermelho = cor === "vermelho";
  const isVioleta1OrVioleta2 = ["violeta-1", "violeta-2"].includes(cor);
  return (
    <div className={className || "h-[90px] relative w-[361px]"}>
      <div className={`absolute ${cor === "azul-1" ? "-translate-y-1/2 h-[13px] left-[15px] right-[15px] top-[calc(50%+29.5px)]" : "inset-[75.56%_15px_10%_15px]"}`} data-name="app/slider/cromático">
        <div className="-translate-y-1/2 absolute h-[3px] left-0 overflow-clip right-0 rounded-[1.5px] top-1/2" style={{ backgroundImage: "linear-gradient(90.00000000337089deg, rgb(255, 0, 128) 8%, rgb(255, 0, 255) 17%, rgb(127, 0, 255) 25%, rgb(0, 0, 255) 33%, rgb(0, 127, 255) 42%, rgb(0, 255, 255) 50%, rgb(0, 255, 127) 58%, rgb(0, 255, 0) 67%, rgb(127, 255, 0) 75%, rgb(255, 255, 0) 83%, rgb(255, 127, 0) 92%, rgb(255, 0, 0) 100%)" }} data-name="linha">
          <div className="-translate-y-1/2 absolute h-[3px] left-0 top-1/2 w-[13px]" data-name="branco">
            <svg className="absolute block inset-0 size-full" fill="none" height="3" preserveAspectRatio="none" viewBox="0 0 13 3" width="13">
              <path d="M0 0H13V3H0V0Z" fill="white" id="branco" />
            </svg>
          </div>
        </div>
      </div>
      <div className={`absolute ${isVermelho ? "inset-[0_0_0_88.09%]" : isLaranja1OrLaranja2 ? "inset-[0_4.16%_0_83.93%]" : isAmarelo1OrAmarelo2 ? "inset-[0_12.19%_0_75.9%]" : isVerdeLimao1OrVerdeLimao2 ? "inset-[0_19.94%_0_68.14%]" : isVerde1OrVerde2 ? "inset-[0_28.25%_0_59.83%]" : isVerdeAzulado1OrVerdeAzulado2 ? "inset-[0_36.29%_0_51.8%]" : isCiano1OrCinao2 ? "inset-[0_44.6%_0_43.49%]" : isAzulCeleste1OrAzulCeleste2 ? "inset-[0_52.91%_0_35.18%]" : isAzul1OrAzul2 ? "inset-[0_61.22%_0_26.87%]" : isVioleta1OrVioleta2 ? "inset-[0_69.53%_0_18.56%]" : isMagenta1OrMagenta2 ? "inset-[0_77.84%_0_10.25%]" : isCorDeRosa1OrCorDeRosa2 ? "inset-[0_84.21%_0_3.88%]" : "inset-[0_88.09%_0_0]"}`} data-name="app/status/tooltip-rgb/ativo">
        <div className="absolute inset-[65.56%_13.95%_0_13.95%]" data-name="área de toque">
          <svg className="absolute block inset-0 size-full" fill="none" height="31" preserveAspectRatio="none" viewBox="0 0 31 31" width="31">
            <circle cx="15.5" cy="15.5" fill="#707070" fillOpacity="0.75" id="Ã¡rea de toque" r="15.5" />
          </svg>
        </div>
        <div className="absolute inset-[75.56%_34.88%_10%_34.88%]" data-name="thumb">
          <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 13 13" width="13">
            <circle cx="6.5" cy="6.5" fill={isVermelho ? "#FF0000" : isLaranja1OrLaranja2 ? "#FF7F00" : isAmarelo1OrAmarelo2 ? "#FFFF00" : isVerdeLimao1OrVerdeLimao2 ? "#7FFF00" : isVerde1OrVerde2 ? "#00FF00" : isVerdeAzulado1OrVerdeAzulado2 ? "#00FF7F" : isCiano1OrCinao2 ? "#00FFFF" : isAzulCeleste1OrAzulCeleste2 ? "#007FFF" : isAzul1OrAzul2 ? "#0000FF" : isVioleta1OrVioleta2 ? "#7F00FF" : isMagenta1OrMagenta2 ? "#FF00FF" : isCorDeRosa1OrCorDeRosa2 ? "#FF0080" : "white"} id="thumb" r="5.75" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="absolute drop-shadow-[0px_4px_3px_rgba(0,0,0,0.35)] inset-[0_0_44.44%_0]" data-name="app/ícone/tooltip">
          <div className="absolute inset-[0_0_-0.1%_0]" data-name="Union">
            <svg className="absolute block inset-0 size-full" fill="none" height="50.0498" preserveAspectRatio="none" viewBox="0 0 43 50.0498" width="43">
              <path d={svgPaths.p66e68f0} fill={isVermelho ? "#FF0000" : isLaranja1OrLaranja2 ? "#FF7F00" : isAmarelo1OrAmarelo2 ? "#FFFF00" : isVerdeLimao1OrVerdeLimao2 ? "#7FFF00" : isVerde1OrVerde2 ? "#00FF00" : isVerdeAzulado1OrVerdeAzulado2 ? "#00FF7F" : isCiano1OrCinao2 ? "#00FFFF" : isAzulCeleste1OrAzulCeleste2 ? "#007FFF" : isAzul1OrAzul2 ? "#0000FF" : isVioleta1OrVioleta2 ? "#7F00FF" : isMagenta1OrMagenta2 ? "#FF00FF" : isCorDeRosa1OrCorDeRosa2 ? "#FF0080" : "white"} id="Union" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}