import { Observable } from 'rxjs';
export declare type ContentAttachFeedId = 'search' | 'recent' | 'unpublished';
export interface ContentAttachFeedEntry {
    path: string;
    label?: string | null;
    systemType?: string;
    subtitle?: string;
}
export declare function loadMyRecentActivityFeed(siteId: string): Observable<ContentAttachFeedEntry[]>;
export declare function loadUnpublishedWorkFeed(siteId: string): Observable<ContentAttachFeedEntry[]>;
export declare function excludeAttachedPaths(entries: ContentAttachFeedEntry[], attachedPaths: string[]): ContentAttachFeedEntry[];
