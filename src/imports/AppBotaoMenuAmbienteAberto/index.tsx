import svgPaths from "./svg-wvynzv14yj";

function AppIconeAmbientesAtividadesDeAmbiente70Px({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[70px]"} data-name="app/ícone/ambientes/atividades-de-ambiente-70px">
      <div className="absolute inset-[18.01%]" data-name="vector">
        <div className="absolute inset-[-2.23%]">
          <svg className="block size-full" fill="none" height="46.7874" preserveAspectRatio="none" viewBox="0 0 46.7874 46.7874" width="46.7874">
            <path d={svgPaths.p36cc9f00} id="vector" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
type AppBotaoMenuAmbienteAbertoProps = {
  className?: string;
  icone?: React.ReactNode | null;
  selecionado?: boolean;
};

export default function AppBotaoMenuAmbienteAberto({ className, icone = null, selecionado = true }: AppBotaoMenuAmbienteAbertoProps) {
  return (
    <div className={className || "h-[80px] relative w-[70px]"} data-name="app/botão/menu/ambiente-aberto">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full">
          {icone || <AppIconeAmbientesAtividadesDeAmbiente70Px className="overflow-clip relative shrink-0 size-[70px]" />}
          {selecionado && <div className="bg-[#fc3] h-[2px] relative shrink-0 w-[70px]" data-name="Linha amarela" />}
        </div>
      </div>
    </div>
  );
}