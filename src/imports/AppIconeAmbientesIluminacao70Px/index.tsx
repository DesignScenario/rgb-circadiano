import svgPaths from "./svg-0akls61lh1";
type AppIconeAmbientesIluminacao70PxProps = {
  className?: string;
  estado?: boolean;
};

export default function AppIconeAmbientesIluminacao70Px({ className, estado = false }: AppIconeAmbientesIluminacao70PxProps) {
  const isEstado = estado;
  return (
    <div className={className || "overflow-clip relative size-[70px]"}>
      <div className={`absolute ${isEstado ? "inset-[13.74%_12.24%_19.45%_12.54%]" : "inset-[22.37%_30.71%_19.55%_30.71%]"}`} data-name="Vector">
        <div className={`absolute ${isEstado ? "inset-[-2.14%_-1.9%]" : "inset-[-2.46%_-3.7%]"}`}>
          <svg className="block size-full" fill="none" height={isEstado ? "48.7676" : "42.6575"} preserveAspectRatio="none" viewBox={isEstado ? "0 0 54.65 48.7676" : "0 0 29.0006 42.6575"} width={isEstado ? "54.65" : "29.0006"}>
            <path d={isEstado ? svgPaths.pb189270 : svgPaths.p2d250100} id="Vector" stroke={isEstado ? "#FFCC33" : "white"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}