import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class StoryblokPreviewService {

    async validateToken(
        spaceId: string | null,
        timestamp: string | null,
        token: string | null,
        previewToken: string | null,
    ) {

        if (!spaceId || !timestamp || !previewToken || !token) {
            return false;
        }

        const enc = new TextEncoder();
        const validationString = [spaceId, previewToken, timestamp].join(':');
        const hash = await crypto.subtle.digest('SHA-1', enc.encode(validationString));
        const computed = Array.from(new Uint8Array(hash))
            .map(v => v.toString(16).padStart(2, '0'))
            .join('');

        return token === computed;
    }


}
