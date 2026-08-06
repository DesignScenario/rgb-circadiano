type AppSliderCircadianoIntensidadeProps = {
  className?: string;
  cor?: "fria" | "quente";
  estado?: "0" | "100";
};

export default function AppSliderCircadianoIntensidade({ className, cor = "quente", estado = "0" }: AppSliderCircadianoIntensidadeProps) {
  return (
    <div className={className || "h-[13px] relative w-[331px]"}>
      <div className="-translate-y-1/2 absolute bg-[#999] h-[3px] left-0 overflow-clip right-0 rounded-[1.5px] top-1/2" data-name="linha">
        <div className={`absolute rounded-[1.5px] ${estado === "100" && cor === "fria" ? "bg-[#ace8ff] inset-0" : estado === "0" && cor === "fria" ? "bg-[#ace8ff] bottom-0 left-[-331px] top-0 w-[331px]" : estado === "100" && cor === "quente" ? "bg-[#ffc06b] inset-0" : "bg-[#ffc06b] bottom-0 left-[-331px] top-0 w-[331px]"}`} data-name="preenchimento" />
      </div>
      <div className={`-translate-y-1/2 absolute size-[13px] top-1/2 ${estado === "100" ? "right-0" : "left-0"}`} data-name="thumb">
        <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 13 13" width="13">
          <circle cx="6.5" cy="6.5" fill={cor === "fria" ? "#ACE8FF" : "#FFC06B"} id="thumb" r="6.5" />
        </svg>
      </div>
    </div>
  );
}