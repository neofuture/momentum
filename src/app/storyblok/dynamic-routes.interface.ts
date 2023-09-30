export interface dynamicRoutesModel {
    image?: string;
    categories?: dynamicRoutesModel[];
    brands?: dynamicRoutesModel[];
    menu?: string;
    position?: number;
    slug: string;
    title: string;
    mapping: string
}