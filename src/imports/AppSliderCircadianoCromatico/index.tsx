import svgPaths from "./svg-v1buv5zw8k";
type AppSliderCircadianoCromaticoProps = {
  className?: string;
  cor?: "quente" | "fria";
  modo?: "manual" | "automático";
};

export default function AppSliderCircadianoCromatico({ className, cor = "quente", modo = "manual" }: AppSliderCircadianoCromaticoProps) {
  const isAutomatico = modo === "automático";
  const isFria = cor === "fria";
  return (
    <div className={className || `relative w-[331px] ${isAutomatico ? "h-[25px]" : "h-[13px]"}`}>
      <div className="-translate-y-1/2 absolute bg-gradient-to-r from-[#ffc06b] h-[3px] left-0 right-0 rounded-[1.5px] to-[#ace8ff] top-1/2" data-name="linha" />
      <div className={`-translate-y-1/2 absolute top-1/2 ${modo === "automático" && cor === "fria" ? "h-[25px] right-0 w-[45px]" : modo === "automático" && cor === "quente" ? "h-[25px] left-0 w-[45px]" : modo === "manual" && cor === "fria" ? "right-0 size-[13px]" : "left-0 size-[13px]"}`} data-name="thumb">
        <svg className="absolute block inset-0 size-full" fill="none" height={isAutomatico ? "25" : "13"} preserveAspectRatio="none" viewBox={isAutomatico ? "0 0 45 25" : "0 0 13 13"} width={isAutomatico ? "45" : "13"}>
          {modo === "manual" && <circle cx="6.5" cy="6.5" fill={isFria ? "#ACE8FF" : "#FFC06B"} id="thumb" r="5.75" stroke="white" strokeWidth="1.5" />}
          {isAutomatico && (
            <>
              <g clipPath={isFria ? "url(#clip0_0_5)" : "url(#clip0_0_8)"} id="thumb">
                <path d={svgPaths.pab315b1} fill="black" id="Ã¡rea" stroke={isFria ? "#ACE8FF" : "#FFC06B"} strokeWidth="2" />
                <path d={svgPaths.p31eb30f0} fill={isFria ? "url(#paint0_linear_0_5)" : "url(#paint0_linear_0_8)"} id="vetor" stroke="black" />
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id={isFria ? "paint0_linear_0_5" : "paint0_linear_0_8"} x1="8" x2="37.4003" y1="12.4259" y2="12.4259">
                  <stop stopColor="#FFC06B" />
                  <stop offset="0.478" stopColor="#ACE8FF" />
                  <stop offset="1" stopColor="#FFC06B" />
                </linearGradient>
                <clipPath id={isFria ? "clip0_0_5" : "clip0_0_8"}>
                  <rect fill="white" height="25" width="45" />
                </clipPath>
              </defs>
            </>
          )}
        </svg>
      </div>
    </div>
  );
}