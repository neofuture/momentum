import {SbImage} from "@/storyblok";

export interface ImageContentBlok {
    image: SbImage;
    content: {
        type: string;
        content: [];
    }
    direction: string;
}
