import svgPaths from "./svg-jbncg9d8e5";
import imgMatizes from "./dad55023aed494b396988fa22a3673797d574fcb.png";

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
        <p className="leading-[normal]">Modo avançado</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 size-[300px]" data-name="container">
      <div className="absolute flex items-center justify-center left-0 size-[300px] top-0">
        <div className="-rotate-90 flex-none">
          <div className="relative size-[300px]" data-name="matizes">
            <img alt="" className="absolute block inset-0 max-w-none size-full" height="300" src={imgMatizes} width="300" />
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-0 size-[300px] top-0">
        <div className="-rotate-90 flex-none">
          <div className="relative size-[300px]" data-name="gradiente branco">
            <svg className="absolute block inset-0 size-full" fill="none" height="300" preserveAspectRatio="none" viewBox="0 0 300 300" width="300">
              <circle cx="150" cy="150" fill="url(#paint0_radial_0_453)" id="gradiente branco" r="150" />
              <defs>
                <radialGradient cx="0" cy="0" gradientTransform="translate(150 150) rotate(180) scale(150)" gradientUnits="userSpaceOnUse" id="paint0_radial_0_453" r="1">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute left-[199.5px] size-[32px] top-[130.33px]" data-name="seletor de cores">
        <div className="absolute inset-[-12.5%_-25%_-37.5%_-25%]">
          <svg className="block size-full" fill="none" height="48" preserveAspectRatio="none" viewBox="0 0 48 48" width="48">
            <g filter="url(#filter0_d_0_449)" id="seletor de cores">
              <circle cx="24" cy="20" fill="white" fillOpacity="0.2" r="16" shapeRendering="crispEdges" />
              <circle cx="24" cy="20" r="14.5" shapeRendering="crispEdges" stroke="white" strokeWidth="3" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_0_449" width="48" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="4" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_0_449" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_0_449" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function RodaCromatica() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="roda cromática">
      <Container />
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

function Intensidade() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="intensidade">
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
      <RodaCromatica />
      <Intensidade />
      <div className="relative shrink-0 w-[331px]" data-name="app/botões-de-opção/grade/grande-principal">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col items-center relative size-full">
            <div className="h-[174px] relative shrink-0 w-full" data-name="app/grupo-de-botões/grade-grande-principal">
              <div className="overflow-clip rounded-[inherit] size-full">
                <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[___50px_50px_50px] relative size-full">
                  <div className="col-1 cursor-pointer h-[50px] justify-self-stretch relative rounded-[4px] row-1 shrink-0" data-name="app/botão/grande-principal">
                    <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center justify-center px-[12px] relative size-full">
                        <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] min-w-px overflow-hidden relative text-[16px] text-center text-ellipsis text-white">
                          <p className="leading-[normal]">FESTA</p>
                        </div>
                      </div>
                    </div>
                    <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                  <div className="col-2 cursor-pointer h-[50px] justify-self-stretch relative rounded-[4px] row-1 shrink-0" data-name="app/botão/grande-principal">
                    <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center justify-center px-[12px] relative size-full">
                        <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] min-w-px overflow-hidden relative text-[16px] text-center text-ellipsis text-white">
                          <p className="leading-[normal]">CICLO RGB</p>
                        </div>
                      </div>
                    </div>
                    <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                  <div className="col-1 cursor-pointer h-[50px] justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="app/botão/grande-principal">
                    <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center justify-center px-[12px] relative size-full">
                        <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] min-w-px overflow-hidden relative text-[16px] text-center text-ellipsis text-white">
                          <p className="leading-[normal]">MIX 1</p>
                        </div>
                      </div>
                    </div>
                    <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                  <div className="col-2 cursor-pointer h-[50px] justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="app/botão/grande-principal">
                    <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center justify-center px-[12px] relative size-full">
                        <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] min-w-px overflow-hidden relative text-[16px] text-center text-ellipsis text-white">
                          <p className="leading-[normal]">MIX 2</p>
                        </div>
                      </div>
                    </div>
                    <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                  <div className="bg-[#fc3] col-[1/span_2] h-[50px] justify-self-stretch relative rounded-[4px] row-3 shrink-0" data-name="app/botão/grande-principal">
                    <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center justify-center px-[12px] relative size-full">
                        <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] min-w-px overflow-hidden relative text-[16px] text-black text-center text-ellipsis">
                          <p className="leading-[normal]">OFF</p>
                        </div>
                      </div>
                    </div>
                    <div aria-hidden className="absolute border border-[#fc3] border-solid inset-0 pointer-events-none rounded-[4px]" />
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

function ModoAvancado() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-center left-0 overflow-clip pb-[12px] pt-[24px] px-[31px] right-0 top-0" data-name="modo avançado">
      <div className="h-[25px] relative shrink-0 w-full" data-name="app/subtítulo">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <Label />
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
      <ModoAvancado />
    </div>
  );
}

function Titulos() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-px items-center justify-center left-[52px] overflow-clip right-[52px] top-1/2" data-name="títulos">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#a5a5a5] text-[16px] text-center uppercase w-full">
        <p className="leading-[normal]">Fita LED</p>
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