import {SbNestableBlok} from "@/storyblok";

export interface SectionBlok {
    unique_id: string;
    body: Array<SbNestableBlok>;
    layout: 'spacious' | 'cozy';
    vertical_rhythm?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    reduced_spacing?: 'top' | 'bottom';
    variant: 'primary' | 'secondary' | 'transparent';
}
