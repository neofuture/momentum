import {SbNestableBlok} from "@/storyblok";

export interface SectionBlok {
    unique_id: string;
    body: Array<SbNestableBlok>;
    flexdirection?: string;
}
