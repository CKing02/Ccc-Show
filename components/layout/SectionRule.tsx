import { Label } from "@/components/ui/Label";

interface SectionRuleProps {
  index: number; // 1-based
  total: number;
  label?: string;
}

/**
 * 展厅分隔线：左右细线 + 中间 "01 / 04" 序号。
 * 模拟美术馆不同展厅之间的过渡。
 */
export function SectionRule({ index, total, label }: SectionRuleProps) {
  const padded = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-6 py-12">
      <div className="h-px flex-1 bg-rule" />
      <div className="flex shrink-0 items-center gap-4">
        {label && <Label>{label}</Label>}
        <Label className="text-ink-faint">
          {padded(index)} / {padded(total)}
        </Label>
      </div>
      <div className="h-px flex-1 bg-rule" />
    </div>
  );
}
