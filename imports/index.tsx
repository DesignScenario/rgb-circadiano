import svgPaths from "./svg-pmgjkt5zjf";
import imgAppImagensAmbientesVarandaGourmet from "./22a9ee485fdf17a055744d650f1f5599924c6e1a.png";

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

function AppIconeProximo24Px({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[24px]"} data-name="app/ícone/próximo-24px">
      <div className="absolute flex inset-[12.5%_41.67%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute inset-[-5.56%_-25.01%_-5.56%_-25%]">
              <svg className="block size-full" fill="none" height="20.0005" preserveAspectRatio="none" viewBox="0 0 6.00025 20.0005" width="6.00025">
                <path d={svgPaths.p2e891880} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppIconeAnterior24Px({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[24px]"} data-name="app/ícone/anterior-24px">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[18px] left-1/2 top-1/2 w-[4px]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-25.01%_-5.56%_-25%]">
          <svg className="block size-full" fill="none" height="20.0005" preserveAspectRatio="none" viewBox="0 0 6.00025 20.0005" width="6.00025">
            <path d={svgPaths.p2e891880} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function AppIconeTemperatura32Px({ className }: { className?: string }) {
  return (
    <div className={className || "h-[32px] relative w-[16px]"} data-name="app/ícone/temperatura-32px">
      <div className="-translate-y-1/2 absolute h-[18px] right-[2px] top-1/2 w-[11px]" data-name="termômetro">
        <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 11.0001 18" width="11.0001">
          <path d={svgPaths.p9c99c00} fill="white" id="termÃ´metro" />
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
        <p className="leading-[normal]">Luminárias</p>
      </div>
    </div>
  );
}

function NomeDaLuminaria() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative" data-name="nome da luminária">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Central</p>
      </div>
    </div>
  );
}

function Cabecalho() {
  return (
    <div className="content-stretch flex h-[22px] items-center relative shrink-0 w-full" data-name="cabeçalho">
      <NomeDaLuminaria />
    </div>
  );
}

function Linha() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#999] h-[3px] left-0 overflow-clip right-0 rounded-[1.5px] top-1/2" data-name="linha">
      <svg className="absolute block inset-0 size-full" fill="none" height="3" preserveAspectRatio="none" viewBox="0 0 331 3" width="331">
        <path d={svgPaths.p1e4d600} fill="#FFCC33" id="preenchimento" />
      </svg>
    </div>
  );
}

function NomeDaLuminaria1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative" data-name="nome da luminária">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Fita LED</p>
      </div>
    </div>
  );
}

function Cabecalho1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[22px] items-center relative shrink-0 w-full" data-name="cabeçalho">
      <NomeDaLuminaria1 />
      <div className="relative shrink-0 size-[22px]" data-name="app/ícone/configuração-22px">
        <div className="absolute inset-[9.09%]" data-name="Exclude">
          <div className="absolute inset-[-2.78%]">
            <svg className="block size-full" fill="none" height="19.0002" preserveAspectRatio="none" viewBox="0 0 19.0002 19.0002" width="19.0002">
              <path clipRule="evenodd" d={svgPaths.p3d3b3100} fill="white" fillRule="evenodd" id="Exclude" stroke="white" strokeMiterlimit="10" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Linha1() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#999] h-[3px] left-0 overflow-clip right-0 rounded-[1.5px] top-1/2" data-name="linha">
      <div className="absolute bg-white inset-0 rounded-[1.5px]" data-name="preenchimento" />
    </div>
  );
}

function NomeDaLuminaria2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative" data-name="nome da luminária">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Bancada</p>
      </div>
    </div>
  );
}

function Cabecalho2() {
  return (
    <div className="content-stretch flex h-[22px] items-center relative shrink-0 w-full" data-name="cabeçalho">
      <NomeDaLuminaria2 />
    </div>
  );
}

function NomeDaLuminaria3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative" data-name="nome da luminária">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[normal]">LED CCT/Circadiano</p>
      </div>
    </div>
  );
}

