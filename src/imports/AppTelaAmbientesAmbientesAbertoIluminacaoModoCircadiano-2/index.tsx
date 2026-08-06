import svgPaths from "./svg-li99dwjw9f";
import imgEllipse186 from "./05880257954eeb0b62604e9e0129b3be13c9efdd.png";

function AppBarraBarraDeStatus({ className }: { className?: string }) {
  return (
    <div className={className || "h-[50px] relative w-[393px]"} data-name="app/barra/barra-de-status">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[26px] relative size-full">
          <div className="h-[10.709px] relative shrink-0 w-[28.633px]" data-name="horário-exemplo">
            <svg className="absolute block inset-0 size-full" fill="none" height="10.7088" preserveAspectRatio="none" viewBox="0 0 28.6331 10.7088" width="28.6331">
              <path d={svgPaths.p17daad00} fill="white" id="horÃ¡rio-exemplo" />
            </svg>
          </div>
          <div className="h-[12px] relative shrink-0 w-[75.371px]" data-name="ícones">
            <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 75.3717 12" width="75.3717">
              <g id="Ã­cones">
                <g id="Rede mÃ³vel">
                  <path d={svgPaths.p1dd8f8c0} fill="white" />
                  <path d={svgPaths.p13122500} fill="white" />
                  <path d={svgPaths.p329921f0} fill="white" />
                  <path d={svgPaths.p3f00b700} fill="white" />
                </g>
                <path clipRule="evenodd" d={svgPaths.p2ba99580} fill="white" fillRule="evenodd" id="Wi-fi" />
                <g id="bateria">
                  <path d={svgPaths.pdc7d780} fill="#7D7D7D" id="Vector" />
                  <path d={svgPaths.p2ea63500} fill="#7D7D7D" id="Vector_2" />
                  <path d={svgPaths.p2077f700} fill="white" id="Vector_3" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type AppItemDeListaCaixaDeSelecaoProps = {
  className?: string;
  ativo?: boolean;
  caixaDeSelecao?: "cheia";
  modoDeAtivacao?: "tocar no item";
  mostrarInformacao?: boolean;
  not?: "false";
  textoDoItem?: string;
};

function AppItemDeListaCaixaDeSelecao({ className, ativo = false, caixaDeSelecao = "cheia", modoDeAtivacao = "tocar no item", mostrarInformacao = false, not = "false", textoDoItem = "Texto do item" }: AppItemDeListaCaixaDeSelecaoProps) {
  const isCheiaAndAtivoAndTocarNoItem = caixaDeSelecao === "cheia" && ativo && modoDeAtivacao === "tocar no item";
  return (
    <button className={className || "relative w-[331px]"}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[10px] items-center min-w-px overflow-clip relative" data-name="área de texto">
            <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-left text-white whitespace-nowrap">
              <p className="leading-[normal]">{textoDoItem}</p>
            </div>
            {mostrarInformacao && (
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="app/ícone/informação-20px">
                <div className="absolute left-0 size-[20px] top-0" data-name="ico-informação">
                  <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                    <g id="ico-informaÃ§Ã£o">
                      <g id="area" />
                      <circle cx="10" cy="10" id="Ellipse 31" r="9.5" stroke="#666666" />
                      <path d={svgPaths.p4315ec0} fill="#666666" id="?" />
                    </g>
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div className="relative shrink-0 size-[18px]" data-name="app/ícone/caixa-de-seleção-cheia-18px">
            <div className={`absolute border-2 border-solid border-white inset-0 rounded-[2px] ${isCheiaAndAtivoAndTocarNoItem ? "bg-white" : ""}`} data-name="vetor" />
            {isCheiaAndAtivoAndTocarNoItem && (
              <div className="absolute inset-[27.78%_22.22%]" data-name="ico-check">
                <div className="absolute inset-[-12.5%_-10%]">
                  <svg className="block size-full" fill="none" height="10" preserveAspectRatio="none" viewBox="0 0 12 10" width="12">
                    <path d={svgPaths.p30ffc4c0} id="ico-check" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function AppIconeInformacao24Px({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[24px]"} data-name="app/ícone/informação-24px">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-name="ico-informação">
        <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
          <g id="ico-informaÃ§Ã£o">
            <g id="area" />
            <circle cx="10" cy="10" id="Ellipse 31" r="9.5" stroke="#666666" />
            <path d={svgPaths.p135ae500} fill="#666666" id="?" />
          </g>
        </svg>
      </div>
    </div>
  );
}
type AppBarraHomeIndicatorProps = {
  className?: string;
  mostrarLinhaBranca?: boolean;
};

function AppBarraHomeIndicator({ className, mostrarLinhaBranca = true }: AppBarraHomeIndicatorProps) {
  return (
    <div className={className || "h-[34px] overflow-clip relative w-[393px]"} data-name="app/barra/home-indicator">
      {mostrarLinhaBranca && <div className="absolute bg-white bottom-[8px] h-[5px] left-[33.33%] right-[33.33%] rounded-[2.5px]" data-name="linha branca" />}
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[25px] items-center min-w-px overflow-clip relative" data-name="label">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#b7b7b7] text-[10px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Modo circadiano</p>
      </div>
    </div>
  );
}

function ColorWheelContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center justify-center relative shrink-0 w-full" data-name="Color Wheel Container">
      <div className="relative shrink-0 size-[300px]">
        <div className="absolute inset-[0_0_12.74%_0]">
          <img alt="" className="block max-w-none size-full" height="261.788" src={imgEllipse186} width="300" />
        </div>
      </div>
      <div className="absolute left-[54px] size-[36px] top-[218px]">
        <div className="absolute inset-[-11.11%_-22.22%_-33.33%_-22.22%]">
          <svg className="block size-full" fill="none" height="52" preserveAspectRatio="none" viewBox="0 0 52 52" width="52">
            <g filter="url(#filter0_d_0_350)" id="Ellipse 184">
              <circle cx="26" cy="22" r="16.5" shapeRendering="crispEdges" stroke="white" strokeWidth="3" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="52" id="filter0_d_0_350" width="52" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="4" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_0_350" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_0_350" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute left-[240px] size-[36px] top-[218px]">
        <div className="absolute inset-[-11.11%_-22.22%_-33.33%_-22.22%]">
          <svg className="block size-full" fill="none" height="52" preserveAspectRatio="none" viewBox="0 0 52 52" width="52">
            <g filter="url(#filter0_d_0_350)" id="Ellipse 184">
              <circle cx="26" cy="22" r="16.5" shapeRendering="crispEdges" stroke="white" strokeWidth="3" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="52" id="filter0_d_0_350" width="52" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="4" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_0_350" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_0_350" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold h-[110px] justify-center leading-[0] left-[165.5px] text-[24px] text-center text-white top-[150px] w-[123px]">
        <p className="leading-[normal]">
          2700K-
          <br aria-hidden />
          6500K
        </p>
      </div>
    </div>
  );
}

function NomeDaLuminaria() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative" data-name="nome da luminária">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Intensidade</p>
      </div>
    </div>
  );
}

function Cabecalho() {
  return (
    <div className="content-stretch flex gap-[4px] h-[22px] items-center relative shrink-0 w-full" data-name="cabeçalho">
      <NomeDaLuminaria />
    </div>
  );
}

function Linha() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#999] h-[3px] left-0 overflow-clip right-0 rounded-[1.5px] top-1/2" data-name="linha">
      <svg className="absolute block inset-0 size-full" fill="none" height="3" preserveAspectRatio="none" viewBox="0 0 331 3" width="331">
        <path d={svgPaths.p1e4d600} fill="white" id="preenchimento" />
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <div className="relative shrink-0 w-[331px]" data-name="app/item-de-lista/iluminação">
        <div className="content-stretch flex flex-col gap-[14px] items-start relative size-full">
          <Cabecalho />
          <div className="relative shrink-0 w-full" data-name="app/controle/luminária-rgb">
            <div className="content-stretch flex flex-col gap-[24px] items-start relative size-full">
              <div className="h-[13px] relative shrink-0 w-full" data-name="app/slider/rgb">
                <Linha />
                <div className="-translate-y-1/2 absolute right-0 size-[13px] top-1/2" data-name="thumb">
                  <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 13 13" width="13">
                    <circle cx="6.5" cy="6.5" fill="white" id="thumb" r="6.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[90px] left-[303px] top-[-32px] w-[43px]" data-name="app/status/tooltip-padrão/ativo">
        <div className="absolute inset-[65.56%_13.95%_0_13.95%]" data-name="área_toque">
          <svg className="absolute block inset-0 size-full" fill="none" height="31" preserveAspectRatio="none" viewBox="0 0 31 31" width="31">
            <path d={svgPaths.p3f61f4f0} fill="#707070" fillOpacity="0.75" id="Ã¡rea_toque" />
          </svg>
        </div>
        <div className="absolute inset-[75.56%_34.88%_10%_34.88%]" data-name="thumb">
          <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 13 13" width="13">
            <circle cx="6.5" cy="6.5" fill="white" id="thumb" r="6.5" />
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
    </div>
  );
}

function Conteudo() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full" data-name="conteúdo">
      <AppItemDeListaCaixaDeSelecao ativo className="relative shrink-0 w-full" textoDoItem="Ativar iluminação circadiana" />
      <ColorWheelContainer />
      <Frame />
    </div>
  );
}

