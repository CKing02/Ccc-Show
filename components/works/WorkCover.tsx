import Image from "next/image";

interface WorkCoverProps {
  src: string;
  alt: string;
  priority?: boolean;
}

/**
 * 项目封面 / 截图。带 hover 缓动放大（需父元素有 group class）。
 */
export function WorkCover({ src, alt, priority = false }: WorkCoverProps) {
  return (
    <div className="overflow-hidden bg-bg-paper">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        priority={priority}
        className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </div>
  );
}