function Cabecalho3() {
  return (
    <div className="content-stretch flex gap-[4px] h-[22px] items-center relative shrink-0 w-full" data-name="cabeçalho">
      <NomeDaLuminaria3 />
      <div className="bg-[#fc3] h-[22px] relative rounded-[4px] shrink-0 w-[50px]" data-name="app/botão/pequeno">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[7px] relative size-full">
            <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] min-w-px overflow-hidden relative text-[10px] text-black text-center text-ellipsis">
              <p className="leading-[normal]">CIRC.</p>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute border border-[#fc3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Linha2() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#999] h-[3px] left-0 overflow-clip right-0 rounded-[1.5px] top-1/2" data-name="linha">
      <div className="absolute bg-[#ffc06b] inset-0 rounded-[1.5px]" data-name="preenchimento" />
    </div>
  );
}

function Linha3() {
  return <div className="-translate-y-1/2 absolute bg-gradient-to-r from-[#ffc06b] h-[3px] left-0 right-0 rounded-[1.5px] to-[#ace8ff] top-1/2" data-name="linha" />;
}

function Thumb() {
  return (
    <div className="-translate-y-1/2 absolute h-[25px] left-0 top-1/2 w-[45px]" data-name="thumb">
      <svg className="absolute block inset-0 size-full" fill="none" height="25" preserveAspectRatio="none" viewBox="0 0 45 25" width="45">
        <g clipPath="url(#clip0_0_1149)" id="thumb">
          <path d={svgPaths.pab315b1} fill="black" id="Ã¡rea" stroke="#FFC06B" strokeWidth="2" />
          <path d={svgPaths.p31eb30f0} fill="url(#paint0_linear_0_1149)" id="vetor" stroke="black" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_1149" x1="8" x2="37.4003" y1="12.4259" y2="12.4259">
            <stop stopColor="#FFC06B" />
            <stop offset="0.478" stopColor="#ACE8FF" />
            <stop offset="1" stopColor="#FFC06B" />
          </linearGradient>
          <clipPath id="clip0_0_1149">
            <rect fill="white" height="25" width="45" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListaDeLuminarias() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full" data-name="lista de luminárias">
      <div className="relative shrink-0 w-full" data-name="app/item-de-lista/iluminação">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col gap-[14px] items-center relative size-full">
            <Cabecalho />
            <div className="h-[13px] relative shrink-0 w-full" data-name="app/slider/padrão">
              <Linha />
              <div className="-translate-y-1/2 absolute right-0 size-[13px] top-1/2" data-name="thumb">
                <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 13 13" width="13">
                  <circle cx="6.5" cy="6.5" fill="#FFCC33" id="thumb" r="6.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="app/item-de-lista/iluminação">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col gap-[14px] items-center relative size-full">
            <Cabecalho1 />
            <div className="relative shrink-0 w-full" data-name="app/controle/luminária-rgb">
              <div className="content-stretch flex flex-col gap-[24px] items-start relative size-full">
                <div className="h-[13px] relative shrink-0 w-full" data-name="app/slider/rgb">
                  <Linha1 />
                  <div className="-translate-y-1/2 absolute right-0 size-[13px] top-1/2" data-name="thumb">
                    <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 13 13" width="13">
                      <circle cx="6.5" cy="6.5" fill="white" id="thumb" r="6.5" />
                    </svg>
                  </div>
                </div>
                <div className="h-[13px] relative shrink-0 w-full" data-name="app/slider/cromático" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="app/item-de-lista/iluminação">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col gap-[14px] items-center relative size-full">
            <Cabecalho2 />
            <button className="cursor-pointer h-[23px] relative shrink-0 w-full" data-name="app/botão-semântico/luminária-on-off">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center py-[5px] relative size-full">
                  <div className="bg-[#fc3] flex-[1_0_0] h-[13px] min-w-px relative rounded-[4px]" data-name="app/botão/extra-pequeno">
                    <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center justify-center px-[12px] relative size-full">
                        <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] min-w-px overflow-hidden relative text-[10px] text-black text-center text-ellipsis">
                          <p className="leading-[normal]">ON</p>
                        </div>
                      </div>
                    </div>
                    <div aria-hidden className="absolute border border-[#fc3] border-solid inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="app/item-de-lista/iluminação">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col gap-[14px] items-center relative size-full">
            <Cabecalho3 />
            <div className="relative shrink-0 w-full" data-name="app/controle/circadiano">
              <div className="flex flex-col items-center justify-center size-full">
                <div className="content-stretch flex flex-col gap-[18px] items-center justify-center relative size-full">
                  <div className="h-[13px] relative shrink-0 w-full" data-name="app/slider/circadiano-intensidade">
                    <Linha2 />
                    <div className="-translate-y-1/2 absolute right-0 size-[13px] top-1/2" data-name="thumb">
                      <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 13 13" width="13">
                        <circle cx="6.5" cy="6.5" fill="#FFC06B" id="thumb" r="6.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="h-[25px] relative shrink-0 w-full" data-name="app/slider/circadiano-cromático">
                    <Linha3 />
                    <Thumb />
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

function Luminarias() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full" data-name="luminárias">
      <div className="h-[25px] relative shrink-0 w-full" data-name="app/subtítulo">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <Label />
          </div>
        </div>
        <div aria-hidden className="absolute border-[#7d7d7d] border-b border-solid inset-0 pointer-events-none" />
      </div>
      <ListaDeLuminarias />
    </div>
  );
}

