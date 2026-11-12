export interface Segment {
  id: string;
  start: number;
  end: number;
  speaker: string;
  text: string;
  confidence: number;
}

export interface TranscriptionResult {
  audioName: string;
  domain: string;
  language: string;
  durationSec: number;
  wordCount: number;
  speakerCount: number;
  confidence: number;
  summary: string;
  actionItems: string[];
  keyTopics: string[];
  sentiment: 'positive' | 'neutral' | 'mixed' | 'serious';
  redactedItemsCount?: number;
  segments: Segment[];
}

export interface SampleAudio {
  id: string;
  title: string;
  category: string;
  duration: string;
  speakers: number;
  quality: string;
  description: string;
}

export interface TranscriptionOptions {
  diarization: boolean;
  summary: boolean;
  redactPii: boolean;
  domain: 'general' | 'finance' | 'medical' | 'legal';
  language: string;
  clientEncryption: boolean;
}

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  matterRef?: string;
  ndaSigned: boolean;
  ndaSignedDate?: string;
}

export interface ClientMatterRecord {
  id: string;
  title: string;
  matterNumber: string;
  date: string;
  durationMins: number;
  domain: 'legal' | 'finance' | 'medical' | 'general';
  status: 'Certified Delivered' | 'Processing Verification' | 'Archived';
  ratePerMin: number;
  totalCost: number;
  accuracy: string;
}
