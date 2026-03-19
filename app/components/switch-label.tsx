import {  Label } from '~/components/ui';
import { Switch } from '~/components/ui/switch';

type SwitchLabelProps = {
  id: string
  label: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const SwitchLabel = ({ id, label, checked, onCheckedChange }: SwitchLabelProps) => {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg border border-border/30 hover:border-border/60 transition-colors bg-card/50">
            <Label htmlFor={id}> {label} </Label>
            <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
        </div>
    )
}

export default SwitchLabel