function Iluminacao() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-0 overflow-clip pb-[12px] pt-[31px] px-[31px] right-0 top-[162px]" data-name="iluminação">
      <Luminarias />
    </div>
  );
}

function Linha4() {
  return (
    <div className="-translate-y-1/2 absolute h-[3px] left-0 overflow-clip right-0 rounded-[1.5px] top-1/2" style={{ backgroundImage: "linear-gradient(90.00000000337089deg, rgb(255, 0, 128) 8%, rgb(255, 0, 255) 17%, rgb(127, 0, 255) 25%, rgb(0, 0, 255) 33%, rgb(0, 127, 255) 42%, rgb(0, 255, 255) 50%, rgb(0, 255, 127) 58%, rgb(0, 255, 0) 67%, rgb(127, 255, 0) 75%, rgb(255, 255, 0) 83%, rgb(255, 127, 0) 92%, rgb(255, 0, 0) 100%)" }} data-name="linha">
      <div className="-translate-y-1/2 absolute h-[3px] left-0 top-1/2 w-[13px]" data-name="branco">
        <svg className="absolute block inset-0 size-full" fill="none" height="3" preserveAspectRatio="none" viewBox="0 0 13 3" width="13">
          <path d="M0 0H13V3H0V0Z" fill="white" id="branco" />
        </svg>
      </div>
    </div>
  );
}

function NomeDoAmbiente() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[32px] items-center min-w-px overflow-clip relative" data-name="nome do ambiente">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[26px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Varanda Gourmet</p>
      </div>
    </div>
  );
}

