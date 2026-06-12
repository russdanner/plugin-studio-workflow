import { ColorSwatch } from '../colors';
export interface ColorSwatchPickerProps {
    label?: string;
    swatches: ColorSwatch[];
    value: string;
    onChange(value: string): void;
    /** Use step color resolver for preview ring; defaults to swatch hex */
    resolveColor?: (id: string) => string;
    size?: number;
    /** inline = always visible grid; menu = compact trigger + popover (default) */
    variant?: 'inline' | 'menu';
}
declare const ColorSwatchPicker: ({ label, swatches, value, onChange, resolveColor, size, variant }: ColorSwatchPickerProps) => JSX.Element;
export default ColorSwatchPicker;
