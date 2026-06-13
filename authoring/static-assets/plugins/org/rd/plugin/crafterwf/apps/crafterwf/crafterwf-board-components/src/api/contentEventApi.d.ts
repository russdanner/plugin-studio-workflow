export declare type WorkflowContentEventType = 'create' | 'edit';
export declare function processWorkflowContentEvent(siteId: string, eventType: WorkflowContentEventType, contentPath: string, contentType?: string): import("rxjs").Observable<import("rxjs/ajax").AjaxResponse<any>>;