function PrimeiraLinha() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center relative shrink-0 w-full" data-name="primeira linha">
      <NomeDoAmbiente />
      <div className="drop-shadow-[1px_1px_0.25px_rgba(0,0,0,0.16)] h-full relative shrink-0" data-name="app/status/temperatura">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center relative size-full">
            <AppIconeTemperatura32Px className="h-[32px] relative shrink-0 w-[16px]" />
            <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[24px] text-white whitespace-nowrap">
              <p className="leading-[normal]">27</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[24px] text-white whitespace-nowrap">
              <p className="leading-[normal]">º</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Camada() {
  return (
    <div className="absolute contents inset-0" data-name="Camada 1">
      <svg className="absolute block inset-0 size-full" fill="none" height="22" preserveAspectRatio="none" viewBox="0 0 22 22" width="22">
        <g id="Group">
          <g id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Cabecalho4() {
  return (
    <div className="relative shrink-0 w-full" data-name="cabeçalho">
      <div className="content-stretch flex flex-col gap-[6px] items-start pl-[24px] pr-[12px] py-[24px] relative size-full">
        <PrimeiraLinha />
        <div className="absolute left-[2px] overflow-clip size-[22px] top-[29px]" data-name="app/ícone/voltar-22px">
          <Camada />
          <div className="absolute inset-[22.73%_40.91%_22.73%_31.82%]" data-name="Vector">
            <div className="absolute inset-[-8.33%_-16.67%]">
              <svg className="block size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 8 14" width="8">
                <path d="M7 13L1 7L7 1" id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IcoRgb() {
  return (
    <div className="absolute h-[23.277px] left-[36px] top-[39px] w-[25px]" data-name="ico-rgb">
      <svg className="absolute block inset-0 size-full" fill="none" height="23.277" preserveAspectRatio="none" viewBox="0 0 25 23.277" width="25">
        <g id="ico-rgb">
          <path d={svgPaths.p1b4e4ec0} fill="#FF0000" id="red" />
          <path d={svgPaths.pd1ed500} fill="#00FF00" id="green" />
          <path d={svgPaths.pc190400} fill="#0000FF" id="blue" />
        </g>
      </svg>
    </div>
  );
}

function IcoKeypad() {
  return (
    <div className="absolute inset-[18.57%_31.43%_18.57%_25.71%]" data-name="ico-keypad">
      <div className="absolute inset-[-2.27%_-3.33%]">
        <svg className="block size-full" fill="none" height="46" preserveAspectRatio="none" viewBox="0 0 32 46" width="32">
          <g id="ico-keypad">
            <path d={svgPaths.pa350480} id="RetÃ¢ngulo 4587" stroke="white" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
            <path d="M10 32H21" id="Linha 495" stroke="white" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
            <path d="M10 14L22 14" id="Linha 493" stroke="white" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
            <path d="M10 23L22 23" id="Linha 494" stroke="white" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Vector() {
  return (
    <div className="absolute contents left-[18px] top-[13px]" data-name="vector">
      <IcoRgb />
      <IcoKeypad />
    </div>
  );
}

function BotoesDeAcao() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[11px] items-center min-w-px overflow-x-auto overflow-y-clip relative" data-name="botões de ação">
      <div className="h-[80px] relative shrink-0 w-[70px]" data-name="app/botão/menu/ambiente-aberto">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full">
            <div className="overflow-clip relative shrink-0 size-[70px]" data-name="app/ícone/ambientes/controles-70px">
              <svg className="absolute block inset-0 size-full" fill="none" height="70" preserveAspectRatio="none" viewBox="0 0 70 70" width="70">
                <g id="vector">
                  <g id="RetÃ¢ngulo 1762" />
                  <path d={svgPaths.pfefd400} id="Caminho 8424" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path clipRule="evenodd" d={svgPaths.p1eb90b40} fill="white" fillRule="evenodd" id="Caminho 8425" />
                  <path d={svgPaths.p283cc300} id="Caminho 8426" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[80px] relative shrink-0 w-[70px]" data-name="app/botão/menu/ambiente-aberto">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full">
            <div className="overflow-clip relative shrink-0 size-[70px]" data-name="estado=false">
              <div className="absolute inset-[22.37%_30.71%_19.55%_30.71%]" data-name="Vector">
                <div className="absolute inset-[-2.46%_-3.7%]">
                  <svg className="block size-full" fill="none" height="42.6575" preserveAspectRatio="none" viewBox="0 0 29.0006 42.6575" width="29.0006">
                    <path d={svgPaths.p2d250100} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-[#fc3] h-[2px] relative shrink-0 w-[70px]" data-name="Linha amarela" />
          </div>
        </div>
      </div>
      <div className="h-[80px] relative shrink-0 w-[70px]" data-name="app/botão/menu/ambiente-aberto">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full">
            <div className="overflow-clip relative shrink-0 size-[70px]" data-name="estado=off">
              <div className="absolute inset-[17.59%_20.36%_23.3%_20.36%]" data-name="vector">
                <div className="absolute inset-[-2.42%_-2.41%]">
                  <svg className="block size-full" fill="none" height="43.3801" preserveAspectRatio="none" viewBox="0 0 43.5003 43.3801" width="43.5003">
                    <path d={svgPaths.p1241a700} id="vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[80px] relative shrink-0 w-[70px]" data-name="app/botão/menu/ambiente-aberto">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full">
            <div className="overflow-clip relative shrink-0 size-[70px]" data-name="estado=off">
              <div className="absolute inset-[19%_15.93%_19.7%_15%]" data-name="Vector">
                <div className="absolute inset-[-2.33%_-2.07%]">
                  <svg className="block size-full" fill="none" height="44.91" preserveAspectRatio="none" viewBox="0 0 50.35 44.91" width="50.35">
                    <path d={svgPaths.p31f2600} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[80px] relative shrink-0 w-[70px]" data-name="app/botão/menu/ambiente-aberto">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full">
            <div className="overflow-clip relative shrink-0 size-[70px]" data-name="estado=off">
              <div className="absolute inset-[20.12%_18.22%_20.12%_30.06%]" data-name="vector">
                <svg className="absolute block inset-0 size-full" fill="none" height="41.832" preserveAspectRatio="none" viewBox="0 0 36.207 41.832" width="36.207">
                  <g id="vector">
                    <path d={svgPaths.p3daa3c40} fill="white" />
                    <path d={svgPaths.p3f45d80} fill="white" />
                    <path d={svgPaths.p21214800} fill="white" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[80px] relative shrink-0 w-[70px]" data-name="app/botão/menu/ambiente-aberto">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full">
            <div className="overflow-clip relative shrink-0 size-[70px]" data-name="app/ícone/ambientes/câmera-70px">
              <div className="absolute inset-[22.65%_19.18%_22.86%_19.2%]" data-name="vector">
                <div className="absolute inset-[-2.62%_-2.47%_-2.62%_-2.46%]">
                  <svg className="block size-full" fill="none" height="40.1398" preserveAspectRatio="none" viewBox="0 0 45.2626 40.1398" width="45.2626">
                    <path d={svgPaths.p24755900} id="vector" stroke="white" strokeMiterlimit="10" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[80px] relative shrink-0 w-[70px]" data-name="app/botão/menu/ambiente-aberto">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full">
            <div className="overflow-clip relative shrink-0 size-[70px]" data-name="app/ícone/ambientes/keypads-70px">
              <Vector />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[80px] relative shrink-0 w-[70px]" data-name="app/botão/menu/ambiente-aberto">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full">
            <div className="overflow-clip relative shrink-0 size-[70px]" data-name="app/ícone/ambientes/outros-70px">
              <div className="absolute bottom-[44.29%] left-1/4 right-1/4 top-[44.29%]" data-name="vector">
                <svg className="absolute block inset-0 size-full" fill="none" height="8" preserveAspectRatio="none" viewBox="0 0 35.0008 8" width="35.0008">
                  <path clipRule="evenodd" d={svgPaths.pe97cd00} fill="white" fillRule="evenodd" id="vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AreaDeRolagem() {
  return (
    <div className="absolute inset-[122px_0_34px_0] overflow-x-clip overflow-y-auto" data-name="área de rolagem">
      <Iluminacao />
      <div className="absolute h-[90px] right-[16px] top-[206px] w-[43px]" data-name="app/status/tooltip-padrão/ativo">
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
      <div className="-translate-x-1/2 absolute h-[90px] left-1/2 top-[324px] w-[361px]" data-name="app/slider/slider-cromático-com-toolflip">
        <div className="absolute inset-[75.56%_15px_10%_15px]" data-name="app/slider/cromático">
          <Linha4 />
        </div>
        <div className="absolute inset-[0_88.09%_0_0]" data-name="app/status/tooltip-rgb/ativo">
          <div className="absolute inset-[65.56%_13.95%_0_13.95%]" data-name="área de toque">
            <svg className="absolute block inset-0 size-full" fill="none" height="31" preserveAspectRatio="none" viewBox="0 0 31 31" width="31">
              <circle cx="15.5" cy="15.5" fill="#707070" fillOpacity="0.75" id="Ã¡rea de toque" r="15.5" />
            </svg>
          </div>
          <div className="absolute inset-[75.56%_34.88%_10%_34.88%]" data-name="thumb">
            <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 13 13" width="13">
              <circle cx="6.5" cy="6.5" fill="white" id="thumb" r="5.75" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="absolute drop-shadow-[0px_4px_3px_rgba(0,0,0,0.35)] inset-[0_0_44.44%_0]" data-name="app/ícone/tooltip">
            <div className="absolute inset-[0_0_-0.1%_0]" data-name="Union">
              <svg className="absolute block inset-0 size-full" fill="none" height="50.0498" preserveAspectRatio="none" viewBox="0 0 43 50.0498" width="43">
                <path d={svgPaths.p66e68f0} fill="white" id="Union" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 right-0 top-0" data-name="app/card/ambiente-aberto">
        <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center justify-center relative size-full">
            <div className="absolute inset-0" data-name="app/imagens/ambientes/Varanda Gourmet">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAppImagensAmbientesVarandaGourmet} />
            </div>
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0) 37%, rgba(0, 0, 0, 0.6) 100%)" }} data-name="scrim" />
            <Cabecalho4 />
            <div className="h-[82px] relative shrink-0 w-full" data-name="app/menu/ações-do-ambiente-aberto">
              <div className="flex flex-row justify-center size-full">
                <div className="content-stretch flex items-start justify-center relative size-full">
                  <div className="h-[70px] overflow-clip relative shrink-0 w-[32px]" data-name="app/botão/navegação-menu">
                    <AppIconeAnterior24Px className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[24px] top-1/2" />
                  </div>
                  <BotoesDeAcao />
                  <div className="h-[70px] overflow-clip relative shrink-0 w-[32px]" data-name="app/botão/navegação-menu">
                    <AppIconeProximo24Px className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[24px] top-1/2" />
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

export default function AppTelaAmbientesAmbientesAbertoIluminacaoControles() {
  return (
    <div className="bg-black relative size-full" data-name="app/tela/ambientes/ambientes-aberto/iluminação-controles">
      <AppBarraHomeIndicator className="absolute bottom-0 h-[34px] left-0 overflow-clip right-0" />
      <AreaDeRolagem />
      <div className="absolute left-0 right-0 top-0" data-name="app/conjunto/barras-do-topo">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col items-center relative size-full">
            <AppBarraBarraDeStatus className="h-[50px] relative shrink-0 w-full" />
            <div className="h-[72px] relative shrink-0 w-full" data-name="app/barra/barra-de-navegação">
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex gap-[16px] items-center justify-center px-[31px] py-[9px] relative size-full">
                  <div className="bg-[#fc3] flex-[1_0_0] h-[54px] min-w-px relative rounded-[4px]" data-name="app/botão/barra-de-navegação">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center relative size-full">
                        <div className="relative shrink-0 size-[32px]" data-name="app/ícone/ambientes-32px">
                          <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                            <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                              <div className="h-[21.525px] relative shrink-0 w-[21.6px]" data-name="Vector">
                                <svg className="absolute block inset-0 size-full" fill="none" height="21.525" preserveAspectRatio="none" viewBox="0 0 21.6 21.525" width="21.6">
                                  <path d={svgPaths.p1cc22100} fill="black" id="Vector" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-[1_0_0] h-[54px] min-w-px relative rounded-[4px]" data-name="app/botão/barra-de-navegação">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center relative size-full">
                        <div className="relative shrink-0 size-[32px]" data-name="app/ícone/atividades-32px">
                          <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                            <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                              <div className="relative shrink-0 size-[21.8px]" data-name="Vector">
                                <svg className="absolute block inset-0 size-full" fill="none" height="21.8" preserveAspectRatio="none" viewBox="0 0 21.8 21.8" width="21.8">
                                  <path d={svgPaths.pacefc80} fill="white" id="Vector" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-[1_0_0] h-[54px] min-w-px relative rounded-[4px]" data-name="app/botão/barra-de-navegação">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center relative size-full">
                        <div className="relative shrink-0 size-[32px]" data-name="app/ícone/equipamentos-32px">
                          <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                            <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                              <div className="h-[22px] relative shrink-0 w-[21.9px]" data-name="Vector">
                                <svg className="absolute block inset-0 size-full" fill="none" height="22" preserveAspectRatio="none" viewBox="0 0 21.9 22" width="21.9">
                                  <path d={svgPaths.p854ca80} fill="white" id="Vector" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-[1_0_0] h-[54px] min-w-px relative rounded-[4px]" data-name="app/botão/barra-de-navegação">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center relative size-full">
                        <div className="relative shrink-0 size-[32px]" data-name="app/ícone/av-32px">
                          <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                            <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                              <div className="h-[29.739px] relative shrink-0 w-[32px]" data-name="Vector">
                                <svg className="absolute block inset-0 size-full" fill="none" height="29.7392" preserveAspectRatio="none" viewBox="0 0 32 29.7392" width="32">
                                  <path d={svgPaths.p568ad00} fill="white" id="Vector" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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