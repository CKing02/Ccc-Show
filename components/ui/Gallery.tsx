import Image from "next/image";

interface GalleryProps {
  images: string[];
  altPrefix: string;
}

/**
 * 项目内图片走廊：纵向堆叠截图。
 */
export function Gallery({ images, altPrefix }: GalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="space-y-12">
      {images.map((src, i) => (
        <div key={src} className="overflow-hidden bg-bg-paper">
          <Image
            src={src}
            alt={`${altPrefix} - ${i + 1}`}
            width={1200}
            height={800}
            className="h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}
