// src/types/localCover.ts
// Defines content-addressed local cover records independently from local-song metadata.

export type LocalCoverSourceKind = 'folder' | 'embedded';

export interface LocalCoverAsset {
  id: string;
  blob: Blob;
  mimeType: string;
  size: number;
  createdAt: number;
}

export interface LocalCoverPayload {
  assetId: string;
  blob: Blob;
}