function ModoCircadiano() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-center left-0 overflow-clip pb-[12px] pt-[24px] px-[31px] right-0 top-0" data-name="modo circadiano">
      <div className="h-[25px] relative shrink-0 w-full" data-name="app/subtítulo">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-between relative size-full">
            <Label />
            <div className="h-[24px] relative shrink-0" data-name="app/botão/ação-do-subtítulo">
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-center relative size-full">
                  <AppIconeInformacao24Px className="overflow-clip relative shrink-0 size-[24px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute border-[#7d7d7d] border-b border-solid inset-0 pointer-events-none" />
      </div>
      <Conteudo />
    </div>
  );
}

function AreaDeRolagem() {
  return (
    <div className="absolute inset-[106px_0_34px_0] overflow-x-clip overflow-y-auto" data-name="área de rolagem">
      <ModoCircadiano />
    </div>
  );
}

function Titulos() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-px items-center justify-center left-[52px] overflow-clip right-[52px] top-1/2" data-name="títulos">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#a5a5a5] text-[16px] text-center uppercase w-full">
        <p className="leading-[normal]">LED CCT/Circadiano</p>
      </div>
    </div>
  );
}

export default function AppTelaAmbientesAmbientesAbertoIluminacaoModoCircadiano() {
  return (
    <div className="bg-black relative size-full" data-name="app/tela/ambientes/ambientes-aberto/iluminação-modo-circadiano">
      <AppBarraHomeIndicator className="absolute bottom-0 h-[34px] left-0 overflow-clip right-0" />
      <AreaDeRolagem />
      <div className="absolute left-0 right-0 top-0" data-name="app/conjunto/barras-do-topo">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col items-center relative size-full">
            <AppBarraBarraDeStatus className="h-[50px] relative shrink-0 w-full" />
            <div className="h-[56px] overflow-clip relative shrink-0 w-full" data-name="app/barra/barra-de-título">
              <Titulos />
              <div className="-translate-y-1/2 absolute left-[12px] overflow-clip size-[28px] top-1/2" data-name="app/ícone/voltar-28px">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[16px] left-1/2 top-1/2 w-[8px]" data-name="Vector">
                  <div className="absolute inset-[-6.25%_-12.5%]">
                    <svg className="block size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 10 18" width="10">
                      <path d="M9 17L1 9L9 1" id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}